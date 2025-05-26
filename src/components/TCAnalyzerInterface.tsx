'use client';

import { useState, useEffect } from 'react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import InputSelector from './analyzer/InputSelector';
import AnalysisResults from './analyzer/AnalysisResults';
import Summary from './analyzer/Summary';
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
    error,
    setError,
    setIsAnalyzing,
    isCompareMode,
    addDocument,
    getCurrentDocument
  } = useAnalyzerStore();
  const [activeTab, setActiveTab] = useState<'input' | 'results' | 'summary'>(analysisPoints.length > 0 ? 'results' : 'input');
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
  return <div className="flex h-screen overflow-hidden" data-unique-id="cdce1cad-c0c6-4117-ba75-4cb912c37455" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Sidebar Toggle for Mobile */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-md shadow-md lg:hidden flex items-center justify-center" data-unique-id="91020487-edd3-4526-8bbb-b5ea0903ab12" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static z-20 h-full`} data-unique-id="8ddab0e0-7ba1-4f94-94a4-a443d359a31c" data-file-name="components/TCAnalyzerInterface.tsx">
        <Sidebar />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} data-unique-id="f0a252cc-da36-4031-ac15-3c1b9996aecc" data-file-name="components/TCAnalyzerInterface.tsx"></div>}
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full" data-unique-id="fd77c191-db82-4062-9533-ccf36d7cd33d" data-file-name="components/TCAnalyzerInterface.tsx">
        <div className="bg-white h-full" data-unique-id="15871076-a1fc-4386-9099-c90aeb0fa03b" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
          {isCompareMode ? <DocumentCompare /> : <>
              {/* Tab Selection */}
              <div className="flex flex-wrap border-b border-blue-100 bg-white sticky top-0 z-10" data-unique-id="1bf3c1cc-42d2-451e-b8e3-16a993f7e83e" data-file-name="components/TCAnalyzerInterface.tsx">
                <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input Document" />
                <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
                <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || !summary?.points?.length} label="Summary" />
              </div>
              
              {/* Content Area */}
              <div className="p-4 md:p-6 min-h-[calc(100vh-48px)]" data-unique-id="88e5d5c2-e626-4beb-ba08-e7b586375226" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                {error && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="dd4cf9d1-a8cf-4632-8ab7-fb9484e9bd68" data-file-name="components/TCAnalyzerInterface.tsx">
                    <AlertCircle className="mr-3 h-5 w-5" />
                    <span className="font-medium" data-unique-id="13f9f63f-9e4f-48de-b9be-b5b02f58c6a6" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
                  </motion.div>}
                
                {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="6c6a7b26-4d50-4bdd-8bef-a7da0e218585" data-file-name="components/TCAnalyzerInterface.tsx">
                    <AnalysisAnimation />
                    <p className="mt-6 text-slate-600 text-lg" data-unique-id="e3c9ba7e-e577-4c75-ac60-2894417b83bc" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="12cb80fc-32e6-4612-b21c-deaa79ae85a0" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your document...</span></p>
                  </div>}
                
                {!isAnalyzing && <>
                    {activeTab === 'input' && <div data-unique-id="0b7fdd57-8069-4a4c-ad7b-2f8eaf84a36c" data-file-name="components/TCAnalyzerInterface.tsx">
                        <InputSelector />
                        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between gap-4" data-unique-id="3b8e05e2-7246-4c71-811e-9491159aad27" data-file-name="components/TCAnalyzerInterface.tsx">
                          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto" data-unique-id="dd5e6057-e010-4b72-afd0-dde26c7781d9" data-file-name="components/TCAnalyzerInterface.tsx">
                            <input type="text" value={documentName} onChange={e => setDocumentName(e.target.value)} placeholder="Document name (required to save)" className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-md md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500" data-unique-id="7c0e3d7f-3948-4cbf-abfd-a7f3f0ed12bb" data-file-name="components/TCAnalyzerInterface.tsx" />
                            <motion.button onClick={handleSaveDocument} disabled={!documentName.trim() || !content || isSaving} whileHover={documentName.trim() && content ? {
                      scale: 1.03
                    } : {}} whileTap={documentName.trim() && content ? {
                      scale: 0.97
                    } : {}} className={`flex items-center w-full md:w-auto mt-2 md:mt-0 px-4 py-2 md:rounded-l-none rounded-md font-medium transition-all justify-center ${documentName.trim() && content && !isSaving ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="ead8d102-126e-4e4d-8b41-6ecf10a0a109" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                              <Save className="h-4 w-4 mr-2" />
                              {isSaving ? 'Saving...' : 'Save Document'}
                            </motion.button>
                          </div>
                          
                          <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
                    scale: 1.03
                  } : {}} whileTap={content ? {
                    scale: 0.97
                  } : {}} className={`w-full md:w-auto px-6 md:px-8 py-2 md:py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="5b26989c-2a02-4922-8cb0-4f08b61c16ce" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="a78edb6f-a4e5-4488-9283-47ad4d5ef1f2" data-file-name="components/TCAnalyzerInterface.tsx">
                            Analyze Document
                          </span></motion.button>
                        </div>
                      </div>}
                    {activeTab === 'results' && <AnalysisResults />}
                    {activeTab === 'summary' && <Summary />}
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
  return <button onClick={onClick} disabled={disabled} className={`px-4 md:px-8 py-3 md:py-4 font-medium transition-all relative flex-1 md:flex-none text-center ${isActive ? 'text-blue-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-blue-600'}`} data-unique-id="bd0bd062-2eb7-4827-958c-ed65ce33c757" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" initial={false} data-unique-id="c0ad311b-2eb4-4c12-beb9-88ce2a073fac" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}