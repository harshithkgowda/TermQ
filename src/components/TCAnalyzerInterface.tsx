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
  return <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-indigo-100" data-unique-id="7f4c7fe3-6d6c-4a2c-b8e1-ee8f664429ca" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Tab Selection */}
      <div className="flex border-b border-indigo-100" data-unique-id="1ed3ab5c-a158-438a-8e12-c74f2cf420c8" data-file-name="components/TCAnalyzerInterface.tsx">
        <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input T&C" />
        <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
        <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || summary.points.length === 0} label="Summary" />
      </div>
      
      {/* Content Area */}
      <div className="p-6 min-h-[500px]" data-unique-id="ea64d370-9770-4677-b50b-f1472d7a8a35" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
        {error && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="7019ecb6-ad5c-49ec-a34f-f5cf44f86ef8" data-file-name="components/TCAnalyzerInterface.tsx">
            <AlertCircle className="mr-3 h-5 w-5" />
            <span className="font-medium" data-unique-id="52927feb-ad98-4301-8a8a-3873d351c8bd" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
          </motion.div>}
        
        {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="aba6a2e0-9b75-49bd-ada3-74e65bbbf4db" data-file-name="components/TCAnalyzerInterface.tsx">
            <AnalysisAnimation />
            <p className="mt-6 text-slate-600 text-lg" data-unique-id="bcae71d9-cc2b-4201-a391-69c27483d357" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="127d9815-61f3-4eb3-8586-81062c73b6d5" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your terms & conditions...</span></p>
          </div>}
        
        {!isAnalyzing && <>
            {activeTab === 'input' && <div data-unique-id="d94b6b2f-5a9b-4fd9-b3c3-ede692d45c04" data-file-name="components/TCAnalyzerInterface.tsx">
                <InputSelector />
                <div className="mt-8 flex justify-end" data-unique-id="cd5f1878-67d1-4c85-9193-16d0a6a00436" data-file-name="components/TCAnalyzerInterface.tsx">
                  <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
              scale: 1.03
            } : {}} whileTap={content ? {
              scale: 0.97
            } : {}} className={`px-8 py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="0f9f9dba-ec06-4f55-aa8c-a37bc751acbc" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="58119bca-427d-4f72-afc5-df839da22e1d" data-file-name="components/TCAnalyzerInterface.tsx">
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
  return <button onClick={onClick} disabled={disabled} className={`px-8 py-4 font-medium transition-all relative ${isActive ? 'text-purple-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-purple-600'}`} data-unique-id="b487776f-8f59-4bad-8cee-6445d7ad7b9e" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500" initial={false} data-unique-id="d6b76575-e163-42ab-a036-9f0b6062798f" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}