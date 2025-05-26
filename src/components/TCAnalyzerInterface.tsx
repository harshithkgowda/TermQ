'use client';

import { useState } from 'react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import InputSelector from './analyzer/InputSelector';
import AnalysisResults from './analyzer/AnalysisResults';
import Summary from './analyzer/Summary';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2, FileText, Scale, FileCheck, CheckCircle } from 'lucide-react';
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
    setIsAnalyzing
  } = useAnalyzerStore();
  const [activeTab, setActiveTab] = useState<'input' | 'results' | 'summary'>(analysisPoints.length > 0 ? 'results' : 'input');
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
  return <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-indigo-100" data-unique-id="d815f9ec-311b-4079-a2fc-3f061e6040f5" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Tab Selection */}
      <div className="flex border-b border-indigo-100" data-unique-id="2a4a5dc7-ad22-486a-b6f3-7288e629520b" data-file-name="components/TCAnalyzerInterface.tsx">
        <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input T&C" />
        <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
        <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || summary.points.length === 0} label="Summary" />
      </div>
      
      {/* Content Area */}
      <div className="p-6 min-h-[500px]" data-unique-id="d524531e-e147-403b-8b59-f7789c7f52ac" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
        {error && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="3b417d69-e07d-41ac-b0e8-77fc0dc926a3" data-file-name="components/TCAnalyzerInterface.tsx">
            <AlertCircle className="mr-3 h-5 w-5" />
            <span className="font-medium" data-unique-id="86afa1b5-e548-4109-8369-d5a41ded0209" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
          </motion.div>}
        
        {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="6399bf0e-80ef-48e3-b73d-1a2c36b2902c" data-file-name="components/TCAnalyzerInterface.tsx">
            <AnalysisAnimation />
            <p className="mt-6 text-slate-600 text-lg" data-unique-id="2abc3cb8-0cd9-4c20-8681-4cdcc29e549f" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="41c7b890-82ac-4b0a-bc17-10f382bc3323" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your terms & conditions...</span></p>
          </div>}
        
        {!isAnalyzing && <>
            {activeTab === 'input' && <div data-unique-id="0764b93f-abe0-45f5-bcc1-721bafe55bc6" data-file-name="components/TCAnalyzerInterface.tsx">
                <InputSelector />
                <div className="mt-8 flex justify-end" data-unique-id="983f3096-0544-4545-ab15-1163f2664794" data-file-name="components/TCAnalyzerInterface.tsx">
                  <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
              scale: 1.03
            } : {}} whileTap={content ? {
              scale: 0.97
            } : {}} className={`px-8 py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="497cb58c-8691-4107-9a86-06a8ed2a7de5" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="9fc5bbeb-b9fc-4ba6-89c3-4e22a42eae1b" data-file-name="components/TCAnalyzerInterface.tsx">
                    Analyze T&C
                  </span></motion.button>
                </div>
              </div>}
            {activeTab === 'results' && <AnalysisResults />}
            {activeTab === 'summary' && <Summary />}
          </>}
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
  return <button onClick={onClick} disabled={disabled} className={`px-8 py-4 font-medium transition-all relative ${isActive ? 'text-purple-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-purple-600'}`} data-unique-id="69ce0b1a-ca1d-42b0-b7e4-fabca871055e" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500" initial={false} data-unique-id="56d13cc9-c190-4ba8-87f6-ae1c6ca3cf14" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}