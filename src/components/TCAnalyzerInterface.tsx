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
  return <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-indigo-100" data-unique-id="df4e3952-e6b8-44b2-848b-45ebc11ecc39" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Tab Selection */}
      <div className="flex border-b border-indigo-100" data-unique-id="978fe641-b199-48b5-97a1-2cdbfca016b8" data-file-name="components/TCAnalyzerInterface.tsx">
        <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input T&C" />
        <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
        <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || summary.points.length === 0} label="Summary" />
      </div>
      
      {/* Content Area */}
      <div className="p-6 min-h-[500px]" data-unique-id="5c081b6e-e244-44fe-8fe8-7c96a46909ea" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
        {error && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="ead1dc36-bf1f-4950-9331-3090dcaa1edd" data-file-name="components/TCAnalyzerInterface.tsx">
            <AlertCircle className="mr-3 h-5 w-5" />
            <span className="font-medium" data-unique-id="dbbbbada-08a3-4496-844b-aecf1e2a4a6a" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
          </motion.div>}
        
        {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="4b46aee1-3993-42a7-8e21-2fb3f0d88807" data-file-name="components/TCAnalyzerInterface.tsx">
            <AnalysisAnimation />
            <p className="mt-6 text-slate-600 text-lg" data-unique-id="ab62f222-1c63-445d-bd65-855bee73975d" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="b72f8657-aa74-44dc-be11-7c0cef1c8770" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your terms & conditions...</span></p>
          </div>}
        
        {!isAnalyzing && <>
            {activeTab === 'input' && <div data-unique-id="12896b91-9730-46b6-bb04-5d99b0db2f49" data-file-name="components/TCAnalyzerInterface.tsx">
                <InputSelector />
                <div className="mt-8 flex justify-end" data-unique-id="71b5b2e7-62a7-4d8a-884b-9ca997e16625" data-file-name="components/TCAnalyzerInterface.tsx">
                  <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
              scale: 1.03
            } : {}} whileTap={content ? {
              scale: 0.97
            } : {}} className={`px-8 py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="362c8271-cb22-4751-be76-a52514a1a528" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="b34e3b0b-401e-4e02-ab29-b05223bba0e7" data-file-name="components/TCAnalyzerInterface.tsx">
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
  return <button onClick={onClick} disabled={disabled} className={`px-8 py-4 font-medium transition-all relative ${isActive ? 'text-purple-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-purple-600'}`} data-unique-id="f8cc10e4-d2bd-410e-bbde-27c373501ace" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500" initial={false} data-unique-id="2ef28181-ffbd-4db1-8668-f4e328ccde8b" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}