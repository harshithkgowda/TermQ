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
  return <div data-unique-id="def62010-200e-49d4-9b0c-3b2f1810c575" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6" data-unique-id="ca367038-c3e2-446b-a80c-b747ccf4eb57" data-file-name="components/analyzer/InputSelector.tsx">
      <MethodButton isActive={activeMethod === 'text'} onClick={() => setActiveMethod('text')} icon={<FileText />} label="Paste Text" />
      <MethodButton isActive={activeMethod === 'file'} onClick={() => setActiveMethod('file')} icon={<Upload />} label="Upload File" />
      <MethodButton isActive={activeMethod === 'image'} onClick={() => setActiveMethod('image')} icon={<Image data-unique-id="ff21871e-b250-48c2-80d9-aa30f3ae39ec" data-file-name="components/analyzer/InputSelector.tsx" />} label="Upload Image" />
    </div>

    {activeMethod === 'text' && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your document text here..." className="w-full h-64 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" data-unique-id="ab67fe53-2655-43a7-b69c-f913e24c6398" data-file-name="components/analyzer/InputSelector.tsx" />}

    {activeMethod === 'file' && <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-purple-500 bg-purple-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : fileProcessingStatus === 'complete' ? 'border-green-400 bg-green-50' : 'border-purple-300 hover:border-purple-400 hover:bg-purple-50'}`} data-unique-id="e9413724-b2c9-4c27-b980-bc65931360e2" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      <input {...getInputProps()} data-unique-id="53de7bbd-3fd8-4b5c-9bdf-af00dcf76088" data-file-name="components/analyzer/InputSelector.tsx" />

      {/* Processing progress bar */}
      {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-purple-500" style={{
        width: `${processingProgress}%`,
        transition: 'width 0.3s ease-in-out'
      }} data-unique-id="b5844d34-95ac-42e3-b465-2a712dcfcc3d" data-file-name="components/analyzer/InputSelector.tsx" />}

      {fileProcessingStatus === '' && <>
        <Upload className="h-10 w-10 text-purple-400 mx-auto mb-4" />
        <p className="text-purple-700" data-unique-id="3f3ea812-1b29-41f8-a646-91fde910aee8" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="086ccbba-6c12-4adb-b640-15bb48e558db" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop your T&C file here, or </span><span className="text-purple-600 font-semibold" data-unique-id="58c90ef5-a204-4ee2-b414-0eff54f74c79" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="170896b6-4e63-49b9-8f14-15fc60d367e5" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
        <p className="text-purple-400 text-sm mt-2" data-unique-id="b040b56d-743f-4846-872a-9d370d921ef5" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="4359dbc4-ad1c-4414-8488-84a8b6bdfd49" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .txt, .pdf, .doc, .docx</span></p>
      </>}

      {fileProcessingStatus === 'detecting' && <div className="py-4" data-unique-id="b1510965-da29-4d84-b35c-ba21fbbc3558" data-file-name="components/analyzer/InputSelector.tsx">
        <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }} className="mx-auto mb-3" data-unique-id="8e49a2f2-a94c-425c-bae0-7700a06f3edc" data-file-name="components/analyzer/InputSelector.tsx">
          <Upload className="h-10 w-10 text-purple-500" />
        </motion.div>
        <p className="text-purple-700" data-unique-id="0747d2d7-8beb-429d-9da6-f4758a434a1c" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="7aabfc7c-9e48-4119-b3d2-799462d13a71" data-file-name="components/analyzer/InputSelector.tsx">Analyzing file type...</span></p>
      </div>}

      {fileProcessingStatus.startsWith('extracting') && <div className="py-4" data-unique-id="8ff358d7-95f6-4e65-bfd0-1b5621d65e2a" data-file-name="components/analyzer/InputSelector.tsx">
        <motion.div animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} className="mx-auto mb-3" data-unique-id="2310a809-dd37-472a-a1c4-621148cfb55b" data-file-name="components/analyzer/InputSelector.tsx">
          <FileText className="h-10 w-10 text-purple-500" />
        </motion.div>
        <p className="text-purple-700" data-unique-id="dc66f465-9080-472c-888c-a7c1cac2982e" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          {fileProcessingStatus === 'extracting-pdf' && "Extracting text from PDF..."}
          {fileProcessingStatus === 'extracting-docx' && "Extracting text from DOCX..."}
          {fileProcessingStatus === 'extracting-text' && "Extracting text..."}
          {fileProcessingStatus === 'extracting-image' && "Extracting text from image..."}
        </p>
      </div>}

      {fileProcessingStatus === 'error' && <div className="py-4 text-red-600" data-unique-id="a95f8abc-d5c9-4f01-a80c-faaa18ce93c1" data-file-name="components/analyzer/InputSelector.tsx">
        <AlertCircle className="h-10 w-10 mx-auto mb-3" />
        <p data-unique-id="4fb2bed7-de77-454e-b445-51e169064abb" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="6022f187-a6dc-488a-8b29-9383af26eb89" data-file-name="components/analyzer/InputSelector.tsx">Error processing file. Please try another file.</span></p>
      </div>}

      {/* Content preview */}
      {content && activeMethod === 'file' && fileProcessingStatus !== 'detecting' && fileProcessingStatus !== 'extracting-pdf' && fileProcessingStatus !== 'extracting-docx' && fileProcessingStatus !== 'extracting-text' && <div className="mt-4 p-4 bg-white rounded-md border border-purple-200 shadow-sm" data-unique-id="3f249074-9f90-4b50-ba54-0c374c9d4435" data-file-name="components/analyzer/InputSelector.tsx">
        <div className="flex justify-between items-center mb-2" data-unique-id="d6d8229e-9e0a-4b16-b590-e57472c25346" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="flex items-center" data-unique-id="329e0c9e-ba88-4ca2-bb35-592efcd51d01" data-file-name="components/analyzer/InputSelector.tsx">
            <FileText className="h-4 w-4 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-purple-700" data-unique-id="4a4739f4-0998-4124-a850-1ddd9feea0f4" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="7c6cbeff-35cc-4823-961d-8d99654328a2" data-file-name="components/analyzer/InputSelector.tsx">File content preview:</span></span>
          </div>
          <button onClick={e => {
            e.stopPropagation();
            setContent('');
            setFile(null);
          }} className="text-purple-400 hover:text-purple-600 p-1" data-unique-id="4c6c0ecf-b126-4d4c-8a7c-0364cad94777" data-file-name="components/analyzer/InputSelector.tsx">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm text-slate-600 text-left max-h-40 overflow-y-auto bg-purple-50 p-3 rounded" data-unique-id="f36c5eb4-9d32-4c4b-90ce-d643cfb3c10a" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          {content.substring(0, 500)}
          {content.length > 500 ? '...' : ''}
        </div>
      </div>}
    </div>}

    {activeMethod === 'image' && <>
      {imageUrl ? <div className="relative" data-unique-id="a877103d-db0d-445b-ae85-9e18c709164b" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        {/* Processing progress bar */}
        {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-teal-500" style={{
          width: `${processingProgress}%`,
          transition: 'width 0.3s ease-in-out'
        }} data-unique-id="5acbd515-5a56-4ba3-a7ae-16b601bb3317" data-file-name="components/analyzer/InputSelector.tsx" />}

        <button onClick={clearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-slate-50 z-10" data-unique-id="26d39cdc-fd28-4634-9dc6-3f8fab43c473" data-file-name="components/analyzer/InputSelector.tsx">
          <X className="h-5 w-5 text-teal-600" />
        </button>

        <img src={imageUrl} alt="Uploaded T&C" className="w-full max-h-64 object-contain rounded-md border border-teal-200 shadow-sm" data-unique-id="499ff016-3479-4f25-a614-f58c71a50531" data-file-name="components/analyzer/InputSelector.tsx" />

        {fileProcessingStatus === 'extracting-image' && <div className="absolute inset-0 flex items-center justify-center bg-teal-900/30 rounded-md" data-unique-id="c716e325-228e-44c8-8788-6d775d5fd1c2" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3" data-unique-id="cd24fab9-25f2-4891-8f09-431631568e52" data-file-name="components/analyzer/InputSelector.tsx">
            <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }} data-unique-id="b38aac34-3c45-48ff-9371-b204d806570e" data-file-name="components/analyzer/InputSelector.tsx">
              <Image className="h-6 w-6 text-teal-500" data-unique-id="df5871aa-3107-49bf-8861-66739312a65a" data-file-name="components/analyzer/InputSelector.tsx" />
            </motion.div>
            <span className="text-teal-700 font-medium" data-unique-id="885516dd-6071-461c-9542-63b3d51ebef8" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="7dd73618-d4da-4df4-8f77-143fe51fd3ac" data-file-name="components/analyzer/InputSelector.tsx">Extracting text...</span></span>
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
        }} className="mt-4 p-4 bg-white rounded-md border border-teal-200 shadow-sm" data-unique-id="bc3c2295-4187-444c-8e98-17e364dd6335" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="flex items-center mb-2" data-unique-id="7c248806-4723-4784-af8f-02fc1d7ad365" data-file-name="components/analyzer/InputSelector.tsx">
            <FileText className="h-4 w-4 text-teal-500 mr-2" />
            <span className="text-sm font-medium text-teal-700" data-unique-id="f06ae7b1-a9d0-4aa8-84c1-36184753bcf6" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="b0bf4ad5-8069-4d18-ac9e-98894501d67b" data-file-name="components/analyzer/InputSelector.tsx">Extracted text preview:</span></span>
          </div>
          <div className="text-sm text-slate-600 max-h-40 overflow-y-auto bg-teal-50 p-3 rounded" data-unique-id="30512937-3bab-4226-986a-80062a4b2af3" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
            {content.substring(0, 500)}
            {content.length > 500 ? '...' : ''}
          </div>
        </motion.div>}
      </div> : <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-teal-500 bg-teal-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : 'border-teal-300 hover:border-teal-400 hover:bg-teal-50'}`} data-unique-id="45ba08f2-4885-4a11-a72d-f4033443a126" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        <input {...getInputProps()} data-unique-id="7523727a-9da3-4ea9-936a-0779c9391427" data-file-name="components/analyzer/InputSelector.tsx" />
        <Image className="h-10 w-10 text-teal-400 mx-auto mb-4" data-unique-id="04462e48-6fbd-4c8a-bcd8-ca52ef665169" data-file-name="components/analyzer/InputSelector.tsx" />
        <p className="text-teal-700" data-unique-id="fd0aea7d-4df4-4a8d-971e-fbdb4a1590ec" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="e8e1e172-f51e-4796-895b-9105bb190fd2" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop an image with T&C text, or </span><span className="text-teal-600 font-semibold" data-unique-id="8f55c671-80d8-44ff-9a49-a5786eba6607" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="2a5d7c2d-a4b0-4ddc-837d-822e78450c6a" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
        <p className="text-teal-400 text-sm mt-2" data-unique-id="43a842b0-9df5-407e-a224-8fadac0edea2" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="bcef4b6d-cc10-47a3-8038-06dab36a4d5d" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .png, .jpg, .jpeg</span></p>

        {fileProcessingStatus === 'error' && <div className="absolute inset-0 flex items-center justify-center bg-red-900/10 rounded-md" data-unique-id="40826d7d-0fe8-44f9-b052-6e0f50cd3e20" data-file-name="components/analyzer/InputSelector.tsx">
          <div className="bg-white p-4 rounded-lg shadow-lg text-red-600" data-unique-id="3a66921b-e5b4-40b2-a194-46bb3543eded" data-file-name="components/analyzer/InputSelector.tsx">
            <AlertCircle className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm" data-unique-id="00bce283-b6e2-413d-8493-0416e992c095" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="d4e6a290-acc7-448e-b0fe-2ba16907b7f6" data-file-name="components/analyzer/InputSelector.tsx">Error processing image. Please try another file.</span></p>
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
  }} className={`flex-1 py-3 md:py-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isActive ? 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 border-2 border-blue-200 shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:shadow-sm'}`} data-unique-id="4fc7d5d4-15ca-4331-942f-de9d3a7517e1" data-file-name="components/analyzer/InputSelector.tsx">
    <motion.div animate={isActive ? {
      scale: [1, 1.15, 1],
      rotate: [0, 5, -5, 0]
    } : {}} transition={{
      duration: 0.5
    }} data-unique-id="031d178f-1144-4e79-9f13-33a9c54b24be" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      {icon}
    </motion.div>
    <span className="text-sm font-medium" data-unique-id="efec1f7f-5c27-4ff8-8a6c-1ffb66818404" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">{label}</span>
  </motion.button>;
}