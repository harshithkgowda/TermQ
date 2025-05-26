'use client'

import { createWorker } from 'tesseract.js'
import { useAnalyzerStore } from '@/store/useAnalyzerStore'
import { generateText, generateTextWithImages } from '@/lib/api/util'

// Function to extract text from an image
export async function extractTextFromImage(imageUrl: string): Promise<string> {
  const worker = await createWorker('eng')
  
  try {
    const { data: { text } } = await worker.recognize(imageUrl)
    return text
  } finally {
    await worker.terminate()
  }
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
    // Since we're working with client-side images, we need to actually pass the data URL
    // We're already getting imageUrl as a URL created by URL.createObjectURL
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
