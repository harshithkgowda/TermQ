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
  return <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-indigo-100" data-unique-id="b9de408f-00fa-412c-8810-15ec5f9f300e" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Tab Selection */}
      <div className="flex border-b border-indigo-100" data-unique-id="161c9f48-119a-4790-8c3f-143fe528210b" data-file-name="components/TCAnalyzerInterface.tsx">
        <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input T&C" />
        <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
        <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || summary.points.length === 0} label="Summary" />
      </div>
      
      {/* Content Area */}
      <div className="p-6 min-h-[500px]" data-unique-id="e2d99174-94e5-496b-b803-b1ab6ef0c9d1" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
        {error && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="a4a91f78-16fa-4e18-b10a-e48579416c6a" data-file-name="components/TCAnalyzerInterface.tsx">
            <AlertCircle className="mr-3 h-5 w-5" />
            <span className="font-medium" data-unique-id="d7b2252d-0de8-474c-87d4-4703e330f165" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
          </motion.div>}
        
        {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="592f7797-bc58-4f8b-956a-45783eb9ccaa" data-file-name="components/TCAnalyzerInterface.tsx">
            <AnalysisAnimation />
            <p className="mt-6 text-slate-600 text-lg" data-unique-id="cbfed9ff-d541-46b9-8822-bc1459fbff0c" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="40f8cda6-c7b9-4c86-add4-ac8810840c6e" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your terms & conditions...</span></p>
          </div>}
        
        {!isAnalyzing && <>
            {activeTab === 'input' && <div data-unique-id="ab48a75b-b9f4-4e54-8744-c7ebc30c6f09" data-file-name="components/TCAnalyzerInterface.tsx">
                <InputSelector />
                <div className="mt-8 flex justify-end" data-unique-id="1c5538bf-03ab-4fdb-93e4-6767eb99bb91" data-file-name="components/TCAnalyzerInterface.tsx">
                  <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
              scale: 1.03
            } : {}} whileTap={content ? {
              scale: 0.97
            } : {}} className={`px-8 py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="2bddf741-d706-490e-a91b-b1d864973b75" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="f5f51912-2f42-4f82-8438-d9628758e7bf" data-file-name="components/TCAnalyzerInterface.tsx">
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
  return <button onClick={onClick} disabled={disabled} className={`px-8 py-4 font-medium transition-all relative ${isActive ? 'text-purple-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-purple-600'}`} data-unique-id="132ee9a1-c610-4f3b-bfa0-f7316fba2c99" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500" initial={false} data-unique-id="6c0ba813-ad0f-4551-846a-f740b882c937" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}