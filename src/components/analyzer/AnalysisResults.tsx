'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useAnalyzerStore, AnalysisPoint } from '@/store/useAnalyzerStore';
export default function AnalysisResults() {
  const {
    analysisPoints
  } = useAnalyzerStore();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Count the types for summary
  const counts = analysisPoints.reduce((acc, point) => {
    acc[point.type] = (acc[point.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return <div data-unique-id="93ea9db5-4fbc-4b83-a999-5e89169ad4c6" data-file-name="components/analyzer/AnalysisResults.tsx">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6" data-unique-id="3ff7cde0-87f0-4b18-ba8e-36b69f2c99e4" data-file-name="components/analyzer/AnalysisResults.tsx"><span className="editable-text" data-unique-id="0a5d26d5-ed1e-4d03-92f1-c3beceb2a7ca" data-file-name="components/analyzer/AnalysisResults.tsx">Analysis Results</span></h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6" data-unique-id="36c895d1-881f-4c1f-b0ed-c70ff76fe656" data-file-name="components/analyzer/AnalysisResults.tsx">
        <StatCard count={counts.harmful || 0} label="Harmful Points" color="bg-red-100 text-red-700" icon={<AlertCircle className="h-5 w-5" />} />
        <StatCard count={counts.good || 0} label="Good Points" color="bg-green-100 text-green-700" icon={<CheckCircle className="h-5 w-5" />} />
        <StatCard count={counts.awareness || 0} label="Awareness Points" color="bg-amber-100 text-amber-700" icon={<Info className="h-5 w-5" />} />
      </div>
      
      <div className="space-y-3" data-unique-id="66081b20-88c7-48b1-aabe-0a8473e7013f" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {analysisPoints.map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[point.id]} onToggle={() => toggleItem(point.id)} />)}
      </div>
    </div>;
}
function StatCard({
  count,
  label,
  color,
  icon
}: {
  count: number;
  label: string;
  color: string;
  icon: React.ReactNode;
}) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className={`${color} rounded-lg p-4 flex items-center`} data-unique-id="816c26eb-628a-4720-99b1-38430678e8e8" data-file-name="components/analyzer/AnalysisResults.tsx">
      <div className="mr-4" data-unique-id="9c3be6a0-eceb-4027-a832-01636dee6464" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {icon}
      </div>
      <div data-unique-id="a2eadecf-00ea-4694-8323-1ea6ecd9de45" data-file-name="components/analyzer/AnalysisResults.tsx">
        <span className="text-2xl font-bold" data-unique-id="d4579483-1f17-43e1-8cc0-e19b9eb9d4c5" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{count}</span>
        <p className="text-sm" data-unique-id="e88b3cec-e79b-4a35-bf3f-770617ed856c" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{label}</p>
      </div>
    </motion.div>;
}
function AnalysisPointCard({
  point,
  isExpanded,
  onToggle
}: {
  point: AnalysisPoint;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const typeStyles = {
    harmful: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: <AlertCircle className="h-5 w-5 text-red-600" />
    },
    good: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />
    },
    awareness: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      icon: <Info className="h-5 w-5 text-amber-600" />
    }
  };
  const style = typeStyles[point.type];
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} className={`${style.bg} border ${style.border} rounded-lg overflow-hidden`} data-unique-id="29140b5a-a9f3-4627-a88c-06ff918be0e1" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="7fb3608c-f271-42c5-bc45-6da3fffd8d14" data-file-name="components/analyzer/AnalysisResults.tsx">
        <div className="flex items-center" data-unique-id="3557be9e-c10a-4556-ad45-cf20398e6025" data-file-name="components/analyzer/AnalysisResults.tsx">
          <div className="mr-3" data-unique-id="63c10fa9-7abc-4314-8d1a-55f31143d1b5" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {style.icon}
          </div>
          <div className={`${style.text} font-medium`} data-unique-id="41e13897-fe9e-423c-8fb0-315bdc2e7e65" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {point.text}
          </div>
        </div>
        <button className={style.text} data-unique-id="b743437d-f9e3-47dc-aead-9e882ba084df" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>
      
      {isExpanded && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} className="border-t border-dashed px-4 py-3" style={{
      borderColor: style.border
    }} data-unique-id="9e45c4c5-cba5-4728-94e7-eac7d5ceef28" data-file-name="components/analyzer/AnalysisResults.tsx">
          <p className={`text-sm ${style.text}`} data-unique-id="e9123fde-6e33-413c-bd1e-60cd240180f3" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {point.explanation}
          </p>
        </motion.div>}
    </motion.div>;
}