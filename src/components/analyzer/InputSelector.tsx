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
  return <div data-unique-id="1f089977-ea4f-4e7a-8390-7be407050451" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
      <div className="flex gap-4 mb-6" data-unique-id="5006ffce-72ec-4cf2-a963-16deeadb8e19" data-file-name="components/analyzer/InputSelector.tsx">
        <MethodButton isActive={activeMethod === 'text'} onClick={() => setActiveMethod('text')} icon={<FileText />} label="Paste Text" />
        <MethodButton isActive={activeMethod === 'file'} onClick={() => setActiveMethod('file')} icon={<Upload />} label="Upload File" />
        <MethodButton isActive={activeMethod === 'image'} onClick={() => setActiveMethod('image')} icon={<Image data-unique-id="be032e05-7b44-4ef5-b8c3-1f83492bc52b" data-file-name="components/analyzer/InputSelector.tsx" />} label="Upload Image" />
      </div>
      
      {activeMethod === 'text' && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your terms & conditions text here..." className="w-full h-64 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" data-unique-id="a1abefd0-83ec-4295-b540-e2a015613e8a" data-file-name="components/analyzer/InputSelector.tsx" />}
      
      {activeMethod === 'file' && <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-purple-500 bg-purple-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : fileProcessingStatus === 'complete' ? 'border-green-400 bg-green-50' : 'border-purple-300 hover:border-purple-400 hover:bg-purple-50'}`} data-unique-id="81422850-73d6-4bc8-9f99-7d59ab8879df" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
          <input {...getInputProps()} data-unique-id="adb88189-b562-4938-8814-0939257b88f5" data-file-name="components/analyzer/InputSelector.tsx" />
          
          {/* Processing progress bar */}
          {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-purple-500" style={{
        width: `${processingProgress}%`,
        transition: 'width 0.3s ease-in-out'
      }} data-unique-id="89db3368-6f60-477d-9674-c608e975b15b" data-file-name="components/analyzer/InputSelector.tsx" />}
          
          {fileProcessingStatus === '' && <>
              <Upload className="h-10 w-10 text-purple-400 mx-auto mb-4" />
              <p className="text-purple-700" data-unique-id="716a7f0e-7666-4d37-82d4-92055ddeac07" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="23d97450-c708-4b90-9645-cb88f3ddd810" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop your T&C file here, or </span><span className="text-purple-600 font-semibold" data-unique-id="27e4dd39-9efc-47e8-b8fa-0de399feda70" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="15df098b-13f2-42ba-b468-3ac11c46439c" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
              <p className="text-purple-400 text-sm mt-2" data-unique-id="bf27876b-8cbf-4c90-9a9d-99d9d57c2650" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="c244bc45-b438-4133-afa9-1a6a4a3f9533" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .txt, .pdf, .doc, .docx</span></p>
            </>}
          
          {fileProcessingStatus === 'detecting' && <div className="py-4" data-unique-id="69eaded5-a178-43d6-8602-a925849d5fee" data-file-name="components/analyzer/InputSelector.tsx">
              <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }} className="mx-auto mb-3" data-unique-id="25c3ed8b-c157-4795-9ae2-edc34ab87304" data-file-name="components/analyzer/InputSelector.tsx">
                <Upload className="h-10 w-10 text-purple-500" />
              </motion.div>
              <p className="text-purple-700" data-unique-id="5ccbca67-d9d1-4f9a-8552-d4ecbde9d048" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="71355ec7-9bc4-4b5c-95c6-9e9a6385b2e6" data-file-name="components/analyzer/InputSelector.tsx">Analyzing file type...</span></p>
            </div>}
          
          {fileProcessingStatus.startsWith('extracting') && <div className="py-4" data-unique-id="a2ed1faa-c7ef-413a-a900-ab62c37e085c" data-file-name="components/analyzer/InputSelector.tsx">
              <motion.div animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} className="mx-auto mb-3" data-unique-id="3d2f5fdc-20cc-4a91-9ee4-fefe13ba8807" data-file-name="components/analyzer/InputSelector.tsx">
                <FileText className="h-10 w-10 text-purple-500" />
              </motion.div>
              <p className="text-purple-700" data-unique-id="d83ba9cd-1db4-4459-8b87-7f126cb429fc" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
                {fileProcessingStatus === 'extracting-pdf' && "Extracting text from PDF..."}
                {fileProcessingStatus === 'extracting-docx' && "Extracting text from DOCX..."}
                {fileProcessingStatus === 'extracting-text' && "Extracting text..."}
                {fileProcessingStatus === 'extracting-image' && "Extracting text from image..."}
              </p>
            </div>}
          
          {fileProcessingStatus === 'error' && <div className="py-4 text-red-600" data-unique-id="2a76fb4c-49fb-4bc3-af3e-f5f2fb79a366" data-file-name="components/analyzer/InputSelector.tsx">
              <AlertCircle className="h-10 w-10 mx-auto mb-3" />
              <p data-unique-id="4aed7707-4809-40b6-8d26-4ab007e67e43" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="8ccbcacf-db43-4f04-830c-d51adcfca57c" data-file-name="components/analyzer/InputSelector.tsx">Error processing file. Please try another file.</span></p>
            </div>}
          
          {/* Content preview */}
          {content && activeMethod === 'file' && fileProcessingStatus !== 'detecting' && fileProcessingStatus !== 'extracting-pdf' && fileProcessingStatus !== 'extracting-docx' && fileProcessingStatus !== 'extracting-text' && <div className="mt-4 p-4 bg-white rounded-md border border-purple-200 shadow-sm" data-unique-id="c74e21de-618e-453b-96a9-fdab99258373" data-file-name="components/analyzer/InputSelector.tsx">
              <div className="flex justify-between items-center mb-2" data-unique-id="b9db9cca-15c9-4ad3-bd87-f389c400620c" data-file-name="components/analyzer/InputSelector.tsx">
                <div className="flex items-center" data-unique-id="0213e524-7924-4f2f-bdf1-9a6f75444b0a" data-file-name="components/analyzer/InputSelector.tsx">
                  <FileText className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-purple-700" data-unique-id="5b180a51-83a1-4d0e-b4b2-846c59ad8bac" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="00614a4e-83d6-4aad-a858-d18ddebfe0bb" data-file-name="components/analyzer/InputSelector.tsx">File content preview:</span></span>
                </div>
                <button onClick={e => {
            e.stopPropagation();
            setContent('');
            setFile(null);
          }} className="text-purple-400 hover:text-purple-600 p-1" data-unique-id="7753435b-a991-4606-a31e-3be6ac6a5cf7" data-file-name="components/analyzer/InputSelector.tsx">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm text-slate-600 text-left max-h-40 overflow-y-auto bg-purple-50 p-3 rounded" data-unique-id="078f6d97-6897-4818-bfe6-babdebbaa801" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
                {content.substring(0, 500)}
                {content.length > 500 ? '...' : ''}
              </div>
            </div>}
        </div>}
      
      {activeMethod === 'image' && <>
          {imageUrl ? <div className="relative" data-unique-id="ecd15d24-758b-4258-8da6-3aa0ed7d9738" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
              {/* Processing progress bar */}
              {processingProgress > 0 && <div className="absolute left-0 top-0 h-1 bg-teal-500" style={{
          width: `${processingProgress}%`,
          transition: 'width 0.3s ease-in-out'
        }} data-unique-id="4a75bc02-a754-454c-8f37-2ac48187bd7f" data-file-name="components/analyzer/InputSelector.tsx" />}
              
              <button onClick={clearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-slate-50 z-10" data-unique-id="d83d1cc0-e71a-4ce4-bedd-22ded85829d3" data-file-name="components/analyzer/InputSelector.tsx">
                <X className="h-5 w-5 text-teal-600" />
              </button>
              
              <img src={imageUrl} alt="Uploaded T&C" className="w-full max-h-64 object-contain rounded-md border border-teal-200 shadow-sm" data-unique-id="8d7de4ee-ae6d-4425-a9c7-bda85b0dde82" data-file-name="components/analyzer/InputSelector.tsx" />
              
              {fileProcessingStatus === 'extracting-image' && <div className="absolute inset-0 flex items-center justify-center bg-teal-900/30 rounded-md" data-unique-id="d730f740-6e74-4346-b05a-7f6ca74a6578" data-file-name="components/analyzer/InputSelector.tsx">
                  <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3" data-unique-id="6ebaced1-b788-414a-8bea-0eeac1cd3d7c" data-file-name="components/analyzer/InputSelector.tsx">
                    <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }} data-unique-id="216e3920-7a06-4394-94c3-0ca56ace34b9" data-file-name="components/analyzer/InputSelector.tsx">
                      <Image className="h-6 w-6 text-teal-500" data-unique-id="fda0f352-2988-44ac-bd78-5d56047e049e" data-file-name="components/analyzer/InputSelector.tsx" />
                    </motion.div>
                    <span className="text-teal-700 font-medium" data-unique-id="e6eccbf2-2564-482d-9eb8-dd5c54220453" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="39de8dcd-25f4-4861-bcb6-53a6e5f8bc2a" data-file-name="components/analyzer/InputSelector.tsx">Extracting text...</span></span>
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
        }} className="mt-4 p-4 bg-white rounded-md border border-teal-200 shadow-sm" data-unique-id="a2729cf3-fd6b-49e7-8631-a5a0a08e7164" data-file-name="components/analyzer/InputSelector.tsx">
                  <div className="flex items-center mb-2" data-unique-id="0b21ae93-552e-4bd3-a163-4578c15c13ac" data-file-name="components/analyzer/InputSelector.tsx">
                    <FileText className="h-4 w-4 text-teal-500 mr-2" />
                    <span className="text-sm font-medium text-teal-700" data-unique-id="3969d7d0-5f82-4715-8ba5-b9ed8e1ad115" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="cecfe260-8f34-44ac-9bc7-439b8538a5a5" data-file-name="components/analyzer/InputSelector.tsx">Extracted text preview:</span></span>
                  </div>
                  <div className="text-sm text-slate-600 max-h-40 overflow-y-auto bg-teal-50 p-3 rounded" data-unique-id="fbec040f-71a4-449a-acd1-a762e622740e" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
                    {content.substring(0, 500)}
                    {content.length > 500 ? '...' : ''}
                  </div>
                </motion.div>}
            </div> : <div {...getRootProps()} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-teal-500 bg-teal-50' : fileProcessingStatus === 'error' ? 'border-red-400 bg-red-50' : 'border-teal-300 hover:border-teal-400 hover:bg-teal-50'}`} data-unique-id="568ce767-ca46-40f2-becc-46731f30456b" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
              <input {...getInputProps()} data-unique-id="c07c30dc-1199-4c3a-866f-aead3835b823" data-file-name="components/analyzer/InputSelector.tsx" />
              <Image className="h-10 w-10 text-teal-400 mx-auto mb-4" data-unique-id="ac8ad36d-c261-4722-b2ad-f1815d83c3fb" data-file-name="components/analyzer/InputSelector.tsx" />
              <p className="text-teal-700" data-unique-id="6d39926b-99d6-412f-b8c9-701f397b43f9" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="6c440961-2cbf-4d7a-a7e7-50e4359e3228" data-file-name="components/analyzer/InputSelector.tsx">Drag & drop an image with T&C text, or </span><span className="text-teal-600 font-semibold" data-unique-id="3bddb454-24b9-4c0a-9417-d045b94f7289" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="32a984f7-5322-4063-abac-cbe5af242f89" data-file-name="components/analyzer/InputSelector.tsx">click to browse</span></span></p>
              <p className="text-teal-400 text-sm mt-2" data-unique-id="c552488c-0b07-43db-9377-017b6e45c734" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="8d248c35-fb95-46c2-9434-e55cea6a612d" data-file-name="components/analyzer/InputSelector.tsx">Supported formats: .png, .jpg, .jpeg</span></p>
              
              {fileProcessingStatus === 'error' && <div className="absolute inset-0 flex items-center justify-center bg-red-900/10 rounded-md" data-unique-id="92ab101c-11d1-4f20-8fa8-fd8f8225ef39" data-file-name="components/analyzer/InputSelector.tsx">
                  <div className="bg-white p-4 rounded-lg shadow-lg text-red-600" data-unique-id="d1b1052d-7306-473d-9295-5bb41618462e" data-file-name="components/analyzer/InputSelector.tsx">
                    <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm" data-unique-id="868917dd-eebc-41c0-95d2-3cf159211195" data-file-name="components/analyzer/InputSelector.tsx"><span className="editable-text" data-unique-id="ada63400-1c13-4bc3-a925-acf572f58bbb" data-file-name="components/analyzer/InputSelector.tsx">Error processing image. Please try another file.</span></p>
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
  }} className={`flex-1 py-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isActive ? 'bg-gradient-to-br from-purple-100 to-indigo-100 text-indigo-700 border-2 border-indigo-200 shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-200 hover:shadow-sm'}`} data-unique-id="869c1ccc-8a55-42a5-9052-ed1cb4932fec" data-file-name="components/analyzer/InputSelector.tsx">
      <motion.div animate={isActive ? {
      scale: [1, 1.15, 1],
      rotate: [0, 5, -5, 0]
    } : {}} transition={{
      duration: 0.5
    }} data-unique-id="c8f3c8f3-4bc8-4417-b23c-80323a4052ce" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">
        {icon}
      </motion.div>
      <span className="text-sm font-medium" data-unique-id="adfb94d3-b48e-45b1-89f5-ca369bffff95" data-file-name="components/analyzer/InputSelector.tsx" data-dynamic-text="true">{label}</span>
    </motion.button>;
}