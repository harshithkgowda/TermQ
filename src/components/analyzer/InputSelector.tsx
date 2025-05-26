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
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    if (activeMethod === 'file') {
      setFile(file);
      try {
        const text = await file.text();
        setContent(text);
      } catch (err) {
        console.error("Error reading file:", err);
      }
    } else if (activeMethod === 'image') {
      try {
        // Create object URL
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);

        // Extract text from image
        const extractedText = await extractTextFromImage(imageUrl);
        setContent(extractedText);
      } catch (err) {
        console.error("Error processing image:", err);
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
      'text/*': ['.txt', '.pdf', '.doc', '.docx']
    } : {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false
  });
  const clearImage = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
  };
  return <div data-unique-id="cc42df4e-d2b7-45c8-b859-cacfaa0d7549" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      <div className="flex gap-4 mb-6" data-unique-id="cfe2211b-e4f9-4876-86a7-0d72ca9ef202" data-file-name="components/analyzer/InputSelector.tsx">
        <MethodButton isActive={activeMethod === 'text'} onClick={() => setActiveMethod('text')} icon={<FileText />} label="Paste Text" />
        <MethodButton isActive={activeMethod === 'file'} onClick={() => setActiveMethod('file')} icon={<Upload />} label="Upload File" />
        <MethodButton isActive={activeMethod === 'image'} onClick={() => setActiveMethod('image')} icon={<Image data-unique-id="d94821ae-ba07-4c14-ac92-9f86a608c0f2" data-file-name="components/analyzer/InputSelector.tsx" />} label="Upload Image" />
      </div>
      
      {activeMethod === 'text' && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your terms & conditions text here..." className="w-full h-64 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" data-unique-id="09ac29a2-5e2d-49b1-b208-c85eb3a0644c" data-file-name="components/analyzer/InputSelector.tsx" />}
      
      {activeMethod === 'file' && <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400'}`} data-unique-id="ec7c5ca0-a2cf-4c32-a3e0-b0bc97e2d157" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          <input {...getInputProps()} data-unique-id="a0e8a9a5-78fd-4c60-94b4-e00d993c283e" data-file-name="components/analyzer/InputSelector.tsx" />
          <Upload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600" data-unique-id="e1d5162e-9740-4eb3-bc6b-660b67306895" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="6c1964dc-5ea5-4420-8c57-a656ff9abc5d" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop your T&C file here, or </span><span className="text-indigo-600" data-unique-id="08ec8466-55fe-43bc-b30a-f2bf6a5543de" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="4b43467b-7a0c-4bc7-a400-33b63e3bed18" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
          <p className="text-slate-400 text-sm mt-2" data-unique-id="cfa72f27-226c-4ccb-941c-2c0ea40930a4" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="72210849-48a3-4242-90ca-aa44b9f8a66e" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .txt, .pdf, .doc, .docx</span></p>
          
          {content && activeMethod === 'file' && <div className="mt-4 p-3 bg-slate-50 rounded-md border border-slate-200" data-unique-id="a79209dc-889e-4e03-b1a7-864efa2fceb2" data-file-name="components/analyzer/InputSelector.tsx">
              <div className="flex justify-between items-center mb-2" data-unique-id="77673ca4-eba1-4823-b803-52804d12a45d" data-file-name="components/analyzer/InputSelector.tsx">
                <span className="text-sm font-medium text-slate-700" data-unique-id="6eeccc13-0f53-4fb7-93db-96be6add0ff3" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="fd759fc0-63e6-4f36-92b0-7a740316584d" data-file-name="components/analyzer/InputSelector.tsx">File content preview:</span></span>
                <button onClick={e => {
            e.stopPropagation();
            setContent('');
            setFile(null);
          }} className="text-slate-400 hover:text-slate-600" data-unique-id="bc5d99a3-65dd-416a-a219-88d37b7c8b66" data-file-name="components/analyzer/InputSelector.tsx">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm text-slate-600 text-left max-h-40 overflow-y-auto" data-unique-id="54f471ef-6c81-4d64-a938-990f0b188080" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
                {content.substring(0, 500)}
                {content.length > 500 ? '...' : ''}
              </div>
            </div>}
        </div>}
      
      {activeMethod === 'image' && <>
          {imageUrl ? <div className="relative" data-unique-id="84cf0682-283d-45dc-b83f-b632024e5230" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
              <button onClick={clearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-slate-50" data-unique-id="eedaabcb-5b86-4b55-9ba2-1d0c3effae9b" data-file-name="components/analyzer/InputSelector.tsx">
                <X className="h-5 w-5 text-slate-600" />
              </button>
              <img src={imageUrl} alt="Uploaded T&C" className="w-full max-h-64 object-contain rounded-md border border-slate-300" data-unique-id="39569c41-a0db-4efd-adb3-1f8f55d5defb" data-file-name="components/analyzer/InputSelector.tsx" />
              {content && <div className="mt-4 p-3 bg-slate-50 rounded-md border border-slate-200" data-unique-id="c54e26e1-4e4b-42ac-b418-9bd5cb37478f" data-file-name="components/analyzer/InputSelector.tsx">
                  <div className="flex justify-between items-center mb-2" data-unique-id="4e30c06d-f58c-494e-a4b9-2b0c056121ad" data-file-name="components/analyzer/InputSelector.tsx">
                    <span className="text-sm font-medium text-slate-700" data-unique-id="5ffaffa2-88a7-4365-9f9f-70b09bc2be1f" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="3f57cc5e-6c1b-425a-b958-970f6d5b8661" data-file-name="components/analyzer/InputSelector.tsx">Extracted text preview:</span></span>
                  </div>
                  <div className="text-sm text-slate-600 max-h-40 overflow-y-auto" data-unique-id="54321706-6308-478a-b6ea-8bceea930e6e" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
                    {content.substring(0, 500)}
                    {content.length > 500 ? '...' : ''}
                  </div>
                </div>}
            </div> : <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400'}`} data-unique-id="1476005f-ee52-4447-a05b-c93e49d19060" data-file-name="components/analyzer/InputSelector.tsx">
              <input {...getInputProps()} data-unique-id="2ae5d983-aa73-46e8-99b9-dbaadadc9192" data-file-name="components/analyzer/InputSelector.tsx" />
              <Image className="h-10 w-10 text-slate-400 mx-auto mb-4" data-unique-id="7831205f-3ea4-423f-a663-f3d912f234d2" data-file-name="components/analyzer/InputSelector.tsx" />
              <p className="text-slate-600" data-unique-id="ee717376-5c39-44cf-a1ad-7248d3a3eb94" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="13acf883-9615-47f9-9b06-4e9b3b11c6bd" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop an image with T&C text, or </span><span className="text-indigo-600" data-unique-id="13d967a1-a5a4-4440-a838-a4d68a768366" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="95116970-4d42-428a-a5c7-ab4b6185b68b" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
              <p className="text-slate-400 text-sm mt-2" data-unique-id="b739d060-e52c-460f-8e63-7bfe4cf8ca49" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="96228622-b4b6-4c59-bd9d-80ba3d66dfb3" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .png, .jpg, .jpeg</span></p>
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
  }} className={`flex-1 py-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${isActive ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-200' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-indigo-200 hover:bg-slate-100'}`} data-unique-id="f3bc5e4e-5f57-4a94-b5a7-88d69ff9db42" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      {icon}
      <span className="text-sm font-medium" data-unique-id="41fc37bd-7695-49fb-99f8-1261030c7e8b" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">{label}</span>
    </motion.button>;
}