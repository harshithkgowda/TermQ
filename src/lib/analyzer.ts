
import { createWorker } from 'tesseract.js'
import { useAnalyzerStore } from '@/store/useAnalyzerStore'
import { generateText, generateTextWithImages } from '@/lib/api/util'
import * as pdfjs from 'pdfjs-dist'
import mammoth from 'mammoth'
import * as fileType from 'file-type'

// Configure PDF.js worker - only in browser environment
const configurePdfWorker = () => {
  if (typeof window !== 'undefined') {
    import('pdfjs-dist/build/pdf.worker.mjs').then(pdfjsWorker => {
      pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
    })
  }
}

// Call the function to configure the worker
configurePdfWorker()

// Function to extract text from an image
export async function extractTextFromImage(imageUrl: string): Promise<string> {
  const worker = await createWorker('eng')
  
  try {
    // Tesseract.js works with both blob URLs and data URLs
    const { data: { text } } = await worker.recognize(imageUrl)
    return text || "No text could be extracted from the image. Please try a clearer image or manually enter the text."
  } catch (error) {
    console.error("Tesseract error:", error)
    throw new Error("Failed to extract text from image. Please try another image or manually enter the text.")
  } finally {
    await worker.terminate()
  }
}

// Function to extract text from PDF
export async function extractTextFromPDF(file: File): Promise<string> {
  // Convert File to ArrayBuffer
  const arrayBuffer = await file.arrayBuffer()

  // Load the PDF document
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) })
  const pdf = await loadingTask.promise

  let fullText = ''

  // Iterate through each page to extract text
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item: any) => item.str).join(' ')
    fullText += pageText + '\n\n'
  }

  return fullText
}

// Function to extract text from DOCX
export async function extractTextFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value
}

// Function to detect file type
export async function getFileType(file: File): Promise<string> {
  // First check by extension
  const extension = file.name.split('.').pop()?.toLowerCase()

  if (extension === 'pdf') return 'pdf'
  if (extension === 'docx' || extension === 'doc') return 'docx'
  if (extension === 'txt') return 'txt'

  // If extension is not conclusive, try to detect by content
  const arrayBuffer = await file.slice(0, 4100).arrayBuffer()
  const type = await fileType.fileTypeFromBuffer(new Uint8Array(arrayBuffer))

  if (type?.mime.includes('pdf')) return 'pdf'
  if (type?.mime.includes('word') || type?.mime.includes('officedocument')) return 'docx'
  if (type?.mime.includes('text')) return 'txt'

  return 'unknown'
}

// Function to analyze the T&C content
export async function analyzeContent(): Promise<void> {
  const store = useAnalyzerStore.getState()

  if (!store.content) {
    throw new Error("No content to analyze")
  }

  // If we have an image, use vision-enabled model
  if (store.imageUrl) {
    await analyzeWithVision(store.content, store.imageUrl)
  } else {
    // Otherwise use text-only analysis
    await analyzeWithText(store.content)
  }
}

// Function to compare two documents and highlight differences
export async function compareDocuments(doc1Content: string, doc2Content: string): Promise<string> {
  // This is a placeholder for a more sophisticated diff algorithm
  // In a real implementation, you might use a more advanced diffing library
  
  const provider = "azure-gpt-4o"
  
  const comparisonPrompt = `
    Compare these two Terms & Conditions documents and identify the key differences.
    Focus on changes that affect:
    1. User rights and obligations
    2. Company rights and obligations
    3. Privacy policies
    4. Data usage
    5. Termination conditions
    
    Format your response as a structured list of differences, with clear references to which document contains each clause.
    
    DOCUMENT 1:
    ${doc1Content.substring(0, 7500)}
    
    DOCUMENT 2:
    ${doc2Content.substring(0, 7500)}
  `
  
  try {
    const result = await generateText(comparisonPrompt, provider)
    return result.text
  } catch (error) {
    console.error("Error comparing documents:", error)
    throw new Error("Failed to compare documents. Please try again.")
  }
}

// Analyze using text-only model
async function analyzeWithText(content: string): Promise<void> {
  const store = useAnalyzerStore.getState()

  // Use Azure-GPT-4o for text analysis
  const provider = "azure-gpt-4o"

  const analysisPrompt = `
    Analyze the following Terms & Conditions text and identify important points that fall into these categories:
    1. Harmful points (things that are clearly not in the user's interest)
    2. Good points (things that benefit or protect the user)
    3. Awareness points (important things users should be aware of, but are neutral)
    
    For each point, provide a brief explanation of why it fits that category.
    
    Also, create a summary of the entire T&C in 10 or fewer bullet points that capture the most important aspects.
    
    Format your response as JSON with this exact structure:
    {
      "analysis": [
        {
          "text": "Brief quote or summary of the clause",
          "type": "harmful | good | awareness",
          "explanation": "Why this is important"
        }
      ],
      "summary": {
        "points": [
          "First bullet point",
          "Second bullet point", 
          "etc. (max 10)"
        ]
      }
    }
    
    Here's the T&C text to analyze:
    ${content.substring(0, 15000)}
  `

  try {
    const result = await generateText(analysisPrompt, provider)
    processAnalysisResponse(result.text)
  } catch (error) {
    console.error("Error analyzing text:", error)
    throw new Error("Failed to analyze content. Please try again.")
  }
}

// Analyze using vision-enabled model for image inputs
async function analyzeWithVision(content: string, imageUrl: string): Promise<void> {
  const store = useAnalyzerStore.getState()

  // Use vision-enabled model
  const provider = "azure-gpt-4o"

  const analysisPrompt = `
    Analyze the following Terms & Conditions text from the provided image and identify important points that fall into these categories:
    1. Harmful points (things that are clearly not in the user's interest)
    2. Good points (things that benefit or protect the user)
    3. Awareness points (important things users should be aware of, but are neutral)
    
    For each point, provide a brief explanation of why it fits that category.
    
    Also, create a summary of the entire T&C in 10 or fewer bullet points that capture the most important aspects.
    
    Format your response as JSON with this exact structure:
    {
      "analysis": [
        {
          "text": "Brief quote or summary of the clause",
          "type": "harmful | good | awareness",
          "explanation": "Why this is important"
        }
      ],
      "summary": {
        "points": [
          "First bullet point",
          "Second bullet point", 
          "etc. (max 10)"
        ]
      }
    }
    
    I've extracted the following text from the image but there may be errors:
    ${content.substring(0, 15000)}
  `

  try {
    // Pass the data URL directly to the vision model
    // The imageUrl is already in the correct base64 data URL format from the InputSelector
    const result = await generateTextWithImages(analysisPrompt, [imageUrl], provider)
    processAnalysisResponse(result.text)
  } catch (error) {
    console.error("Error analyzing image content:", error)
    throw new Error("Failed to analyze image content. Please try again.")
  }
}

// Process the JSON response from the AI model
function processAnalysisResponse(responseText: string): void {
  try {
    // Find and extract the JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/m)
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI model")
    }

    const jsonStr = jsonMatch[0]
    const data = JSON.parse(jsonStr)

    // Validate the response structure
    if (!data.analysis || !Array.isArray(data.analysis) || !data.summary || !Array.isArray(data.summary.points)) {
      throw new Error("Invalid response structure from AI model")
    }

    // Add IDs to analysis points
    const analysisPointsWithIds = data.analysis.map((point: any, index: number) => ({
      ...point,
      id: `point-${index}`
    }))

    // Update the store with the results
    useAnalyzerStore.getState().setAnalysisResults(
      analysisPointsWithIds,
      data.summary
    )
  } catch (error) {
    console.error("Error processing analysis response:", error)
    throw new Error("Failed to process analysis results. Please try again.")
  }
}
