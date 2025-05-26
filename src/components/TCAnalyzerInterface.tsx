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
  return <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-indigo-100" data-unique-id="0616d465-e50d-4551-8a99-6c120b7f507a" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Tab Selection */}
      <div className="flex border-b border-indigo-100" data-unique-id="aae3d8b2-7617-4e2e-8feb-d11a1169e338" data-file-name="components/TCAnalyzerInterface.tsx">
        <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input T&C" />
        <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
        <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || summary.points.length === 0} label="Summary" />
      </div>
      
      {/* Content Area */}
      <div className="p-6 min-h-[500px]" data-unique-id="1104edea-c66b-4859-bc07-902d9810368e" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
        {error && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="f7b65cdb-673f-426d-994a-e37d486e224d" data-file-name="components/TCAnalyzerInterface.tsx">
            <AlertCircle className="mr-3 h-5 w-5" />
            <span className="font-medium" data-unique-id="921da17a-33dd-4b8d-9a75-0cf1b01a8398" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
          </motion.div>}
        
        {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="57e41e16-adbe-448a-8a0f-385235b28856" data-file-name="components/TCAnalyzerInterface.tsx">
            <AnalysisAnimation />
            <p className="mt-6 text-slate-600 text-lg" data-unique-id="990f7209-d93d-409d-b2bd-83b4c5ae24d7" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="267acf54-8a47-40c5-a78e-b01683f4031c" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your terms & conditions...</span></p>
          </div>}
        
        {!isAnalyzing && <>
            {activeTab === 'input' && <div data-unique-id="e5fe610d-ead6-4b8b-bdb7-260bc1264097" data-file-name="components/TCAnalyzerInterface.tsx">
                <InputSelector />
                <div className="mt-8 flex justify-end" data-unique-id="ab089b11-5f62-4450-9323-cb5a070d81ee" data-file-name="components/TCAnalyzerInterface.tsx">
                  <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
              scale: 1.03
            } : {}} whileTap={content ? {
              scale: 0.97
            } : {}} className={`px-8 py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="80608f91-fb88-436a-ae57-49ee18d1b2f9" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="16d563ed-2ef3-4c74-8518-aa0644e6de68" data-file-name="components/TCAnalyzerInterface.tsx">
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
  return <button onClick={onClick} disabled={disabled} className={`px-8 py-4 font-medium transition-all relative ${isActive ? 'text-purple-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-purple-600'}`} data-unique-id="f687c1d8-0fc6-4633-9bd2-1ff749312086" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500" initial={false} data-unique-id="964e37a5-8491-4089-96c6-33423b1e8380" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}