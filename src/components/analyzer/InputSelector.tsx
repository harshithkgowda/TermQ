'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FileText, Upload, Image, X, AlertCircle } from 'lucide-react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import { extractTextFromDOCX, extractTextFromImage, extractTextFromPDF, getFileType } from '@/lib/analyzer';
export default function InputSelector() {
  const {
    content,
    setContent,
    setFile,
    imageUrl,
    setImageUrl
  } = useAnalyzerStore();
  const [activeMethod, setActiveMethod] = useState<'text' | 'file' | 'image'>('text');
  const [fileProcessingStatus, setFileProcessingStatus] = useState<string>('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    if (activeMethod === 'file') {
      setFile(file);
      try {
        setFileProcessingStatus('detecting');
        setProcessingProgress(10);

        // Determine file type
        const fileType = await getFileType(file);
        setProcessingProgress(30);
        let extractedText = '';
        if (fileType === 'pdf') {
          setFileProcessingStatus('extracting-pdf');
          extractedText = await extractTextFromPDF(file);
        } else if (fileType === 'docx') {
          setFileProcessingStatus('extracting-docx');
          extractedText = await extractTextFromDOCX(file);
        } else {
          setFileProcessingStatus('extracting-text');
          extractedText = await file.text();
        }
        setProcessingProgress(90);
        setContent(extractedText);
        setProcessingProgress(100);
        setFileProcessingStatus('complete');

        // Reset progress after a delay
        setTimeout(() => {
          setProcessingProgress(0);
          setFileProcessingStatus('');
        }, 1500);
      } catch (err) {
        console.error("Error reading file:", err);
        setFileProcessingStatus('error');
        setTimeout(() => setFileProcessingStatus(''), 3000);
      }
    } else if (activeMethod === 'image') {
      try {
        // Convert file to base64 data URL for API compatibility
        const reader = new FileReader();
        reader.onload = async e => {
          try {
            const dataUrl = e.target?.result as string;
            setImageUrl(dataUrl); // Store the base64 data URL directly

            // Show processing status
            setFileProcessingStatus('extracting-image');
            setProcessingProgress(30);

            // Extract text from image using the data URL
            const extractedText = await extractTextFromImage(dataUrl);
            setProcessingProgress(90);
            setContent(extractedText);
            setProcessingProgress(100);
            setFileProcessingStatus('complete');

            // Reset progress after a delay
            setTimeout(() => {
              setProcessingProgress(0);
              setFileProcessingStatus('');
            }, 1500);
          } catch (err) {
            console.error("Error in image processing:", err);
            setFileProcessingStatus('error');
            setTimeout(() => setFileProcessingStatus(''), 3000);
          }
        };
        reader.onerror = () => {
          console.error("Error reading image file");
          setFileProcessingStatus('error');
          setTimeout(() => setFileProcessingStatus(''), 3000);
        };

        // Start reading the image file as a data URL
        reader.readAsDataURL(file);
      } catch (err) {
        console.error("Error processing image:", err);
        setFileProcessingStatus('error');
        setTimeout(() => setFileProcessingStatus(''), 3000);
      }
    }
  }, [activeMethod, setContent, setFile, setImageUrl]);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: activeMethod === 'file' ? {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    } : {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    multiple: false
  });
  const clearImage = () => {
    // No need to revoke URL for data URLs
    setImageUrl(null);
    setContent('');
  };
  return <div data-unique-id="95d5223a-69d2-447d-a32e-d5f5fb118219" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6" data-unique-id="50efe19d-434a-4677-ba18-34ada9d2add8" data-file-name="components/analyzer/InputSelector.tsx">
      <MethodButton isActive={activeMethod === 'text'} onClick={() => setActiveMethod('text')} icon={<FileText />} label="Paste Text" />
      <MethodButton isActive={activeMethod === 'file'} onClick={() => setActiveMethod('file')} icon={<Upload />} label="Upload File" />
      <MethodButton isActive={activeMethod === 'image'} onClick={() => setActiveMethod('image')} icon={<Image data-unique-id="f05359f9-a3a4-486b-8d5b-4c95af97f9d4" data-file-name="components/analyzer/InputSelector.tsx" />} label="Upload Image" />
    </div>

    {activeMethod === 'text' && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your document text here..." className="w-full h-64 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" data-unique-id="df86c7f3-7fd9-431e-823e-98951d8ee0a8" data-file-name="components/analyzer/InputSelector.tsx" />}

    {activeMethod === 'file' && <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-purple-500 bg-purple-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : fileProcessingStatus === 'complete' ? 'border-green-400 bg-green-50' : 'border-purple-300 hover:border-purple-400 hover:bg-purple-50'}`} data-unique-id="444925ad-5a25-4f29-b3ea-09c0dce6b85a" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      <input {...getInputProps()} data-unique-id="7ec35cb7-d9ec-411f-a727-b0a7630d509e" data-file-name="components/analyzer/InputSelector.tsx" />

      {/* Processing progress bar */}
      {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-purple-500" style={{
        width: `${processingProgress}%`,
        transition: 'width 0.3s ease-in-out'
      }} data-unique-id="5375bc4b-fd51-4690-a2b9-fe2cc130918a" data-file-name="components/analyzer/InputSelector.tsx" />}

      {fileProcessingStatus === '' && <>
        <Upload className="h-10 w-10 text-purple-400 mx-auto mb-4" />
        <p className="text-purple-700" data-unique-id="4b6b9ddd-9a9d-4d51-9cd6-ecb415f96b25" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="5aa90b76-2520-4733-9dc8-9182c3a514e5" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop your T&C file here, or </span><span className="text-purple-600 font-semibold" data-unique-id="ce01df34-882b-4e9a-813d-ac1fd095249f" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="c93a46bd-35c1-4232-a015-423d47aaec04" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
        <p className="text-purple-400 text-sm mt-2" data-unique-id="307dab16-685f-4985-bf71-531b896ebd39" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="804c6067-196e-4010-aa4b-26986dcf6c0e" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .txt, .pdf, .doc, .docx</span></p>
      </>}

      {fileProcessingStatus === 'detecting' && <div className="py-4" data-unique-id="1f4c69dc-0d48-436d-b4a3-56544874e6ff" data-file-name="components/analyzer/InputSelector.tsx">
        <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }} className="mx-auto mb-3" data-unique-id="6c8dd239-47f4-44c2-9be9-a6c4b011c3fa" data-file-name="components/analyzer/InputSelector.tsx">
          <Upload className="h-10 w-10 text-purple-500" />
        </motion.div>
        <p className="text-purple-700" data-unique-id="67c05d42-febc-4ecb-a724-e489a89781b4" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="952e7087-71a9-4ae5-9ea7-89de0b28f986" data-file-name="components/analyzer/InputSelector.tsx">Analyzing file type...</span></p>
      </div>}

      {fileProcessingStatus.startsWith('extracting') && <div className="py-4" data-unique-id="165f58ed-3a82-46a6-b8c9-7f44a61178a5" data-file-name="components/analyzer/InputSelector.tsx">
        <motion.div animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} className="mx-auto mb-3" data-unique-id="bb128cee-c2f5-49f0-a9a0-d92833aaa2f4" data-file-name="components/analyzer/InputSelector.tsx">
          <FileText className="h-10 w-10 text-purple-500" />
        </motion.div>
        <p className="text-purple-700" data-unique-id="fd24d2cf-3f13-4b6c-acf4-2be01b73adf2" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          {fileProcessingStatus === 'extracting-pdf' && "Extracting text from PDF..."}
          {fileProcessingStatus === 'extracting-docx' && "Extracting text from DOCX..."}
          {fileProcessingStatus === 'extracting-text' && "Extracting text..."}
          {fileProcessingStatus === 'extracting-image' && "Extracting text from image..."}
        </p>
      </div>}

      {fileProcessingStatus === 'error' && <div className="py-4 text-red-600" data-unique-id="e2b8b5b4-0c5a-49fc-ab84-4b019791c24a" data-file-name="components/analyzer/InputSelector.tsx">
        <AlertCircle className="h-10 w-10 mx-auto mb-3" />
        <p data-unique-id="68c55388-be7b-405a-9a90-6e9eefdb5f06" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="cd792fb6-c6ee-438e-a8df-4694a10a70d8" data-file-name="components/analyzer/InputSelector.tsx">Error processing file. Please try another file.</span></p>
      </div>}

      {/* Content preview */}
      {content && activeMethod === 'file' && fileProcessingStatus !== 'detecting' && fileProcessingStatus !== 'extracting-pdf' && fileProcessingStatus !== 'extracting-docx' && fileProcessingStatus !== 'extracting-text' && <div className="mt-4 p-4 bg-white rounded-md border border-purple-200 shadow-sm" data-unique-id="44621775-04f2-4879-a09d-d9899a026f64" data-file-name="components/analyzer/InputSelector.tsx">
        <div className="flex justify-between items-center mb-2" data-unique-id="007819d2-576b-4914-ad86-72e788e0f596" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="flex items-center" data-unique-id="0f26856c-1a47-4876-9e99-0ec339075c1d" data-file-name="components/analyzer/InputSelector.tsx">
            <FileText className="h-4 w-4 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-purple-700" data-unique-id="dee2015c-e102-4456-9cd6-92eb540adc86" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="8c6a306c-4850-4702-9d24-9e7ad60ddc07" data-file-name="components/analyzer/InputSelector.tsx">File content preview:</span></span>
          </div>
          <button onClick={e => {
            e.stopPropagation();
            setContent('');
            setFile(null);
          }} className="text-purple-400 hover:text-purple-600 p-1" data-unique-id="f3f69ba5-a339-4dbf-aee7-62b6f667025c" data-file-name="components/analyzer/InputSelector.tsx">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm text-slate-600 text-left max-h-40 overflow-y-auto bg-purple-50 p-3 rounded" data-unique-id="6795d2c6-3596-4299-b53a-92e82511434a" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          {content.substring(0, 500)}
          {content.length > 500 ? '...' : ''}
        </div>
      </div>}
    </div>}

    {activeMethod === 'image' && <>
      {imageUrl ? <div className="relative" data-unique-id="7ef91dd6-c4b0-4606-9d08-6c7e64f8ec87" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        {/* Processing progress bar */}
        {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-teal-500" style={{
          width: `${processingProgress}%`,
          transition: 'width 0.3s ease-in-out'
        }} data-unique-id="ec4a6c71-1082-482b-b803-9974f6d21756" data-file-name="components/analyzer/InputSelector.tsx" />}

        <button onClick={clearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-slate-50 z-10" data-unique-id="74fcb362-d3da-413f-88a1-03ea7f7b99bc" data-file-name="components/analyzer/InputSelector.tsx">
          <X className="h-5 w-5 text-teal-600" />
        </button>

        <img src={imageUrl} alt="Uploaded T&C" className="w-full max-h-64 object-contain rounded-md border border-teal-200 shadow-sm" data-unique-id="9011f506-da0c-42d2-8d90-4a7320f351cd" data-file-name="components/analyzer/InputSelector.tsx" />

        {fileProcessingStatus === 'extracting-image' && <div className="absolute inset-0 flex items-center justify-center bg-teal-900/30 rounded-md" data-unique-id="d2b69400-59e7-4169-929a-6471b8a84ab4" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3" data-unique-id="8a2f1160-34a0-443b-b1fc-fd854d73cf72" data-file-name="components/analyzer/InputSelector.tsx">
            <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }} data-unique-id="cafd6573-6444-48d3-82d7-a8651ef37db3" data-file-name="components/analyzer/InputSelector.tsx">
              <Image className="h-6 w-6 text-teal-500" data-unique-id="1b66316f-6c54-4e45-9ac2-1e9c9c565314" data-file-name="components/analyzer/InputSelector.tsx" />
            </motion.div>
            <span className="text-teal-700 font-medium" data-unique-id="493e01e7-93c6-43b0-8144-1130ad59c745" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="658eae27-95e7-4f3d-986b-3f2c6a86230b" data-file-name="components/analyzer/InputSelector.tsx">Extracting text...</span></span>
          </div>
        </div>}

        {content && fileProcessingStatus !== 'extracting-image' && <motion.div initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.3
        }} className="mt-4 p-4 bg-white rounded-md border border-teal-200 shadow-sm" data-unique-id="e947df3a-dd5a-41fe-9904-4c8ab8c9180d" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="flex items-center mb-2" data-unique-id="385b1569-5b00-4feb-bc41-230d58b3ddef" data-file-name="components/analyzer/InputSelector.tsx">
            <FileText className="h-4 w-4 text-teal-500 mr-2" />
            <span className="text-sm font-medium text-teal-700" data-unique-id="9347357f-55b2-43fd-a04e-9cfde1e32ad1" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="39362f94-a7ae-4a44-8cba-0e2d8b06dd51" data-file-name="components/analyzer/InputSelector.tsx">Extracted text preview:</span></span>
          </div>
          <div className="text-sm text-slate-600 max-h-40 overflow-y-auto bg-teal-50 p-3 rounded" data-unique-id="6ebcb723-3c59-41d4-b2c3-1710225fd861" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
            {content.substring(0, 500)}
            {content.length > 500 ? '...' : ''}
          </div>
        </motion.div>}
      </div> : <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-teal-500 bg-teal-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : 'border-teal-300 hover:border-teal-400 hover:bg-teal-50'}`} data-unique-id="810a0fb8-ed2a-44f5-ac2c-422d3d560aab" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        <input {...getInputProps()} data-unique-id="dc1dfdf9-2d27-4966-ac1c-4f9d4f7fbe3e" data-file-name="components/analyzer/InputSelector.tsx" />
        <Image className="h-10 w-10 text-teal-400 mx-auto mb-4" data-unique-id="d2f81e4c-9946-412c-9270-089a4d32c448" data-file-name="components/analyzer/InputSelector.tsx" />
        <p className="text-teal-700" data-unique-id="ea2e0190-5fd2-4f2f-b7e3-f116ba44ec9f" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="152a930f-9c06-438a-8689-46c166efe4d6" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop an image with T&C text, or </span><span className="text-teal-600 font-semibold" data-unique-id="3fb0cadd-9e66-4772-a2ef-4e8b2cb0aa5b" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="7b2626a3-3fa0-4feb-9b8e-d5c090a7ef7a" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
        <p className="text-teal-400 text-sm mt-2" data-unique-id="2194e823-2358-485b-a34b-8d74b4b041cc" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="761d4ac3-f559-4373-a896-ea1d535521a2" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .png, .jpg, .jpeg</span></p>

        {fileProcessingStatus === 'error' && <div className="absolute inset-0 flex items-center justify-center bg-red-900/10 rounded-md" data-unique-id="3f33bf74-9d7b-4fb9-a60f-93236dd21b7c" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="bg-white p-4 rounded-lg shadow-lg text-red-600" data-unique-id="2e413535-a9c1-44b6-8b5f-70d9678c57be" data-file-name="components/analyzer/InputSelector.tsx">
            <AlertCircle className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm" data-unique-id="ff7f9e25-39fc-4c0c-ab37-95ad376b6ee8" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="815a1a00-51d4-4e5c-91d5-b5757a07df16" data-file-name="components/analyzer/InputSelector.tsx">Error processing image. Please try another file.</span></p>
          </div>
        </div>}
      </div>}
    </>}
  </div>;
}
function MethodButton({
  isActive,
  onClick,
  icon,
  label
}: {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return <motion.button onClick={onClick} whileTap={{
    scale: 0.97
  }} whileHover={{
    scale: 1.02
  }} className={`flex-1 py-3 md:py-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isActive ? 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 border-2 border-blue-200 shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:shadow-sm'}`} data-unique-id="b7f57f45-5091-4067-bd96-e4c11c809537" data-file-name="components/analyzer/InputSelector.tsx">
    <motion.div animate={isActive ? {
      scale: [1, 1.15, 1],
      rotate: [0, 5, -5, 0]
    } : {}} transition={{
      duration: 0.5
    }} data-unique-id="7ac2f65a-ad4a-453d-9aee-01eebce41ced" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      {icon}
    </motion.div>
    <span className="text-sm font-medium" data-unique-id="f166d624-6c01-49e8-bf90-fe61fc8cb2ec" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">{label}</span>
  </motion.button>;
}