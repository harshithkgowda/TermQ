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
  return <div data-unique-id="a85d98b4-4731-467f-a26e-7fb24c672db7" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      <div className="flex gap-4 mb-6" data-unique-id="5155a9ee-77ff-47c8-8be1-edebc5c19dff" data-file-name="components/analyzer/InputSelector.tsx">
        <MethodButton isActive={activeMethod === 'text'} onClick={() => setActiveMethod('text')} icon={<FileText />} label="Paste Text" />
        <MethodButton isActive={activeMethod === 'file'} onClick={() => setActiveMethod('file')} icon={<Upload />} label="Upload File" />
        <MethodButton isActive={activeMethod === 'image'} onClick={() => setActiveMethod('image')} icon={<Image data-unique-id="9dde138b-8090-4210-8d80-72b0d0fb7511" data-file-name="components/analyzer/InputSelector.tsx" />} label="Upload Image" />
      </div>
      
      {activeMethod === 'text' && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your terms & conditions text here..." className="w-full h-64 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" data-unique-id="0f50ee29-0531-4e06-a41a-e05dba80daae" data-file-name="components/analyzer/InputSelector.tsx" />}
      
      {activeMethod === 'file' && <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-purple-500 bg-purple-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : fileProcessingStatus === 'complete' ? 'border-green-400 bg-green-50' : 'border-purple-300 hover:border-purple-400 hover:bg-purple-50'}`} data-unique-id="41bbe2c0-8089-49a5-b7b2-e1061e06a7f2" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          <input {...getInputProps()} data-unique-id="1792a0c7-b319-4843-b637-d64fc0d90662" data-file-name="components/analyzer/InputSelector.tsx" />
          
          {/* Processing progress bar */}
          {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-purple-500" style={{
        width: `${processingProgress}%`,
        transition: 'width 0.3s ease-in-out'
      }} data-unique-id="b9543098-2e03-4b27-b271-f81ca3e1076d" data-file-name="components/analyzer/InputSelector.tsx" />}
          
          {fileProcessingStatus === '' && <>
              <Upload className="h-10 w-10 text-purple-400 mx-auto mb-4" />
              <p className="text-purple-700" data-unique-id="6bcbc7fc-449c-4620-9837-19b1d32e39bf" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="b71ac89b-f330-47e1-b2d5-af57d42b7528" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop your T&C file here, or </span><span className="text-purple-600 font-semibold" data-unique-id="00d62313-61b3-41fa-9318-a529853955e9" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="b4966cb9-dcb6-4327-944f-4a554c3aff83" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
              <p className="text-purple-400 text-sm mt-2" data-unique-id="85710f16-3ed0-4e57-909c-4f003e450e60" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="545a3980-c148-4dc4-9401-0da2acd8a356" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .txt, .pdf, .doc, .docx</span></p>
            </>}
          
          {fileProcessingStatus === 'detecting' && <div className="py-4" data-unique-id="79b07a6e-3e5b-40c9-9e42-4c9f7ca7adc3" data-file-name="components/analyzer/InputSelector.tsx">
              <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }} className="mx-auto mb-3" data-unique-id="cb912769-f121-465f-b352-64b1232b8003" data-file-name="components/analyzer/InputSelector.tsx">
                <Upload className="h-10 w-10 text-purple-500" />
              </motion.div>
              <p className="text-purple-700" data-unique-id="17262ade-8005-46c7-bdc8-bcf404ee9479" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="7dae1e42-e502-4103-a668-0a4e06c30c78" data-file-name="components/analyzer/InputSelector.tsx">Analyzing file type...</span></p>
            </div>}
          
          {fileProcessingStatus.startsWith('extracting') && <div className="py-4" data-unique-id="8682cd1b-55cd-4f6b-9174-d16a3a2916ea" data-file-name="components/analyzer/InputSelector.tsx">
              <motion.div animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} className="mx-auto mb-3" data-unique-id="9f371078-f6ed-4d84-ae53-43d194c0571e" data-file-name="components/analyzer/InputSelector.tsx">
                <FileText className="h-10 w-10 text-purple-500" />
              </motion.div>
              <p className="text-purple-700" data-unique-id="9f278319-e700-44c3-8871-bfdbb7759dba" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
                {fileProcessingStatus === 'extracting-pdf' && "Extracting text from PDF..."}
                {fileProcessingStatus === 'extracting-docx' && "Extracting text from DOCX..."}
                {fileProcessingStatus === 'extracting-text' && "Extracting text..."}
                {fileProcessingStatus === 'extracting-image' && "Extracting text from image..."}
              </p>
            </div>}
          
          {fileProcessingStatus === 'error' && <div className="py-4 text-red-600" data-unique-id="f1044f1c-d762-4f13-b48f-e92545301ffa" data-file-name="components/analyzer/InputSelector.tsx">
              <AlertCircle className="h-10 w-10 mx-auto mb-3" />
              <p data-unique-id="febec8c6-6816-4f5a-8d78-d880a9d3e8b2" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="c9cdd24e-2583-43ef-82dc-8767ae329df2" data-file-name="components/analyzer/InputSelector.tsx">Error processing file. Please try another file.</span></p>
            </div>}
          
          {/* Content preview */}
          {content && activeMethod === 'file' && fileProcessingStatus !== 'detecting' && fileProcessingStatus !== 'extracting-pdf' && fileProcessingStatus !== 'extracting-docx' && fileProcessingStatus !== 'extracting-text' && <div className="mt-4 p-4 bg-white rounded-md border border-purple-200 shadow-sm" data-unique-id="4135753c-a558-4e9c-8634-cfab37cb3a62" data-file-name="components/analyzer/InputSelector.tsx">
              <div className="flex justify-between items-center mb-2" data-unique-id="3adffe4a-bc8c-4189-a5ad-a6d52ba34fb5" data-file-name="components/analyzer/InputSelector.tsx">
                <div className="flex items-center" data-unique-id="d5c0d565-47c2-4eb9-88f4-974b9a039b93" data-file-name="components/analyzer/InputSelector.tsx">
                  <FileText className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-purple-700" data-unique-id="4ed6bc7e-f7fb-4543-8690-cbccb09e41ad" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="d198d1e1-1ff4-4b1f-a390-ae74b32ece96" data-file-name="components/analyzer/InputSelector.tsx">File content preview:</span></span>
                </div>
                <button onClick={e => {
            e.stopPropagation();
            setContent('');
            setFile(null);
          }} className="text-purple-400 hover:text-purple-600 p-1" data-unique-id="e39647d7-3f66-4484-abcd-e9a1c30cd950" data-file-name="components/analyzer/InputSelector.tsx">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm text-slate-600 text-left max-h-40 overflow-y-auto bg-purple-50 p-3 rounded" data-unique-id="ef1483b3-0c4e-4ab1-b44a-8cee0b417ba1" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
                {content.substring(0, 500)}
                {content.length > 500 ? '...' : ''}
              </div>
            </div>}
        </div>}
      
      {activeMethod === 'image' && <>
          {imageUrl ? <div className="relative" data-unique-id="b4108908-94cf-4620-95f8-720dfbb02a49" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
              {/* Processing progress bar */}
              {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-teal-500" style={{
          width: `${processingProgress}%`,
          transition: 'width 0.3s ease-in-out'
        }} data-unique-id="e2bf40de-a77b-4864-aa06-b1e4c10263d8" data-file-name="components/analyzer/InputSelector.tsx" />}
              
              <button onClick={clearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-slate-50 z-10" data-unique-id="4c8ffbf6-db34-4628-a6b8-7dbdab6e1045" data-file-name="components/analyzer/InputSelector.tsx">
                <X className="h-5 w-5 text-teal-600" />
              </button>
              
              <img src={imageUrl} alt="Uploaded T&C" className="w-full max-h-64 object-contain rounded-md border border-teal-200 shadow-sm" data-unique-id="85745957-6a73-46be-80e9-d9d0357fd079" data-file-name="components/analyzer/InputSelector.tsx" />
              
              {fileProcessingStatus === 'extracting-image' && <div className="absolute inset-0 flex items-center justify-center bg-teal-900/30 rounded-md" data-unique-id="282a10a5-382f-415c-adf6-ad5683491348" data-file-name="components/analyzer/InputSelector.tsx">
                  <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3" data-unique-id="c4facef8-96f1-4daf-9239-f6b7cf014b39" data-file-name="components/analyzer/InputSelector.tsx">
                    <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }} data-unique-id="d421f944-ef00-4102-80cd-c073ea60b595" data-file-name="components/analyzer/InputSelector.tsx">
                      <Image className="h-6 w-6 text-teal-500" data-unique-id="62e16131-d3e2-4f07-8053-83e1841abd73" data-file-name="components/analyzer/InputSelector.tsx" />
                    </motion.div>
                    <span className="text-teal-700 font-medium" data-unique-id="b418ac7d-ee89-417c-914d-67ff5998b148" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="f9e81129-a604-4baf-b307-469995bf2f4f" data-file-name="components/analyzer/InputSelector.tsx">Extracting text...</span></span>
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
        }} className="mt-4 p-4 bg-white rounded-md border border-teal-200 shadow-sm" data-unique-id="28c985b2-b830-492f-9fa0-501b53d16855" data-file-name="components/analyzer/InputSelector.tsx">
                  <div className="flex items-center mb-2" data-unique-id="52d2ccd1-7993-4a22-84bc-85dc38258cc3" data-file-name="components/analyzer/InputSelector.tsx">
                    <FileText className="h-4 w-4 text-teal-500 mr-2" />
                    <span className="text-sm font-medium text-teal-700" data-unique-id="38bc29f5-90e2-4da2-aa24-e50a33c5ddf0" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="273ec11d-3885-42e6-b006-62c628f314b8" data-file-name="components/analyzer/InputSelector.tsx">Extracted text preview:</span></span>
                  </div>
                  <div className="text-sm text-slate-600 max-h-40 overflow-y-auto bg-teal-50 p-3 rounded" data-unique-id="0337dda6-72ce-4c10-b14c-8c0bb0c76e6a" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
                    {content.substring(0, 500)}
                    {content.length > 500 ? '...' : ''}
                  </div>
                </motion.div>}
            </div> : <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-teal-500 bg-teal-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : 'border-teal-300 hover:border-teal-400 hover:bg-teal-50'}`} data-unique-id="b5ddc48c-05b9-45e0-8196-24d6749625db" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
              <input {...getInputProps()} data-unique-id="5f1b26b4-47ba-4027-8b54-a6e246ee8a86" data-file-name="components/analyzer/InputSelector.tsx" />
              <Image className="h-10 w-10 text-teal-400 mx-auto mb-4" data-unique-id="4e033ccb-c1c3-40f3-a5e0-0b814e3f7b4c" data-file-name="components/analyzer/InputSelector.tsx" />
              <p className="text-teal-700" data-unique-id="1b97d452-ac15-4e1f-9b7e-420078b16150" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="44e0ef38-8d0f-48b1-8d3e-5d9c3f72d349" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop an image with T&C text, or </span><span className="text-teal-600 font-semibold" data-unique-id="a398431c-2f90-4c92-bfb6-33dc6b09a4fc" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="66ca16be-4d45-42e3-bcc0-36ebaf77e620" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
              <p className="text-teal-400 text-sm mt-2" data-unique-id="272465a1-a121-4a20-af21-ec98fa1f5f2f" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="4de5487d-8a39-498a-8aba-e45e9fe08e8e" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .png, .jpg, .jpeg</span></p>
              
              {fileProcessingStatus === 'error' && <div className="absolute inset-0 flex items-center justify-center bg-red-900/10 rounded-md" data-unique-id="ee97aba1-2e81-4ac4-9161-09f37ddfa7ed" data-file-name="components/analyzer/InputSelector.tsx">
                  <div className="bg-white p-4 rounded-lg shadow-lg text-red-600" data-unique-id="ab8cae29-c6ad-4dd1-b012-8bae62f4b08b" data-file-name="components/analyzer/InputSelector.tsx">
                    <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm" data-unique-id="c66590ba-5d43-47f7-8619-2f4766a5cffb" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="60965211-2ca3-4184-841e-e68d5db28f83" data-file-name="components/analyzer/InputSelector.tsx">Error processing image. Please try another file.</span></p>
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
  }} className={`flex-1 py-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isActive ? 'bg-gradient-to-br from-purple-100 to-indigo-100 text-indigo-700 border-2 border-indigo-200 shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-200 hover:shadow-sm'}`} data-unique-id="19855b6f-0dc7-4745-8233-98de847597ee" data-file-name="components/analyzer/InputSelector.tsx">
      <motion.div animate={isActive ? {
      scale: [1, 1.15, 1],
      rotate: [0, 5, -5, 0]
    } : {}} transition={{
      duration: 0.5
    }} data-unique-id="054de81e-53bd-4492-aa91-748ec559ec4f" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        {icon}
      </motion.div>
      <span className="text-sm font-medium" data-unique-id="4696e13e-5d17-4ef7-bc57-44c3fd6c6342" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">{label}</span>
    </motion.button>;
}