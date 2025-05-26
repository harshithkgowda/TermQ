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
  return <div data-unique-id="e705457b-ae1b-4762-8dc7-f46f6b57c71c" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6" data-unique-id="fd3d5608-be3a-494e-9e1d-1e5d9e0b801a" data-file-name="components/analyzer/InputSelector.tsx">
      <MethodButton isActive={activeMethod === 'text'} onClick={() => setActiveMethod('text')} icon={<FileText />} label="Paste Text" />
      <MethodButton isActive={activeMethod === 'file'} onClick={() => setActiveMethod('file')} icon={<Upload />} label="Upload File" />
      <MethodButton isActive={activeMethod === 'image'} onClick={() => setActiveMethod('image')} icon={<Image data-unique-id="39fd756d-5271-4166-8789-179a885bb21d" data-file-name="components/analyzer/InputSelector.tsx" />} label="Upload Image" />
    </div>

    {activeMethod === 'text' && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your document text here..." className="w-full h-64 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" data-unique-id="5df83a1c-ab5a-4904-9397-a69d06687ce0" data-file-name="components/analyzer/InputSelector.tsx" />}

    {activeMethod === 'file' && <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-purple-500 bg-purple-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : fileProcessingStatus === 'complete' ? 'border-green-400 bg-green-50' : 'border-purple-300 hover:border-purple-400 hover:bg-purple-50'}`} data-unique-id="0421f8eb-8132-41c3-b0e8-ab0ac97fc365" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      <input {...getInputProps()} data-unique-id="abbc808b-70d4-425c-a20e-e83a84984e71" data-file-name="components/analyzer/InputSelector.tsx" />

      {/* Processing progress bar */}
      {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-purple-500" style={{
        width: `${processingProgress}%`,
        transition: 'width 0.3s ease-in-out'
      }} data-unique-id="19437987-f387-4f68-8473-a6a484f5fac4" data-file-name="components/analyzer/InputSelector.tsx" />}

      {fileProcessingStatus === '' && <>
        <Upload className="h-10 w-10 text-purple-400 mx-auto mb-4" />
        <p className="text-purple-700" data-unique-id="9928b30f-6e49-4c8e-af2a-a27dae962553" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="4c7e17c3-1d68-4b55-9f37-cd3b9b592488" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop your T&C file here, or </span><span className="text-purple-600 font-semibold" data-unique-id="8157bd9f-e4ad-403c-b7d4-239cf264edee" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="416c70c7-a445-4c03-85c7-0286f5d27a84" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
        <p className="text-purple-400 text-sm mt-2" data-unique-id="7b4fddfb-7f0f-4f0f-adea-61649e78b595" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="e5cca364-21ef-4bd0-ba09-72b8ccecc011" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .txt, .pdf, .doc, .docx</span></p>
      </>}

      {fileProcessingStatus === 'detecting' && <div className="py-4" data-unique-id="28179afc-e967-4e10-8790-852dc048587b" data-file-name="components/analyzer/InputSelector.tsx">
        <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }} className="mx-auto mb-3" data-unique-id="81f81353-8cdf-488a-929a-3a250469247e" data-file-name="components/analyzer/InputSelector.tsx">
          <Upload className="h-10 w-10 text-purple-500" />
        </motion.div>
        <p className="text-purple-700" data-unique-id="18f31a75-9e56-4fa9-880c-18199ebbd047" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="c6d188b5-b08f-42e1-9472-8e8beab9812b" data-file-name="components/analyzer/InputSelector.tsx">Analyzing file type...</span></p>
      </div>}

      {fileProcessingStatus.startsWith('extracting') && <div className="py-4" data-unique-id="90dc9f18-6303-42b0-a29d-358b36b0f739" data-file-name="components/analyzer/InputSelector.tsx">
        <motion.div animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} className="mx-auto mb-3" data-unique-id="09a0c364-aefb-41e8-b2f9-e963773fb0d3" data-file-name="components/analyzer/InputSelector.tsx">
          <FileText className="h-10 w-10 text-purple-500" />
        </motion.div>
        <p className="text-purple-700" data-unique-id="bc1f9f51-c88c-47e3-b234-b985c25b633f" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          {fileProcessingStatus === 'extracting-pdf' && "Extracting text from PDF..."}
          {fileProcessingStatus === 'extracting-docx' && "Extracting text from DOCX..."}
          {fileProcessingStatus === 'extracting-text' && "Extracting text..."}
          {fileProcessingStatus === 'extracting-image' && "Extracting text from image..."}
        </p>
      </div>}

      {fileProcessingStatus === 'error' && <div className="py-4 text-red-600" data-unique-id="5cfb8a6a-036d-4370-acd4-0d7cbc01e474" data-file-name="components/analyzer/InputSelector.tsx">
        <AlertCircle className="h-10 w-10 mx-auto mb-3" />
        <p data-unique-id="459041c6-5393-4581-b44a-1bed7fa07fcf" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="a47f68c4-f3c9-4244-97c9-b004d0495166" data-file-name="components/analyzer/InputSelector.tsx">Error processing file. Please try another file.</span></p>
      </div>}

      {/* Content preview */}
      {content && activeMethod === 'file' && fileProcessingStatus !== 'detecting' && fileProcessingStatus !== 'extracting-pdf' && fileProcessingStatus !== 'extracting-docx' && fileProcessingStatus !== 'extracting-text' && <div className="mt-4 p-4 bg-white rounded-md border border-purple-200 shadow-sm" data-unique-id="8e352fbd-d663-4d19-9f49-704c7f049212" data-file-name="components/analyzer/InputSelector.tsx">
        <div className="flex justify-between items-center mb-2" data-unique-id="086a9dd9-1147-418c-ba5f-93dfaf5d6c7a" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="flex items-center" data-unique-id="feffb3a5-e36f-4160-a9f1-bb8ef05170e7" data-file-name="components/analyzer/InputSelector.tsx">
            <FileText className="h-4 w-4 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-purple-700" data-unique-id="2965aea2-d3e7-4d39-b1b3-8ad00a21a079" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="b2005368-1e8c-4c9e-8035-a36c6cb77f1a" data-file-name="components/analyzer/InputSelector.tsx">File content preview:</span></span>
          </div>
          <button onClick={e => {
            e.stopPropagation();
            setContent('');
            setFile(null);
          }} className="text-purple-400 hover:text-purple-600 p-1" data-unique-id="8ad9209f-24d2-40e7-bb7a-8d8e1d088197" data-file-name="components/analyzer/InputSelector.tsx">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm text-slate-600 text-left max-h-40 overflow-y-auto bg-purple-50 p-3 rounded" data-unique-id="b7f0aaaf-7399-4d8b-9dd4-ec5e75af1b09" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          {content.substring(0, 500)}
          {content.length > 500 ? '...' : ''}
        </div>
      </div>}
    </div>}

    {activeMethod === 'image' && <>
      {imageUrl ? <div className="relative" data-unique-id="1ee18081-2ff9-45f7-8ff8-79a60e122799" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        {/* Processing progress bar */}
        {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-teal-500" style={{
          width: `${processingProgress}%`,
          transition: 'width 0.3s ease-in-out'
        }} data-unique-id="6669b52d-8391-4659-b17d-6d26b60216a4" data-file-name="components/analyzer/InputSelector.tsx" />}

        <button onClick={clearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-slate-50 z-10" data-unique-id="e4b0c8a2-097d-4e5a-80c4-4a8091b98e23" data-file-name="components/analyzer/InputSelector.tsx">
          <X className="h-5 w-5 text-teal-600" />
        </button>

        <img src={imageUrl} alt="Uploaded T&C" className="w-full max-h-64 object-contain rounded-md border border-teal-200 shadow-sm" data-unique-id="7b4ac8bf-19c9-4bf0-ba72-109c22ba42cd" data-file-name="components/analyzer/InputSelector.tsx" />

        {fileProcessingStatus === 'extracting-image' && <div className="absolute inset-0 flex items-center justify-center bg-teal-900/30 rounded-md" data-unique-id="95af82cd-a8c8-483c-b745-fab7e037cff9" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3" data-unique-id="2f22a328-784f-446a-8af0-a6240478fdae" data-file-name="components/analyzer/InputSelector.tsx">
            <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }} data-unique-id="ac1756c0-3edc-4adb-90a7-05ab7f9139b5" data-file-name="components/analyzer/InputSelector.tsx">
              <Image className="h-6 w-6 text-teal-500" data-unique-id="236e12a9-fbed-4ec1-a847-286401d3bc28" data-file-name="components/analyzer/InputSelector.tsx" />
            </motion.div>
            <span className="text-teal-700 font-medium" data-unique-id="6ff645eb-4c2e-4719-9925-0a3c54a8b497" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="18235581-c08c-480f-9ecb-538d5e201b02" data-file-name="components/analyzer/InputSelector.tsx">Extracting text...</span></span>
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
        }} className="mt-4 p-4 bg-white rounded-md border border-teal-200 shadow-sm" data-unique-id="2178cfbf-d0f6-428d-b3d3-bc148c3572fe" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="flex items-center mb-2" data-unique-id="34c922ea-f006-4be5-9617-19ec14b68fe2" data-file-name="components/analyzer/InputSelector.tsx">
            <FileText className="h-4 w-4 text-teal-500 mr-2" />
            <span className="text-sm font-medium text-teal-700" data-unique-id="66f8cae0-c5c9-4fef-a721-61076fc00419" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="651dda93-685e-4517-9233-6397db9e7683" data-file-name="components/analyzer/InputSelector.tsx">Extracted text preview:</span></span>
          </div>
          <div className="text-sm text-slate-600 max-h-40 overflow-y-auto bg-teal-50 p-3 rounded" data-unique-id="a8ade1d3-7e85-403c-a3ab-a5bfd4172735" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
            {content.substring(0, 500)}
            {content.length > 500 ? '...' : ''}
          </div>
        </motion.div>}
      </div> : <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-teal-500 bg-teal-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : 'border-teal-300 hover:border-teal-400 hover:bg-teal-50'}`} data-unique-id="0f2a77c7-ebd1-44cb-ae6f-7c41642aadf2" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        <input {...getInputProps()} data-unique-id="74deaea5-6cd6-475a-8e33-50592ea50eb8" data-file-name="components/analyzer/InputSelector.tsx" />
        <Image className="h-10 w-10 text-teal-400 mx-auto mb-4" data-unique-id="7c249824-117b-4ef5-8dee-2e6efd14815f" data-file-name="components/analyzer/InputSelector.tsx" />
        <p className="text-teal-700" data-unique-id="25effe1e-a627-4302-97ea-868f24b30788" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="7b5c0ae2-7317-4d6c-a6af-3eddf7123c0e" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop an image with T&C text, or </span><span className="text-teal-600 font-semibold" data-unique-id="d3225302-db60-415d-98ed-a0f24b88ea5f" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="33d8b2b0-0de9-4ef4-91e5-02d39efbcc91" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
        <p className="text-teal-400 text-sm mt-2" data-unique-id="3f7b2040-b67f-45e7-a6c6-8fcf7cb3ec53" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="e7902d60-aa28-451b-9dfc-927e26aceba3" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .png, .jpg, .jpeg</span></p>

        {fileProcessingStatus === 'error' && <div className="absolute inset-0 flex items-center justify-center bg-red-900/10 rounded-md" data-unique-id="5a559401-035d-4ee1-96e4-39874483191f" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="bg-white p-4 rounded-lg shadow-lg text-red-600" data-unique-id="891b2b06-5d71-49f5-92ff-403e1c3d5321" data-file-name="components/analyzer/InputSelector.tsx">
            <AlertCircle className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm" data-unique-id="fd2ad07e-7dfe-4aa1-8f01-98a952b6a666" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="095d5374-4287-4d03-aea8-5be1fc88faa4" data-file-name="components/analyzer/InputSelector.tsx">Error processing image. Please try another file.</span></p>
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
  }} className={`flex-1 py-3 md:py-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isActive ? 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 border-2 border-blue-200 shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:shadow-sm'}`} data-unique-id="96a19347-9e4a-40b2-81b5-d4696bd061f5" data-file-name="components/analyzer/InputSelector.tsx">
    <motion.div animate={isActive ? {
      scale: [1, 1.15, 1],
      rotate: [0, 5, -5, 0]
    } : {}} transition={{
      duration: 0.5
    }} data-unique-id="49167f68-1667-4c86-82dd-9d37940aef2e" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      {icon}
    </motion.div>
    <span className="text-sm font-medium" data-unique-id="e38edfcb-dde3-4ee5-b55b-90866438feea" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">{label}</span>
  </motion.button>;
}