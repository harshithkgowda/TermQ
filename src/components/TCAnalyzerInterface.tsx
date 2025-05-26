'use client';

import { useState, useEffect } from 'react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import InputSelector from './analyzer/InputSelector';
import AnalysisResults from './analyzer/AnalysisResults';
import Summary from './analyzer/Summary';
import DocumentManager from './analyzer/DocumentManager';
import DocumentCompare from './analyzer/DocumentCompare';
import { motion } from 'framer-motion';
import { AlertCircle, FileText, Scale, FileCheck, CheckCircle, Save } from 'lucide-react';
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
  return <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-blue-100" data-unique-id="30224c1d-6ea9-420e-b581-7fb492393fca" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Document Manager */}
      <DocumentManager />
      
      {isCompareMode ? <DocumentCompare /> : <>
          {/* Tab Selection */}
          <div className="flex flex-wrap border-b border-blue-100" data-unique-id="3b3bdac8-905a-4a33-a176-aabe0926a306" data-file-name="components/TCAnalyzerInterface.tsx">
            <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input Document" />
            <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
            <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || summary.points.length === 0} label="Summary" />
          </div>
          
          {/* Content Area */}
          <div className="p-4 md:p-6 min-h-[400px] md:min-h-[500px]" data-unique-id="f1c4b907-12db-434a-bd54-4ce8fdba88d5" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
            {error && <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="0980fcb4-16d2-4e53-b67a-7d5f99518962" data-file-name="components/TCAnalyzerInterface.tsx">
                <AlertCircle className="mr-3 h-5 w-5" />
                <span className="font-medium" data-unique-id="0b3c8084-4da5-4bbc-a687-5cd30965007f" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
              </motion.div>}
            
            {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="8015d847-6ad6-4e89-bf33-8ab51c3f72e5" data-file-name="components/TCAnalyzerInterface.tsx">
                <AnalysisAnimation />
                <p className="mt-6 text-slate-600 text-lg" data-unique-id="7df75717-b46a-4f37-9912-54dd583c9332" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="bb18d1ee-e808-450c-879d-0f9f5dd3b19e" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your terms & conditions...</span></p>
              </div>}
            
            {!isAnalyzing && <>
                {activeTab === 'input' && <div data-unique-id="48522f1a-718d-48cf-a9c6-8e63eec69677" data-file-name="components/TCAnalyzerInterface.tsx">
                    <InputSelector />
                    <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between gap-4" data-unique-id="d4659df4-2d4a-4868-9863-ee15d2903cf3" data-file-name="components/TCAnalyzerInterface.tsx">
                      <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto" data-unique-id="0dd827bb-0411-4979-87ed-2d2824f0bb93" data-file-name="components/TCAnalyzerInterface.tsx">
                        <input type="text" value={documentName} onChange={e => setDocumentName(e.target.value)} placeholder="Document name (required to save)" className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-md md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500" data-unique-id="7640e918-9092-4814-a2f2-680557aa4cf5" data-file-name="components/TCAnalyzerInterface.tsx" />
                        <motion.button onClick={handleSaveDocument} disabled={!documentName.trim() || !content || isSaving} whileHover={documentName.trim() && content ? {
                  scale: 1.03
                } : {}} whileTap={documentName.trim() && content ? {
                  scale: 0.97
                } : {}} className={`flex items-center w-full md:w-auto mt-2 md:mt-0 px-4 py-2 md:rounded-l-none rounded-md font-medium transition-all justify-center ${documentName.trim() && content && !isSaving ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="6ecb24f6-08fe-4680-8703-df016ffaef10" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? 'Saving...' : 'Save Document'}
                        </motion.button>
                      </div>
                      
                      <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
                scale: 1.03
              } : {}} whileTap={content ? {
                scale: 0.97
              } : {}} className={`w-full md:w-auto px-6 md:px-8 py-2 md:py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="e43f3f77-8a35-4b7a-8d35-a41551a0eb7a" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="ccb8f44e-b4d2-4c74-80aa-33aff42c9c53" data-file-name="components/TCAnalyzerInterface.tsx">
                        Analyze Document
                      </span></motion.button>
                    </div>
                  </div>}
                {activeTab === 'results' && <AnalysisResults />}
                {activeTab === 'summary' && <Summary />}
              </>}
          </div>
        </>}
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
  return <button onClick={onClick} disabled={disabled} className={`px-4 md:px-8 py-3 md:py-4 font-medium transition-all relative flex-1 md:flex-none text-center ${isActive ? 'text-blue-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-blue-600'}`} data-unique-id="a8923804-44ec-4ae3-8406-85431a767061" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" initial={false} data-unique-id="0f583134-75ce-46f7-b6a1-44ba1c4b2621" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}