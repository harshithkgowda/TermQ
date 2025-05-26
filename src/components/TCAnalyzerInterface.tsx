'use client';

import { useState, useEffect } from 'react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import InputSelector from './analyzer/InputSelector';
import AnalysisResults from './analyzer/AnalysisResults';
import Summary from './analyzer/Summary';
import DocumentManager from './analyzer/DocumentManager';
import DocumentCompare from './analyzer/DocumentCompare';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2, FileText, Scale, FileCheck, CheckCircle, Save } from 'lucide-react';
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
  return <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-indigo-100" data-unique-id="bf480003-4be1-4f0d-8392-71a0c0c50f0b" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Document Manager */}
      <DocumentManager />
      
      {isCompareMode ? <DocumentCompare /> : <>
          {/* Tab Selection */}
          <div className="flex border-b border-indigo-100" data-unique-id="fe9d472f-a667-4363-94dd-d65578b46132" data-file-name="components/TCAnalyzerInterface.tsx">
            <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input T&C" />
            <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
            <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || summary.points.length === 0} label="Summary" />
          </div>
          
          {/* Content Area */}
          <div className="p-6 min-h-[500px]" data-unique-id="7f6eccdc-53b0-4503-8aab-a86962a385e3" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
            {error && <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="9a254c48-c54f-4fcf-8df4-4c031c735bd7" data-file-name="components/TCAnalyzerInterface.tsx">
                <AlertCircle className="mr-3 h-5 w-5" />
                <span className="font-medium" data-unique-id="e82a2522-4c92-4855-8c51-3e66a5cee4b5" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
              </motion.div>}
            
            {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="7621707a-cccc-4aba-86a6-ae953b40f63b" data-file-name="components/TCAnalyzerInterface.tsx">
                <AnalysisAnimation />
                <p className="mt-6 text-slate-600 text-lg" data-unique-id="c1c4c82c-6428-4196-96ad-05f01b875412" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="9c0db55b-8451-427f-b724-2e2375f12115" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your terms & conditions...</span></p>
              </div>}
            
            {!isAnalyzing && <>
                {activeTab === 'input' && <div data-unique-id="7a3c158c-56ee-4439-86c5-eb867d70010b" data-file-name="components/TCAnalyzerInterface.tsx">
                    <InputSelector />
                    <div className="mt-8 flex justify-between" data-unique-id="93c8f07c-3056-4726-934c-89de685e8747" data-file-name="components/TCAnalyzerInterface.tsx">
                      <div className="flex items-center" data-unique-id="82f918a4-d83e-4e20-a525-8e2800e34dae" data-file-name="components/TCAnalyzerInterface.tsx">
                        <input type="text" value={documentName} onChange={e => setDocumentName(e.target.value)} placeholder="Document name (required to save)" className="px-4 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-64" data-unique-id="b814b117-985d-4352-a8f6-21a53c4f872c" data-file-name="components/TCAnalyzerInterface.tsx" />
                        <motion.button onClick={handleSaveDocument} disabled={!documentName.trim() || !content || isSaving} whileHover={documentName.trim() && content ? {
                  scale: 1.03
                } : {}} whileTap={documentName.trim() && content ? {
                  scale: 0.97
                } : {}} className={`flex items-center px-4 py-2 rounded-r-md font-medium transition-all ${documentName.trim() && content && !isSaving ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="ec13cc2a-3d7a-4d8c-aafd-e86df06e788c" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? 'Saving...' : 'Save Document'}
                        </motion.button>
                      </div>
                      
                      <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
                scale: 1.03
              } : {}} whileTap={content ? {
                scale: 0.97
              } : {}} className={`px-8 py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="a4de4652-7a3f-4eba-8e93-7954122333cc" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="b65c2fec-39e8-4b4e-9c90-f966f350371f" data-file-name="components/TCAnalyzerInterface.tsx">
                        Analyze T&C
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
  return <button onClick={onClick} disabled={disabled} className={`px-8 py-4 font-medium transition-all relative ${isActive ? 'text-purple-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-purple-600'}`} data-unique-id="b65ae898-2c7c-4eaa-ae92-3bf64984287f" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500" initial={false} data-unique-id="bedf4b41-5eef-4f56-a094-35b3a076bee9" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}