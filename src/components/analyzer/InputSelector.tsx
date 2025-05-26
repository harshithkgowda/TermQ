'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FileText, Upload, Image, X } from 'lucide-react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import { extractTextFromImage } from '@/lib/analyzer';
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
        // Create object URL
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
        
        // Show processing status
        setFileProcessingStatus('extracting-image');
        setProcessingProgress(30);

        // Extract text from image
        const extractedText = await extractTextFromImage(imageUrl);
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
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
  };
  return <div>
      <div className="flex gap-4 mb-6">
        <MethodButton isActive={activeMethod === 'text'} onClick={() => setActiveMethod('text')} icon={<FileText />} label="Paste Text" />
        <MethodButton isActive={activeMethod === 'file'} onClick={() => setActiveMethod('file')} icon={<Upload />} label="Upload File" />
        <MethodButton isActive={activeMethod === 'image'} onClick={() => setActiveMethod('image')} icon={<Image />} label="Upload Image" />
      </div>
      
      {activeMethod === 'text' && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your terms & conditions text here..." className="w-full h-64 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />}
      
      {activeMethod === 'file' && 
        <div 
          {...getRootProps()} 
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            isDragActive ? 'border-purple-500 bg-purple-50' : 
            fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' :
            fileProcessingStatus === 'complete' ? 'border-green-400 bg-green-50' :
            'border-purple-300 hover:border-purple-400 hover:bg-purple-50'
          }`}
        >
          <input {...getInputProps()} />
          
          {/* Processing progress bar */}
          {processingProgress > 0 && (
            <div className="absolute left-0 top-0 h-1 bg-purple-500" style={{ width: `${processingProgress}%`, transition: 'width 0.3s ease-in-out' }} />
          )}
          
          {fileProcessingStatus === '' && (
            <>
              <Upload className="h-10 w-10 text-purple-400 mx-auto mb-4" />
              <p className="text-purple-700">Drag & drop your T&C file here, or <span className="text-purple-600 font-semibold">click to browse</span></p>
              <p className="text-purple-400 text-sm mt-2">Supported formats: .txt, .pdf, .doc, .docx</p>
            </>
          )}
          
          {fileProcessingStatus === 'detecting' && (
            <div className="py-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-3"
              >
                <Upload className="h-10 w-10 text-purple-500" />
              </motion.div>
              <p className="text-purple-700">Analyzing file type...</p>
            </div>
          )}
          
          {fileProcessingStatus.startsWith('extracting') && (
            <div className="py-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-auto mb-3"
              >
                <FileText className="h-10 w-10 text-purple-500" />
              </motion.div>
              <p className="text-purple-700">
                {fileProcessingStatus === 'extracting-pdf' && "Extracting text from PDF..."}
                {fileProcessingStatus === 'extracting-docx' && "Extracting text from DOCX..."}
                {fileProcessingStatus === 'extracting-text' && "Extracting text..."}
                {fileProcessingStatus === 'extracting-image' && "Extracting text from image..."}
              </p>
            </div>
          )}
          
          {fileProcessingStatus === 'error' && (
            <div className="py-4 text-red-600">
              <AlertCircle className="h-10 w-10 mx-auto mb-3" />
              <p>Error processing file. Please try another file.</p>
            </div>
          )}
          
          {/* Content preview */}
          {content && activeMethod === 'file' && fileProcessingStatus !== 'detecting' && 
           fileProcessingStatus !== 'extracting-pdf' && 
           fileProcessingStatus !== 'extracting-docx' && 
           fileProcessingStatus !== 'extracting-text' && (
            <div className="mt-4 p-4 bg-white rounded-md border border-purple-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-purple-700">File content preview:</span>
                </div>
                <button 
                  onClick={e => {
                    e.stopPropagation();
                    setContent('');
                    setFile(null);
                  }} 
                  className="text-purple-400 hover:text-purple-600 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm text-slate-600 text-left max-h-40 overflow-y-auto bg-purple-50 p-3 rounded">
                {content.substring(0, 500)}
                {content.length > 500 ? '...' : ''}
              </div>
            </div>
          )}
        </div>
      }
      
      {activeMethod === 'image' && <>
          {imageUrl ? (
            <div className="relative">
              {/* Processing progress bar */}
              {processingProgress > 0 && (
                <div className="absolute left-0 top-0 h-1 bg-teal-500" style={{ width: `${processingProgress}%`, transition: 'width 0.3s ease-in-out' }} />
              )}
              
              <button 
                onClick={clearImage} 
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-slate-50 z-10"
              >
                <X className="h-5 w-5 text-teal-600" />
              </button>
              
              <img 
                src={imageUrl} 
                alt="Uploaded T&C" 
                className="w-full max-h-64 object-contain rounded-md border border-teal-200 shadow-sm" 
              />
              
              {fileProcessingStatus === 'extracting-image' && (
                <div className="absolute inset-0 flex items-center justify-center bg-teal-900/30 rounded-md">
                  <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >
                      <Image className="h-6 w-6 text-teal-500" />
                    </motion.div>
                    <span className="text-teal-700 font-medium">Extracting text...</span>
                  </div>
                </div>
              )}
              
              {content && fileProcessingStatus !== 'extracting-image' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-white rounded-md border border-teal-200 shadow-sm"
                >
                  <div className="flex items-center mb-2">
                    <FileText className="h-4 w-4 text-teal-500 mr-2" />
                    <span className="text-sm font-medium text-teal-700">Extracted text preview:</span>
                  </div>
                  <div className="text-sm text-slate-600 max-h-40 overflow-y-auto bg-teal-50 p-3 rounded">
                    {content.substring(0, 500)}
                    {content.length > 500 ? '...' : ''}
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div 
              {...getRootProps()} 
              className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                isDragActive ? 'border-teal-500 bg-teal-50' : 
                fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' :
                'border-teal-300 hover:border-teal-400 hover:bg-teal-50'
              }`}
            >
              <input {...getInputProps()} />
              <Image className="h-10 w-10 text-teal-400 mx-auto mb-4" />
              <p className="text-teal-700">Drag & drop an image with T&C text, or <span className="text-teal-600 font-semibold">click to browse</span></p>
              <p className="text-teal-400 text-sm mt-2">Supported formats: .png, .jpg, .jpeg</p>
              
              {fileProcessingStatus === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-900/10 rounded-md">
                  <div className="bg-white p-4 rounded-lg shadow-lg text-red-600">
                    <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm">Error processing image. Please try another file.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>}
    </div>;
}
import { AlertCircle, FileText, Upload, Image, X } from 'lucide-react';
import { extractTextFromImage, extractTextFromPDF, extractTextFromDOCX, getFileType } from '@/lib/analyzer';

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
  return (
    <motion.button 
      onClick={onClick} 
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      className={`flex-1 py-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${
        isActive 
          ? 'bg-gradient-to-br from-purple-100 to-indigo-100 text-indigo-700 border-2 border-indigo-200 shadow-md' 
          : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-200 hover:shadow-sm'
      }`}
    >
      <motion.div
        animate={isActive ? { 
          scale: [1, 1.15, 1],
          rotate: [0, 5, -5, 0]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
}
