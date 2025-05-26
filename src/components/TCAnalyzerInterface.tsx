'use client';

import { useState, useEffect } from 'react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import InputSelector from './analyzer/InputSelector';
import AnalysisResults from './analyzer/AnalysisResults';
import Summary from './analyzer/Summary';
import DocumentCompare from './analyzer/DocumentCompare';
import Sidebar from './ui/Sidebar';
import { motion } from 'framer-motion';
import { AlertCircle, Save } from 'lucide-react';
import { analyzeContent } from '@/lib/analyzer';
import AnalysisAnimation from './ui/AnalysisAnimation';
export default function TCAnalyzerInterface() {
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
  return <div className="flex h-screen overflow-hidden" data-unique-id="317c072b-5bfd-47e0-9442-e52f166d23f4" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto" data-unique-id="44b37122-91d0-4a7f-a83e-79c8219fa1dd" data-file-name="components/TCAnalyzerInterface.tsx">
        <div className="bg-white h-full" data-unique-id="0a930142-4295-4a45-93c5-efcae308320c" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
          {isCompareMode ? <DocumentCompare /> : <>
              {/* Tab Selection */}
              <div className="flex flex-wrap border-b border-blue-100 bg-white sticky top-0 z-10" data-unique-id="b32b4baf-4c76-4c46-9959-cf515ae0b77f" data-file-name="components/TCAnalyzerInterface.tsx">
                <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input Document" />
                <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
                <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || !summary?.points?.length} label="Summary" />
              </div>
              
              {/* Content Area */}
              <div className="p-4 md:p-6 min-h-[calc(100vh-48px)]" data-unique-id="981de1e6-3591-4d3a-bbbc-90e83382004d" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                {error && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="f7c5381c-1c90-4a55-9dbe-32b78a8d5eda" data-file-name="components/TCAnalyzerInterface.tsx">
                    <AlertCircle className="mr-3 h-5 w-5" />
                    <span className="font-medium" data-unique-id="e48be8b4-143b-4c25-a99e-1a2766e56b86" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
                  </motion.div>}
                
                {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="db1efb4d-fc5b-465b-8470-29e84e9d40fa" data-file-name="components/TCAnalyzerInterface.tsx">
                    <AnalysisAnimation />
                    <p className="mt-6 text-slate-600 text-lg" data-unique-id="b1158cb4-a9e5-4c4c-8ad8-b69e19ba44f2" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="2e832472-74e9-4af6-b050-d530b18f4e18" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your document...</span></p>
                  </div>}
                
                {!isAnalyzing && <>
                    {activeTab === 'input' && <div data-unique-id="b3a9fa07-522c-4362-955d-821422abbeb0" data-file-name="components/TCAnalyzerInterface.tsx">
                        <InputSelector />
                        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between gap-4" data-unique-id="ee6e16f8-b3ef-48f4-acce-42c47e4f1155" data-file-name="components/TCAnalyzerInterface.tsx">
                          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto" data-unique-id="d088131a-58e2-4521-9de3-e02c63242824" data-file-name="components/TCAnalyzerInterface.tsx">
                            <input type="text" value={documentName} onChange={e => setDocumentName(e.target.value)} placeholder="Document name (required to save)" className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-md md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500" data-unique-id="de239c1d-c56b-4740-9019-397423b7c50f" data-file-name="components/TCAnalyzerInterface.tsx" />
                            <motion.button onClick={handleSaveDocument} disabled={!documentName.trim() || !content || isSaving} whileHover={documentName.trim() && content ? {
                      scale: 1.03
                    } : {}} whileTap={documentName.trim() && content ? {
                      scale: 0.97
                    } : {}} className={`flex items-center w-full md:w-auto mt-2 md:mt-0 px-4 py-2 md:rounded-l-none rounded-md font-medium transition-all justify-center ${documentName.trim() && content && !isSaving ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="39ccd4dc-fa6f-4e36-9132-838a22eccecb" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                              <Save className="h-4 w-4 mr-2" />
                              {isSaving ? 'Saving...' : 'Save Document'}
                            </motion.button>
                          </div>
                          
                          <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
                    scale: 1.03
                  } : {}} whileTap={content ? {
                    scale: 0.97
                  } : {}} className={`w-full md:w-auto px-6 md:px-8 py-2 md:py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="82f55e6a-1693-4c24-a1b5-a83da127f29c" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="1e1ec4d4-432c-4a2e-af0d-148ea2150438" data-file-name="components/TCAnalyzerInterface.tsx">
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
  return <button onClick={onClick} disabled={disabled} className={`px-4 md:px-8 py-3 md:py-4 font-medium transition-all relative flex-1 md:flex-none text-center ${isActive ? 'text-blue-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-blue-600'}`} data-unique-id="dcc085af-c5b8-4a37-91de-3b72da0d4fb3" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" initial={false} data-unique-id="6e65257f-5782-4f3f-9aa9-7657cd99ec64" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}