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
import { AlertCircle, Save, Menu, X } from 'lucide-react';
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
  return <div className="flex h-screen overflow-hidden" data-unique-id="bf9095e8-51a4-4e09-ace5-347124c61cec" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Sidebar Toggle for Mobile */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-md shadow-md lg:hidden flex items-center justify-center" data-unique-id="31ea03d0-de12-4b68-a130-8cde7f08113a" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static z-20 h-full`} data-unique-id="788e2854-11e4-407e-9317-dd301e939d41" data-file-name="components/TCAnalyzerInterface.tsx">
        <Sidebar />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} data-unique-id="8c92300b-5b2a-4b49-9c2b-7c50ccade912" data-file-name="components/TCAnalyzerInterface.tsx"></div>}
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full" data-unique-id="ba88e39b-575b-4a9a-b3b7-b8c02f3a3a56" data-file-name="components/TCAnalyzerInterface.tsx">
        <div className="bg-white h-full" data-unique-id="0957a630-c116-4004-99de-fb7e8d8ca587" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
          {isCompareMode ? <DocumentCompare /> : <>
              {/* Tab Selection */}
              <div className="flex flex-wrap border-b border-blue-100 bg-white sticky top-0 z-10" data-unique-id="3eac748f-5bcc-4db6-be51-23be184d14df" data-file-name="components/TCAnalyzerInterface.tsx">
                <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input Document" />
                <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
                <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || !summary?.points?.length} label="Summary" />
                <TabButton isActive={activeTab === 'ai-insights'} onClick={() => setActiveTab('ai-insights')} disabled={isAnalyzing || !aiInsights} label="AI Insights" />
              </div>
              
              {/* Content Area */}
              <div className="p-4 md:p-6 min-h-[calc(100vh-48px)]" data-unique-id="c0c58e27-fb4f-4b0c-b2fe-276f6a649a82" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                {error && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="b69bf2d9-a035-4e73-93e2-39205a34ae24" data-file-name="components/TCAnalyzerInterface.tsx">
                    <AlertCircle className="mr-3 h-5 w-5" />
                    <span className="font-medium" data-unique-id="72b39148-0eef-4969-90e6-9041a48ac4e0" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
                  </motion.div>}
                
                {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="233a7579-53f9-4bf7-8dce-aff712937d88" data-file-name="components/TCAnalyzerInterface.tsx">
                    <AnalysisAnimation />
                    <p className="mt-6 text-slate-600 text-lg" data-unique-id="da252ea1-947b-4645-8ce5-20aaac9b0116" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="bd752828-9363-4ef6-9481-8965b11229b8" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your document...</span></p>
                  </div>}
                
                {!isAnalyzing && <>
                    {activeTab === 'input' && <div data-unique-id="328db9d1-508f-44d9-88e0-5f45b775ef61" data-file-name="components/TCAnalyzerInterface.tsx">
                        <InputSelector />
                        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between gap-4" data-unique-id="50bed84d-5bb5-4401-8f54-e537f8115c54" data-file-name="components/TCAnalyzerInterface.tsx">
                          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto" data-unique-id="e691c694-58d1-4837-b7e6-dc8d16d1ac03" data-file-name="components/TCAnalyzerInterface.tsx">
                            <input type="text" value={documentName} onChange={e => setDocumentName(e.target.value)} placeholder="Document name (required to save)" className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-md md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500" data-unique-id="dd20b4bc-8bd1-458c-9ff5-438f0f5c66bc" data-file-name="components/TCAnalyzerInterface.tsx" />
                            <motion.button onClick={handleSaveDocument} disabled={!documentName.trim() || !content || isSaving} whileHover={documentName.trim() && content ? {
                      scale: 1.03
                    } : {}} whileTap={documentName.trim() && content ? {
                      scale: 0.97
                    } : {}} className={`flex items-center w-full md:w-auto mt-2 md:mt-0 px-4 py-2 md:rounded-l-none rounded-md font-medium transition-all justify-center ${documentName.trim() && content && !isSaving ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="018f3487-62f3-482b-8101-456e3d2a1b36" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                              <Save className="h-4 w-4 mr-2" />
                              {isSaving ? 'Saving...' : 'Save Document'}
                            </motion.button>
                          </div>
                          
                          <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
                    scale: 1.03
                  } : {}} whileTap={content ? {
                    scale: 0.97
                  } : {}} className={`w-full md:w-auto px-6 md:px-8 py-2 md:py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="8b8dce2c-2545-41b4-a168-fbdc3138b1f1" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="fd493950-8835-4dc5-98af-80c8e83a779a" data-file-name="components/TCAnalyzerInterface.tsx">
                            Analyze Document
                          </span></motion.button>
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
  return <button onClick={onClick} disabled={disabled} className={`px-4 md:px-8 py-3 md:py-4 font-medium transition-all relative flex-1 md:flex-none text-center ${isActive ? 'text-blue-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-blue-600'}`} data-unique-id="7df7da81-6003-4cab-8b6d-7b54ca9ad72e" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" initial={false} data-unique-id="286cf449-92b1-468e-83a3-363937d5c385" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}