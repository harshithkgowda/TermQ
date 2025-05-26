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
  return <div data-unique-id="20e6a675-e4fd-4106-8830-c79a71a9e889" data-file-name="components/analyzer/AnalysisResults.tsx">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6" data-unique-id="9a46bda3-12a5-42bf-a5d5-a489cf3b6057" data-file-name="components/analyzer/AnalysisResults.tsx"><span className="editable-text" data-unique-id="64566c0b-d7fd-4d77-a7a8-f381250b6077" data-file-name="components/analyzer/AnalysisResults.tsx">Analysis Results</span></h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8" data-unique-id="0ec60b4b-3965-4c18-80fb-f4bda2df1102" data-file-name="components/analyzer/AnalysisResults.tsx">
        <StatCard count={counts.harmful || 0} label="Harmful Points" color="bg-gradient-to-br from-red-100 to-rose-100 text-red-700 border-red-200" icon={<AlertCircle className="h-6 w-6" />} />
        <StatCard count={counts.good || 0} label="Good Points" color="bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 border-emerald-200" icon={<CheckCircle className="h-6 w-6" />} />
        <StatCard count={counts.awareness || 0} label="Awareness Points" color="bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-amber-200" icon={<Info className="h-6 w-6" />} />
      </div>
      
      <div className="space-y-3" data-unique-id="2855dbd0-52df-41be-acd7-79bc5e6bdf1b" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
  }} className={`${color} rounded-lg p-4 flex items-center`} data-unique-id="015e437d-6539-431a-89ec-8d6e57d8f40d" data-file-name="components/analyzer/AnalysisResults.tsx">
      <div className="mr-4" data-unique-id="5d0eadbe-d8c0-4676-a9ad-f3f58e00ce92" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {icon}
      </div>
      <div data-unique-id="f0784bea-00bc-413d-96be-c5bbd6d9eeee" data-file-name="components/analyzer/AnalysisResults.tsx">
        <span className="text-2xl font-bold" data-unique-id="a778f806-476b-4307-b976-0296e5bd138a" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{count}</span>
        <p className="text-sm" data-unique-id="0feadb06-cf8a-4c79-9ea4-49d605994745" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{label}</p>
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
      shadow: 'shadow-red-100',
      gradient: 'from-red-50 to-rose-50',
      icon: <AlertCircle className="h-5 w-5 text-red-600" />
    },
    good: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      shadow: 'shadow-emerald-100',
      gradient: 'from-emerald-50 to-green-50',
      icon: <CheckCircle className="h-5 w-5 text-emerald-600" />
    },
    awareness: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      shadow: 'shadow-amber-100',
      gradient: 'from-amber-50 to-yellow-50',
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
  }} transition={{
    duration: 0.4
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow} mb-4`} data-unique-id="5a0944e8-50ec-4116-a267-ef97fc5aeefc" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      <div className="p-5 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="2e6efd96-0437-4045-a8dc-28be9f9be052" data-file-name="components/analyzer/AnalysisResults.tsx">
        <div className="flex items-center space-x-3" data-unique-id="1e4c036b-58a7-433f-b639-65dd6ce60420" data-file-name="components/analyzer/AnalysisResults.tsx">
          <div className="p-2 bg-white rounded-lg shadow-inner" data-unique-id="153b5042-4b31-4d30-9889-c262fea93a52" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {style.icon}
          </div>
          <div className={`${style.text} font-medium`} data-unique-id="1be61b9f-cbeb-4ad9-93aa-c7c493da4008" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {point.text}
          </div>
        </div>
        <motion.button className={`${style.text} p-2 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="c90e27c7-b778-412c-87c4-1bcf0b722629" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </motion.button>
      </div>
      
      {isExpanded && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }} transition={{
      duration: 0.3
    }} className="border-t border-dashed px-5 py-4 bg-white/50" style={{
      borderColor: style.border
    }} data-unique-id="f59eab2b-4d10-4ebc-ba46-4bab7269bb8f" data-file-name="components/analyzer/AnalysisResults.tsx">
          <p className={`${style.text} leading-relaxed`} data-unique-id="57985877-379a-4a48-b2b6-6d8f7409464a" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {point.explanation}
          </p>
        </motion.div>}
    </motion.div>;
}