'use client';

import React, { useState } from 'react';
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
  return <div data-unique-id="e29a9ad2-bf57-496f-9e73-bfb04856f80c" data-file-name="components/analyzer/AnalysisResults.tsx">
    <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-6" data-unique-id="aec0068d-e5c9-4879-a056-87aaf4423cc4" data-file-name="components/analyzer/AnalysisResults.tsx"><span className="editable-text" data-unique-id="ddbfd608-3558-4ba8-90af-bac7c51e76ec" data-file-name="components/analyzer/AnalysisResults.tsx">Analysis Results</span></h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8" data-unique-id="d46cb2e1-3f33-487d-bd65-4c0b23cbeaac" data-file-name="components/analyzer/AnalysisResults.tsx">
      <StatCard count={counts.harmful || 0} label="Harmful Points" color="bg-gradient-to-br from-red-100 to-rose-100 text-red-700 border-red-200" icon={<AlertCircle className="h-5 md:h-6 w-5 md:w-6" />} />
      <StatCard count={counts.good || 0} label="Good Points" color="bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 border-emerald-200" icon={<CheckCircle className="h-5 md:h-6 w-5 md:w-6" />} />
      <StatCard count={counts.awareness || 0} label="Awareness Points" color="bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-amber-200" icon={<Info className="h-5 md:h-6 w-5 md:w-6" />} />
    </div>

    <div className="space-y-3" data-unique-id="5ce836d6-adcb-491f-885c-13a34013d572" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      {analysisPoints.map(point => <AnalysisPointCard point={point} isExpanded={!!expandedItems[point.id]} onToggle={() => toggleItem(point.id)} />)}
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
  }} className={`${color} rounded-lg p-4 flex items-center`} data-unique-id="3aeda0bc-0674-4960-9eb5-0f5c7f03a8c8" data-file-name="components/analyzer/AnalysisResults.tsx">
    <div className="mr-4" data-unique-id="8b2bd389-566f-4dfb-a619-ec6d1e12413a" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      {icon}
    </div>
    <div data-unique-id="7e660212-96aa-493b-b8a4-08414df3b4eb" data-file-name="components/analyzer/AnalysisResults.tsx">
      <span className="text-2xl font-bold" data-unique-id="7f3c35de-16f7-4934-8aec-55604d6d3bdf" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{count}</span>
      <p className="text-sm" data-unique-id="837e6224-0dda-4a8c-aeaf-46e6daefdbe7" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{label}</p>
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow} mb-4`} data-unique-id="cf6aa8b3-7881-47dc-a134-ce572f52acdf" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
    <div className="p-5 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="cd34150c-6e9c-4270-91fb-0fa8d40fb92a" data-file-name="components/analyzer/AnalysisResults.tsx">
      <div className="flex items-center space-x-3" data-unique-id="5d077c13-f2b2-40ee-a720-e0170a1917c4" data-file-name="components/analyzer/AnalysisResults.tsx">
        <div className="p-2 bg-white rounded-lg shadow-inner" data-unique-id="e0918f0d-54b9-4fc6-af3a-4414a66193a7" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {style.icon}
        </div>
        <div className={`${style.text} font-medium`} data-unique-id="198d2411-c1df-4466-a2e5-929aa2874393" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {point.text}
        </div>
      </div>
      <motion.button className={`${style.text} p-2 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="770334d7-26fb-4628-a958-a682b6f6dbf1" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
    }} data-unique-id="075183a1-8781-494b-913d-98d41914b67e" data-file-name="components/analyzer/AnalysisResults.tsx">
      <p className={`${style.text} leading-relaxed`} data-unique-id="204a2c88-23fd-48d8-925d-ef02e0723dd6" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {point.explanation}
      </p>
    </motion.div>}
  </motion.div>;
}