'use client';

import { useState } from 'react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import InputSelector from './analyzer/InputSelector';
import AnalysisResults from './analyzer/AnalysisResults';
import Summary from './analyzer/Summary';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';
import { analyzeContent } from '@/lib/analyzer';
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
  return <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-indigo-100" data-unique-id="14d78529-bccb-4004-8262-58349e189da2" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Tab Selection */}
      <div className="flex border-b border-indigo-100" data-unique-id="829003fb-7dec-4952-9b44-4be5f4d5428b" data-file-name="components/TCAnalyzerInterface.tsx">
        <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input T&C" />
        <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
        <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || summary.points.length === 0} label="Summary" />
      </div>
      
      {/* Content Area */}
      <div className="p-6" data-unique-id="79a2dcfa-4cbb-467d-abf0-b06c60276196" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
        {error && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center" data-unique-id="3845816a-5b2e-4895-ac10-7e58ee59d814" data-file-name="components/TCAnalyzerInterface.tsx">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span data-unique-id="cc97fcc1-1eba-4bb0-994e-5bf83a54fa05" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
          </motion.div>}
        
        {isAnalyzing && <div className="text-center py-10" data-unique-id="87e71055-3690-48d2-993f-01c04aa83725" data-file-name="components/TCAnalyzerInterface.tsx">
            <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }} className="inline-block" data-unique-id="9b9dddda-db1c-4a39-a09d-01b1df9a170b" data-file-name="components/TCAnalyzerInterface.tsx">
              <Loader2 className="h-10 w-10 text-indigo-600" />
            </motion.div>
            <p className="mt-4 text-slate-600" data-unique-id="8bef93f0-e2b4-4f52-8e41-fa7156887e70" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="67d2987c-a228-4704-b49e-a241d0e9447c" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your terms & conditions...</span></p>
          </div>}
        
        {!isAnalyzing && <>
            {activeTab === 'input' && <div data-unique-id="eee00590-f414-420f-88b6-b6b5551f3b56" data-file-name="components/TCAnalyzerInterface.tsx">
                <InputSelector />
                <div className="mt-6 flex justify-end" data-unique-id="3d78ce15-64e3-419b-b87f-3f7c8ae0a9df" data-file-name="components/TCAnalyzerInterface.tsx">
                  <button onClick={handleAnalyze} disabled={!content && !isAnalyzing} className={`px-6 py-2 rounded-md font-medium transition-all ${content ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="e24948f0-9062-4882-8783-1b695755ff16" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="21d6aec5-9a15-491b-be70-6e6e5f9cac38" data-file-name="components/TCAnalyzerInterface.tsx">
                    Analyze T&C
                  </span></button>
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
  return <button onClick={onClick} disabled={disabled} className={`px-6 py-4 font-medium transition-all relative ${isActive ? 'text-indigo-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-indigo-600'}`} data-unique-id="e2c469a2-78bc-4611-ac6f-29a4dbd0383d" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" initial={false} data-unique-id="9e5e788e-7b2e-45f3-9ef0-bedc7ae678a0" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}