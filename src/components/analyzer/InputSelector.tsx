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
  return <div data-unique-id="5a822076-2fe9-4876-bd79-4888426059e1" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
    <div className="flex gap-4 mb-6" data-unique-id="b9efb9d5-2666-4639-b18a-d0bcf33d3a4b" data-file-name="components/analyzer/InputSelector.tsx">
      <MethodButton isActive={activeMethod === 'text'} onClick={() => setActiveMethod('text')} icon={<FileText />} label="Paste Text" />
      <MethodButton isActive={activeMethod === 'file'} onClick={() => setActiveMethod('file')} icon={<Upload />} label="Upload File" />
      <MethodButton isActive={activeMethod === 'image'} onClick={() => setActiveMethod('image')} icon={<Image data-unique-id="f49ec210-9ce8-4a82-be66-b0ee13aabea6" data-file-name="components/analyzer/InputSelector.tsx" />} label="Upload Image" />
    </div>

    {activeMethod === 'text' && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your terms & conditions text here..." className="w-full h-64 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" data-unique-id="d19c87bf-3e10-4f31-9e82-05b4c436558c" data-file-name="components/analyzer/InputSelector.tsx" />}

    {activeMethod === 'file' && <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-purple-500 bg-purple-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : fileProcessingStatus === 'complete' ? 'border-green-400 bg-green-50' : 'border-purple-300 hover:border-purple-400 hover:bg-purple-50'}`} data-unique-id="0938640e-1766-4b7b-b1fa-7e368eccb6bc" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      <input {...getInputProps()} data-unique-id="ed2e8d4e-a7fc-4e19-b1c0-9c1d97c3358d" data-file-name="components/analyzer/InputSelector.tsx" />

      {/* Processing progress bar */}
      {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-purple-500" style={{
        width: `${processingProgress}%`,
        transition: 'width 0.3s ease-in-out'
      }} data-unique-id="3bb46d58-ec85-4a1c-977f-0d9049445562" data-file-name="components/analyzer/InputSelector.tsx" />}

      {fileProcessingStatus === '' && <>
        <Upload className="h-10 w-10 text-purple-400 mx-auto mb-4" />
        <p className="text-purple-700" data-unique-id="abfe13e4-d8d7-42f9-8650-0aaeaad27848" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="0ce50d39-8555-46cc-a2b9-87ee2188e74b" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop your T&C file here, or </span><span className="text-purple-600 font-semibold" data-unique-id="c15c80d7-c31e-4091-84d8-693f4bad016c" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="cf7a4835-5078-4c58-8c36-c26197c78957" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
        <p className="text-purple-400 text-sm mt-2" data-unique-id="bf0644c4-4285-4d89-ad6e-3596d5a79eb5" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="1c746480-3c8d-40fa-81b0-89142e3a529a" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .txt, .pdf, .doc, .docx</span></p>
      </>}

      {fileProcessingStatus === 'detecting' && <div className="py-4" data-unique-id="5059719d-05c6-4713-aec9-4f79c7595c48" data-file-name="components/analyzer/InputSelector.tsx">
        <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }} className="mx-auto mb-3" data-unique-id="d47bb7e4-4089-412a-a0d3-bc10c3f8b613" data-file-name="components/analyzer/InputSelector.tsx">
          <Upload className="h-10 w-10 text-purple-500" />
        </motion.div>
        <p className="text-purple-700" data-unique-id="db1b0b4b-89e1-4a5b-b298-833b1afaf125" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="fa564fe7-55f0-4cf0-aa33-e2c3f3acbd9e" data-file-name="components/analyzer/InputSelector.tsx">Analyzing file type...</span></p>
      </div>}

      {fileProcessingStatus.startsWith('extracting') && <div className="py-4" data-unique-id="8909d375-04f7-470a-8b79-d5a062df4cf7" data-file-name="components/analyzer/InputSelector.tsx">
        <motion.div animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} className="mx-auto mb-3" data-unique-id="8e5c06c5-1790-44b5-80cb-7cd4abcf8b19" data-file-name="components/analyzer/InputSelector.tsx">
          <FileText className="h-10 w-10 text-purple-500" />
        </motion.div>
        <p className="text-purple-700" data-unique-id="3c4dd7d0-51e3-4430-9b79-1b9363483814" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          {fileProcessingStatus === 'extracting-pdf' && "Extracting text from PDF..."}
          {fileProcessingStatus === 'extracting-docx' && "Extracting text from DOCX..."}
          {fileProcessingStatus === 'extracting-text' && "Extracting text..."}
          {fileProcessingStatus === 'extracting-image' && "Extracting text from image..."}
        </p>
      </div>}

      {fileProcessingStatus === 'error' && <div className="py-4 text-red-600" data-unique-id="7aaa5ba7-828e-4745-a468-62cb3cd827dc" data-file-name="components/analyzer/InputSelector.tsx">
        <AlertCircle className="h-10 w-10 mx-auto mb-3" />
        <p data-unique-id="4d098bab-1300-427d-9468-4b7a66dced2c" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="77f09474-5597-4d6a-9732-dc5862eaadf6" data-file-name="components/analyzer/InputSelector.tsx">Error processing file. Please try another file.</span></p>
      </div>}

      {/* Content preview */}
      {content && activeMethod === 'file' && fileProcessingStatus !== 'detecting' && fileProcessingStatus !== 'extracting-pdf' && fileProcessingStatus !== 'extracting-docx' && fileProcessingStatus !== 'extracting-text' && <div className="mt-4 p-4 bg-white rounded-md border border-purple-200 shadow-sm" data-unique-id="af9aa6ea-7fa8-4e0b-8382-9f33e2ffe895" data-file-name="components/analyzer/InputSelector.tsx">
        <div className="flex justify-between items-center mb-2" data-unique-id="2fd97a61-524c-4b4e-bb8f-357cf9272a34" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="flex items-center" data-unique-id="57197ddc-09db-4a9c-a5a4-38c95cad91a6" data-file-name="components/analyzer/InputSelector.tsx">
            <FileText className="h-4 w-4 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-purple-700" data-unique-id="9257497b-e127-41db-96be-29a6e0a47cff" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="f60a91f8-a8a1-416c-88e7-c3b8c6890631" data-file-name="components/analyzer/InputSelector.tsx">File content preview:</span></span>
          </div>
          <button onClick={e => {
            e.stopPropagation();
            setContent('');
            setFile(null);
          }} className="text-purple-400 hover:text-purple-600 p-1" data-unique-id="443ce401-a29b-460f-8d2a-8b18c3f19092" data-file-name="components/analyzer/InputSelector.tsx">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm text-slate-600 text-left max-h-40 overflow-y-auto bg-purple-50 p-3 rounded" data-unique-id="701eaf44-db33-454a-b654-2210b2336dff" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          {content.substring(0, 500)}
          {content.length > 500 ? '...' : ''}
        </div>
      </div>}
    </div>}

    {activeMethod === 'image' && <>
      {imageUrl ? <div className="relative" data-unique-id="21d69fce-192a-4d71-8f3f-29acd48af069" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        {/* Processing progress bar */}
        {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-teal-500" style={{
          width: `${processingProgress}%`,
          transition: 'width 0.3s ease-in-out'
        }} data-unique-id="bedc0cbb-84e1-40b9-8546-c1fd9362dda4" data-file-name="components/analyzer/InputSelector.tsx" />}

        <button onClick={clearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-slate-50 z-10" data-unique-id="69953b5a-b499-4d6c-b63b-58ad3f400728" data-file-name="components/analyzer/InputSelector.tsx">
          <X className="h-5 w-5 text-teal-600" />
        </button>

        <img src={imageUrl} alt="Uploaded T&C" className="w-full max-h-64 object-contain rounded-md border border-teal-200 shadow-sm" data-unique-id="2676f738-65cb-426a-bdc9-43626a36ca42" data-file-name="components/analyzer/InputSelector.tsx" />

        {fileProcessingStatus === 'extracting-image' && <div className="absolute inset-0 flex items-center justify-center bg-teal-900/30 rounded-md" data-unique-id="51619c98-3c67-4ac8-9a8a-11901433b97c" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3" data-unique-id="877fb51c-e716-45b9-a8f1-319c14ffdf82" data-file-name="components/analyzer/InputSelector.tsx">
            <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }} data-unique-id="ff5be4d6-8551-4759-a9ec-785c5f4fa2a2" data-file-name="components/analyzer/InputSelector.tsx">
              <Image className="h-6 w-6 text-teal-500" data-unique-id="ed11dc6e-daed-4f15-bdd5-6a2dcb391295" data-file-name="components/analyzer/InputSelector.tsx" />
            </motion.div>
            <span className="text-teal-700 font-medium" data-unique-id="12b0d3b3-ffa7-4f2b-8826-adcfd873c4c5" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="7ad94f6e-a555-468f-ba9f-51c5efff7e8a" data-file-name="components/analyzer/InputSelector.tsx">Extracting text...</span></span>
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
        }} className="mt-4 p-4 bg-white rounded-md border border-teal-200 shadow-sm" data-unique-id="b1d7c239-00d4-4a5c-aac2-d8f3045e61d2" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="flex items-center mb-2" data-unique-id="de1fc529-be2e-4344-90f5-6fdf375c2c70" data-file-name="components/analyzer/InputSelector.tsx">
            <FileText className="h-4 w-4 text-teal-500 mr-2" />
            <span className="text-sm font-medium text-teal-700" data-unique-id="e2d7abea-cc22-43f4-af94-5bb913bfb1e9" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="883df44c-5104-4828-b652-c21bc0fb8cfb" data-file-name="components/analyzer/InputSelector.tsx">Extracted text preview:</span></span>
          </div>
          <div className="text-sm text-slate-600 max-h-40 overflow-y-auto bg-teal-50 p-3 rounded" data-unique-id="dc2e3820-8614-4f09-a1f2-114e51eab3aa" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
            {content.substring(0, 500)}
            {content.length > 500 ? '...' : ''}
          </div>
        </motion.div>}
      </div> : <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-teal-500 bg-teal-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : 'border-teal-300 hover:border-teal-400 hover:bg-teal-50'}`} data-unique-id="74da4290-63e5-4535-a835-27b9d95cf8bf" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        <input {...getInputProps()} data-unique-id="d919c1de-4a3a-435e-871d-3bfd607e38cb" data-file-name="components/analyzer/InputSelector.tsx" />
        <Image className="h-10 w-10 text-teal-400 mx-auto mb-4" data-unique-id="ea91845b-c734-4974-ac3c-e5f536af7d88" data-file-name="components/analyzer/InputSelector.tsx" />
        <p className="text-teal-700" data-unique-id="c466c767-7549-4d89-8c42-9e450b75aa05" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="0f73b6ee-b17d-48bb-84aa-945b734d14ed" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop an image with T&C text, or </span><span className="text-teal-600 font-semibold" data-unique-id="34fcc244-d11f-4776-b65c-ca3f282fc382" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="461d121c-a202-4b15-bd67-c5d2c91e99d1" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
        <p className="text-teal-400 text-sm mt-2" data-unique-id="0a658a4f-1ebb-4f13-b4a6-ad2e8962892f" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="2337a805-3fc3-4942-88c6-fcc12a86c2bd" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .png, .jpg, .jpeg</span></p>

        {fileProcessingStatus === 'error' && <div className="absolute inset-0 flex items-center justify-center bg-red-900/10 rounded-md" data-unique-id="2a3c90ac-20bd-435a-8dc3-10ce5e8bb378" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="bg-white p-4 rounded-lg shadow-lg text-red-600" data-unique-id="7f0661b7-80e4-448f-a425-5bf0cf70a611" data-file-name="components/analyzer/InputSelector.tsx">
            <AlertCircle className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm" data-unique-id="56c8afba-2299-45c1-9336-ef6db86554d0" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="2e22bb25-0d17-4010-a3b6-4f30c706d84d" data-file-name="components/analyzer/InputSelector.tsx">Error processing image. Please try another file.</span></p>
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
  }} className={`flex-1 py-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isActive ? 'bg-gradient-to-br from-purple-100 to-indigo-100 text-indigo-700 border-2 border-indigo-200 shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-200 hover:shadow-sm'}`} data-unique-id="a56e1225-80a0-43e8-893f-e7cd72a2f327" data-file-name="components/analyzer/InputSelector.tsx">
    <motion.div animate={isActive ? {
      scale: [1, 1.15, 1],
      rotate: [0, 5, -5, 0]
    } : {}} transition={{
      duration: 0.5
    }} data-unique-id="4de00123-dd44-4fb1-9f98-dea48737d5ae" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      {icon}
    </motion.div>
    <span className="text-sm font-medium" data-unique-id="407a5a34-ce71-421f-95a9-3dc22f6aad44" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">{label}</span>
  </motion.button>;
}