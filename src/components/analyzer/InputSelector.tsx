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
  return <div data-unique-id="33be1147-cf3c-4184-afd8-7d2846510930" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
    <div className="flex gap-4 mb-6" data-unique-id="1e52495f-43d3-4c9f-a7af-fa0c2dbece1e" data-file-name="components/analyzer/InputSelector.tsx">
      <MethodButton isActive={activeMethod === 'text'} onClick={() => setActiveMethod('text')} icon={<FileText />} label="Paste Text" />
      <MethodButton isActive={activeMethod === 'file'} onClick={() => setActiveMethod('file')} icon={<Upload />} label="Upload File" />
      <MethodButton isActive={activeMethod === 'image'} onClick={() => setActiveMethod('image')} icon={<Image data-unique-id="64f0b4f6-a939-4275-9be7-d7749c33cb24" data-file-name="components/analyzer/InputSelector.tsx" />} label="Upload Image" />
    </div>

    {activeMethod === 'text' && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your terms & conditions text here..." className="w-full h-64 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" data-unique-id="5adcf523-7e2b-46ac-99f3-16561cac711f" data-file-name="components/analyzer/InputSelector.tsx" />}

    {activeMethod === 'file' && <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-purple-500 bg-purple-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : fileProcessingStatus === 'complete' ? 'border-green-400 bg-green-50' : 'border-purple-300 hover:border-purple-400 hover:bg-purple-50'}`} data-unique-id="7120d17d-e18a-486b-b773-6270280f1773" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      <input {...getInputProps()} data-unique-id="5009b41f-5991-4762-8d0a-4b75c89ffc4f" data-file-name="components/analyzer/InputSelector.tsx" />

      {/* Processing progress bar */}
      {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-purple-500" style={{
        width: `${processingProgress}%`,
        transition: 'width 0.3s ease-in-out'
      }} data-unique-id="29b901d0-e376-4084-b7a9-583b338624fe" data-file-name="components/analyzer/InputSelector.tsx" />}

      {fileProcessingStatus === '' && <>
        <Upload className="h-10 w-10 text-purple-400 mx-auto mb-4" />
        <p className="text-purple-700" data-unique-id="7233c950-09a5-48e1-aaf4-99c0e423c209" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="e8d96090-4ee6-4cd5-800e-37ffdb56c764" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop your T&C file here, or </span><span className="text-purple-600 font-semibold" data-unique-id="cf502f61-f3b1-40b6-a1a5-6583a0c95ad6" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="da28a97d-5af2-4821-bc28-cb73cff0a52c" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
        <p className="text-purple-400 text-sm mt-2" data-unique-id="89c798ff-ed54-4b3b-9e84-d25e3e97eb92" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="b4085794-5349-4c5a-8bcb-f3a35ced1239" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .txt, .pdf, .doc, .docx</span></p>
      </>}

      {fileProcessingStatus === 'detecting' && <div className="py-4" data-unique-id="822915ed-0662-4336-b7e2-29c3bf7c4d7b" data-file-name="components/analyzer/InputSelector.tsx">
        <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }} className="mx-auto mb-3" data-unique-id="337d1737-cc5e-4b72-966e-aa5204bbede9" data-file-name="components/analyzer/InputSelector.tsx">
          <Upload className="h-10 w-10 text-purple-500" />
        </motion.div>
        <p className="text-purple-700" data-unique-id="b646056a-7216-4dc4-a0d8-47e724b8195d" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="ed33a183-0d28-4c46-8cac-1ddf10322a87" data-file-name="components/analyzer/InputSelector.tsx">Analyzing file type...</span></p>
      </div>}

      {fileProcessingStatus.startsWith('extracting') && <div className="py-4" data-unique-id="5f474c13-3fc8-4e38-8083-97a051c81473" data-file-name="components/analyzer/InputSelector.tsx">
        <motion.div animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} className="mx-auto mb-3" data-unique-id="8dcb822e-094e-4080-8ddd-2d8cf0ce5f1a" data-file-name="components/analyzer/InputSelector.tsx">
          <FileText className="h-10 w-10 text-purple-500" />
        </motion.div>
        <p className="text-purple-700" data-unique-id="478e339b-11f7-419d-8738-482b5c5cead5" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          {fileProcessingStatus === 'extracting-pdf' && "Extracting text from PDF..."}
          {fileProcessingStatus === 'extracting-docx' && "Extracting text from DOCX..."}
          {fileProcessingStatus === 'extracting-text' && "Extracting text..."}
          {fileProcessingStatus === 'extracting-image' && "Extracting text from image..."}
        </p>
      </div>}

      {fileProcessingStatus === 'error' && <div className="py-4 text-red-600" data-unique-id="0273208a-15e3-4edb-bfe6-781e4bdd530f" data-file-name="components/analyzer/InputSelector.tsx">
        <AlertCircle className="h-10 w-10 mx-auto mb-3" />
        <p data-unique-id="fffe9e50-a04c-48ba-a4a3-f1e8347601eb" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="1c43388c-ba5d-4a7e-99fa-aca95dd2f304" data-file-name="components/analyzer/InputSelector.tsx">Error processing file. Please try another file.</span></p>
      </div>}

      {/* Content preview */}
      {content && activeMethod === 'file' && fileProcessingStatus !== 'detecting' && fileProcessingStatus !== 'extracting-pdf' && fileProcessingStatus !== 'extracting-docx' && fileProcessingStatus !== 'extracting-text' && <div className="mt-4 p-4 bg-white rounded-md border border-purple-200 shadow-sm" data-unique-id="f5b08e9b-054e-4cd1-898f-256cc8a3cd74" data-file-name="components/analyzer/InputSelector.tsx">
        <div className="flex justify-between items-center mb-2" data-unique-id="f26b3fe3-76c5-4082-84ec-e801b12ec8bb" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="flex items-center" data-unique-id="59829c31-f648-4799-b0db-2b78286b7934" data-file-name="components/analyzer/InputSelector.tsx">
            <FileText className="h-4 w-4 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-purple-700" data-unique-id="4cb8ac46-6a68-4b2b-9132-8550d157abf2" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="a1b50588-ce06-4da4-a1df-5532da9846bf" data-file-name="components/analyzer/InputSelector.tsx">File content preview:</span></span>
          </div>
          <button onClick={e => {
            e.stopPropagation();
            setContent('');
            setFile(null);
          }} className="text-purple-400 hover:text-purple-600 p-1" data-unique-id="a7e1de33-bd04-4e16-ae97-90358d8df17d" data-file-name="components/analyzer/InputSelector.tsx">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm text-slate-600 text-left max-h-40 overflow-y-auto bg-purple-50 p-3 rounded" data-unique-id="4be60301-0b45-47ba-9708-5223709b11a4" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          {content.substring(0, 500)}
          {content.length > 500 ? '...' : ''}
        </div>
      </div>}
    </div>}

    {activeMethod === 'image' && <>
      {imageUrl ? <div className="relative" data-unique-id="328dcbac-aaf5-434c-9c93-669cddde608d" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        {/* Processing progress bar */}
        {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-teal-500" style={{
          width: `${processingProgress}%`,
          transition: 'width 0.3s ease-in-out'
        }} data-unique-id="872262a0-0a9f-4fda-913e-8cee6ee670b9" data-file-name="components/analyzer/InputSelector.tsx" />}

        <button onClick={clearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-slate-50 z-10" data-unique-id="be6f80bf-c5d1-4150-b8ae-d33b62b64a61" data-file-name="components/analyzer/InputSelector.tsx">
          <X className="h-5 w-5 text-teal-600" />
        </button>

        <img src={imageUrl} alt="Uploaded T&C" className="w-full max-h-64 object-contain rounded-md border border-teal-200 shadow-sm" data-unique-id="20758e50-7194-47b2-8ca2-4c36791aeaff" data-file-name="components/analyzer/InputSelector.tsx" />

        {fileProcessingStatus === 'extracting-image' && <div className="absolute inset-0 flex items-center justify-center bg-teal-900/30 rounded-md" data-unique-id="a8bfc377-781b-450c-8864-2dd34143bccc" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3" data-unique-id="48ad7611-6bba-4f98-ba35-44caa3b30140" data-file-name="components/analyzer/InputSelector.tsx">
            <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }} data-unique-id="5cbeafa7-05a1-4968-a922-58c9d5742d81" data-file-name="components/analyzer/InputSelector.tsx">
              <Image className="h-6 w-6 text-teal-500" data-unique-id="e502391f-24c7-4748-8968-c25c18186ab5" data-file-name="components/analyzer/InputSelector.tsx" />
            </motion.div>
            <span className="text-teal-700 font-medium" data-unique-id="2a88be0a-d43b-4f64-90eb-b5e0094770eb" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="6377f5f7-97a6-4145-ad85-81e47a1e471c" data-file-name="components/analyzer/InputSelector.tsx">Extracting text...</span></span>
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
        }} className="mt-4 p-4 bg-white rounded-md border border-teal-200 shadow-sm" data-unique-id="6fd730f7-3ff6-4054-a393-2c70c0c8c689" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="flex items-center mb-2" data-unique-id="6baa0328-bf38-4130-b539-d2453a820fa9" data-file-name="components/analyzer/InputSelector.tsx">
            <FileText className="h-4 w-4 text-teal-500 mr-2" />
            <span className="text-sm font-medium text-teal-700" data-unique-id="e471cd40-d57b-43c4-bbb6-d8a3d260062f" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="36d83036-4e6a-40e1-80fe-1e7cdd4bae7d" data-file-name="components/analyzer/InputSelector.tsx">Extracted text preview:</span></span>
          </div>
          <div className="text-sm text-slate-600 max-h-40 overflow-y-auto bg-teal-50 p-3 rounded" data-unique-id="ecc4595b-a564-4607-b8c0-295588c3422e" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
            {content.substring(0, 500)}
            {content.length > 500 ? '...' : ''}
          </div>
        </motion.div>}
      </div> : <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-teal-500 bg-teal-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : 'border-teal-300 hover:border-teal-400 hover:bg-teal-50'}`} data-unique-id="049b846d-b8d5-454f-88f1-586076cb0220" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        <input {...getInputProps()} data-unique-id="7e66a2f4-868f-4cb0-aa9c-e2479371b42e" data-file-name="components/analyzer/InputSelector.tsx" />
        <Image className="h-10 w-10 text-teal-400 mx-auto mb-4" data-unique-id="6ed4163f-5e1f-4587-89bc-828eb249d15f" data-file-name="components/analyzer/InputSelector.tsx" />
        <p className="text-teal-700" data-unique-id="146f803b-ef27-4370-bd1a-8b0e7929d19e" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="24c6cf48-b666-4e66-aa95-1bb1c206d75d" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop an image with T&C text, or </span><span className="text-teal-600 font-semibold" data-unique-id="b8425ef0-ad1d-4cf7-96f0-e87b98cb8b01" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="a86d4d9f-1004-4ce9-86d8-7e810766fcbf" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
        <p className="text-teal-400 text-sm mt-2" data-unique-id="8c94d06b-aa4c-42b3-ac9a-ae671cdef36e" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="d2f3b47f-c11b-43ed-bf86-1b0e98b6f189" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .png, .jpg, .jpeg</span></p>

        {fileProcessingStatus === 'error' && <div className="absolute inset-0 flex items-center justify-center bg-red-900/10 rounded-md" data-unique-id="5cc0f1b8-ed76-4a49-98db-4ff2554ac34b" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="bg-white p-4 rounded-lg shadow-lg text-red-600" data-unique-id="13f69c65-c935-412d-843a-1deeda50e589" data-file-name="components/analyzer/InputSelector.tsx">
            <AlertCircle className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm" data-unique-id="8f0e90d7-3074-4a9e-b167-f1a23178088b" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="def7338f-cc67-4be1-a8d4-dd457f41e62c" data-file-name="components/analyzer/InputSelector.tsx">Error processing image. Please try another file.</span></p>
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
  }} className={`flex-1 py-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isActive ? 'bg-gradient-to-br from-purple-100 to-indigo-100 text-indigo-700 border-2 border-indigo-200 shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-200 hover:shadow-sm'}`} data-unique-id="6e2d9149-a72d-49af-b843-4bd5c70bf77c" data-file-name="components/analyzer/InputSelector.tsx">
    <motion.div animate={isActive ? {
      scale: [1, 1.15, 1],
      rotate: [0, 5, -5, 0]
    } : {}} transition={{
      duration: 0.5
    }} data-unique-id="b54efa31-19c4-40da-af9e-dc17a70b98a8" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      {icon}
    </motion.div>
    <span className="text-sm font-medium" data-unique-id="e839c0a5-2090-4884-a49d-b73dbe43637a" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">{label}</span>
  </motion.button>;
}