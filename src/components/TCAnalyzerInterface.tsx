'use client';

import { useState, useEffect } from 'react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import InputSelector from './analyzer/InputSelector';
import AnalysisResults from './analyzer/AnalysisResults';
import Summary from './analyzer/Summary';
import AIInsights from './analyzer/AIInsights';
import DocumentCompare from './analyzer/DocumentCompare';
import Sidebar from './ui/Sidebar';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, Save, Menu, X, ArrowRight } from 'lucide-react';
import { analyzeContent } from '@/lib/analyzer';
import AnalysisAnimation from './ui/AnalysisAnimation';
export default function TCAnalyzerInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    content,
    isAnalyzing,
    analysisPoints,
    summary,
    aiInsights,
    error,
    setError,
    setIsAnalyzing,
    isCompareMode,
    addDocument,
    getCurrentDocument
  } = useAnalyzerStore();
  const [activeTab, setActiveTab] = useState<'input' | 'results' | 'summary' | 'ai-insights'>(analysisPoints.length > 0 ? 'results' : 'input');
  const [documentName, setDocumentName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Update document name when current document changes
  const currentDocument = getCurrentDocument();
  useEffect(() => {
    if (currentDocument) {
      setDocumentName(currentDocument.name);
    } else {
      setDocumentName('');
    }
  }, [currentDocument]);
  const handleAnalyze = async () => {
    try {
      setError(null);
      setIsAnalyzing(true);
      await analyzeContent();
      setActiveTab('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsAnalyzing(false);
    }
  };
  const handleSaveDocument = () => {
    if (!documentName.trim()) return;
    setIsSaving(true);

    // Create a new document with the current content and analysis
    const newDocument = {
      id: `doc-${Date.now()}`,
      name: documentName,
      content,
      file: null,
      imageUrl: null,
      analysisPoints,
      summary,
      createdAt: new Date()
    };
    addDocument(newDocument);
    setIsSaving(false);
    setDocumentName('');
  };
  return <div className="flex h-screen overflow-hidden" data-unique-id="bde4d34c-69de-4803-9878-1b7e39a7c8fb" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static z-20 h-full`} data-unique-id="dd4f1e2f-395e-45d4-ae26-6dfa8991cd90" data-file-name="components/TCAnalyzerInterface.tsx">
        <Sidebar />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} data-unique-id="bec1c2c7-2d54-4485-924a-120d2002b4e2" data-file-name="components/TCAnalyzerInterface.tsx"></div>}
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full" data-unique-id="3f861827-1ff7-41aa-8192-2d897d1acaeb" data-file-name="components/TCAnalyzerInterface.tsx">
        <div className="bg-white h-full" data-unique-id="78e40669-8e01-476b-a839-52dcc797168b" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
          {/* App Header */}
          <div className="bg-gradient-to-r from-cyan-50 via-violet-50 to-teal-50 p-4 md:p-6 border-b border-indigo-100 relative" data-unique-id="fd266ddd-6f84-450a-ad50-5594d2650421" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
            {/* Sidebar Toggle - Moved to top right instead of overlapping with content */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute top-4 left-4 z-30 p-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-md shadow-md flex items-center justify-center" data-unique-id="5965dc0d-7e9e-4528-8854-5b70213a4cbd" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="text-center max-w-4xl mx-auto" data-unique-id="4fc48124-d4d1-40dd-867d-666869847b27" data-file-name="components/TCAnalyzerInterface.tsx">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent mb-2" data-unique-id="cdc91d07-ae5e-401e-97fb-18a923b6bdde" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="fe3649b5-625a-4168-a722-08e031624f8f" data-file-name="components/TCAnalyzerInterface.tsx">
                TermQ
              </span></h1>
              <p className="text-slate-600 mb-4" data-unique-id="af71a1db-3578-448b-93a5-54858769f043" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="8dff5837-fb55-4aa7-a1cd-8f7a447c2ec5" data-file-name="components/TCAnalyzerInterface.tsx">
                Analyze Terms & Conditions documents and break them down into simple, understandable points
              </span></p>
              <div className="flex justify-center gap-4 text-sm text-blue-600" data-unique-id="b1fbe880-2309-4d1d-a0ff-f376b5f2193b" data-file-name="components/TCAnalyzerInterface.tsx">
                <div className="flex items-center" data-unique-id="aa7002d0-270c-463d-bdcd-47821d1d1fa0" data-file-name="components/TCAnalyzerInterface.tsx">
                  <AlertCircle className="h-4 w-4 mr-1.5 text-red-500" />
                  <span data-unique-id="908f5ae3-a4e4-46d9-bd3d-8b0c57c8a676" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="d59daf03-8f7a-4a31-afc8-44635562a10b" data-file-name="components/TCAnalyzerInterface.tsx">Harmful Points</span></span>
                </div>
                <div className="flex items-center" data-unique-id="2e134b1e-b555-48af-80fe-a6ea13be592e" data-file-name="components/TCAnalyzerInterface.tsx">
                  <CheckCircle className="h-4 w-4 mr-1.5 text-emerald-500" />
                  <span data-unique-id="914e5ff8-5fa4-4bb8-82ef-9555ae700fc8" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="4b004e32-ce4c-4fd9-bbc2-cb582dddfd39" data-file-name="components/TCAnalyzerInterface.tsx">Beneficial Points</span></span>
                </div>
                <div className="flex items-center" data-unique-id="928a90e6-7d00-4bd0-b8a0-6de77819716f" data-file-name="components/TCAnalyzerInterface.tsx">
                  <Info className="h-4 w-4 mr-1.5 text-amber-500" />
                  <span data-unique-id="a08aa146-7d93-44a7-8bdf-ff2c9b9e5526" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="dc49322b-c389-443f-9c94-bac415b83b66" data-file-name="components/TCAnalyzerInterface.tsx">Things to Be Aware Of</span></span>
                </div>
              </div>
            </div>
          </div>
          {isCompareMode ? <DocumentCompare /> : <>
              {/* Tab Selection */}
              <div className="flex flex-wrap border-b border-blue-100 bg-white sticky top-0 z-10" data-unique-id="4f8263a1-5128-4251-90e4-bb7fa2879183" data-file-name="components/TCAnalyzerInterface.tsx">
                <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input Document" />
                <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
                <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || !summary?.points?.length} label="Summary" />
                <TabButton isActive={activeTab === 'ai-insights'} onClick={() => setActiveTab('ai-insights')} disabled={isAnalyzing || !aiInsights} label="AI Insights" />
              </div>
              
              {/* Content Area */}
              <div className="p-4 md:p-6 min-h-[calc(100vh-48px)]" data-unique-id="7edc1b21-5efd-4ddd-bb96-835127a31361" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                {error && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="6127a26d-b124-4308-806d-0e044b043879" data-file-name="components/TCAnalyzerInterface.tsx">
                    <AlertCircle className="mr-3 h-5 w-5" />
                    <span className="font-medium" data-unique-id="5e83f8ab-3211-46d8-b4db-c54c084cdc72" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
                  </motion.div>}
                
                {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="d682543e-caca-42b2-affc-2ad84f904964" data-file-name="components/TCAnalyzerInterface.tsx">
                    <AnalysisAnimation />
                    <p className="mt-6 text-slate-600 text-lg" data-unique-id="c38eef1c-f76d-47d8-90ff-76065b4cce8e" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="83d8675d-f3ba-4275-b17e-26240c8d1832" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your document...</span></p>
                  </div>}
                
                {!isAnalyzing && <>
                    {activeTab === 'input' && <div data-unique-id="bf65c26b-ec0d-42cd-823a-3931dc1ea65b" data-file-name="components/TCAnalyzerInterface.tsx">
                        <InputSelector />
                        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between gap-4" data-unique-id="533854f5-abe2-4045-a1e6-ff300d0979fe" data-file-name="components/TCAnalyzerInterface.tsx">
                          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto" data-unique-id="6d437886-d4c3-4fd5-a12e-43b01d8504b1" data-file-name="components/TCAnalyzerInterface.tsx">
                            <input type="text" value={documentName} onChange={e => setDocumentName(e.target.value)} placeholder="Document name (required to save)" className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-md md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500" data-unique-id="4004d3f2-10e5-49c7-ba62-d7257f039d55" data-file-name="components/TCAnalyzerInterface.tsx" />
                            <motion.button onClick={handleSaveDocument} disabled={!documentName.trim() || !content || isSaving} whileHover={documentName.trim() && content ? {
                      scale: 1.03
                    } : {}} whileTap={documentName.trim() && content ? {
                      scale: 0.97
                    } : {}} className={`flex items-center w-full md:w-auto mt-2 md:mt-0 px-4 py-2 md:rounded-l-none rounded-md font-medium transition-all justify-center ${documentName.trim() && content && !isSaving ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="3f0d8c55-a581-4156-bda9-0903b769fa74" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                              <Save className="h-4 w-4 mr-2" />
                              {isSaving ? 'Saving...' : 'Save Document'}
                            </motion.button>
                          </div>
                          
                          <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
                    scale: 1.03
                  } : {}} whileTap={content ? {
                    scale: 0.97
                  } : {}} className={`w-full md:w-auto px-6 md:px-8 py-2 md:py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="55fc93b5-21e5-4d0b-b561-e35c0743437d" data-file-name="components/TCAnalyzerInterface.tsx">
                            <span className="flex items-center" data-unique-id="52f1bf4d-ca5c-48cf-9f5d-e72c223e2a57" data-file-name="components/TCAnalyzerInterface.tsx">
                              <span data-unique-id="5bd23553-be10-441a-b9ac-9d12f2191fe1" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="14fc437f-733a-4104-a95d-f19e4f9ae22d" data-file-name="components/TCAnalyzerInterface.tsx">Analyze Document</span></span>
                              <motion.div animate={{
                        x: content ? [0, 5, 0] : 0
                      }} transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                        repeatDelay: 0.5
                      }} className="ml-2" data-unique-id="2e9da1b8-b1ea-4acf-a0be-37fbaf5052d2" data-file-name="components/TCAnalyzerInterface.tsx">
                                <ArrowRight className="h-4 w-4" />
                              </motion.div>
                            </span>
                          </motion.button>
                        </div>
                      </div>}
                    {activeTab === 'results' && <AnalysisResults />}
                    {activeTab === 'summary' && <Summary />}
                    {activeTab === 'ai-insights' && <AIInsights />}
                  </>}
              </div>
            </>}
        </div>
      </div>
    </div>;
}
function TabButton({
  isActive,
  onClick,
  disabled,
  label
}: {
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return <button onClick={onClick} disabled={disabled} className={`px-4 md:px-8 py-3 md:py-4 font-medium transition-all relative flex-1 md:flex-none text-center ${isActive ? 'text-indigo-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-indigo-600'}`} data-unique-id="5cb1093c-613f-462b-80a2-4a50d2960a72" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      <span className="relative z-10" data-unique-id="52859528-3c34-4f7d-96e3-6c059dc8c725" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{label}</span>
      {isActive && <motion.div layoutId="activeTab" transition={{
      type: "spring",
      stiffness: 500,
      damping: 30
    }} className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-indigo-500" initial={false} data-unique-id="7e1a1414-864a-4b78-9d10-678826f7bfd5" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}