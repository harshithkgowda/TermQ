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
  return <div data-unique-id="9ae32abc-2b27-4a38-8746-8679bc4a2efe" data-file-name="components/analyzer/AnalysisResults.tsx">
    <motion.h2 initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-teal-700 to-indigo-700 bg-clip-text text-transparent mb-6" data-unique-id="4a7c55d6-fc14-4623-a6c7-2b5562da3317" data-file-name="components/analyzer/AnalysisResults.tsx"><span className="editable-text" data-unique-id="1ee7ed8f-54b2-4a47-a457-3539ff5d61bd" data-file-name="components/analyzer/AnalysisResults.tsx">
      Analysis Results
    </span></motion.h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8" data-unique-id="a7635a6e-fd41-4264-a982-086cf373248a" data-file-name="components/analyzer/AnalysisResults.tsx">
      <StatCard count={counts.harmful || 0} label="Harmful Points" color="bg-gradient-to-br from-red-100 to-rose-100 text-red-700 border-red-200" icon={<AlertCircle className="h-5 md:h-6 w-5 md:w-6" />} />
      <StatCard count={counts.good || 0} label="Good Points" color="bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 border-emerald-200" icon={<CheckCircle className="h-5 md:h-6 w-5 md:w-6" />} />
      <StatCard count={counts.awareness || 0} label="Awareness Points" color="bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-amber-200" icon={<Info className="h-5 md:h-6 w-5 md:w-6" />} />
    </div>

    <div className="space-y-3" data-unique-id="85b319ae-320e-43dc-bbf7-de4ab67762b2" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
  }} className={`${color} rounded-lg p-4 flex items-center`} data-unique-id="ae62b4a8-57c2-48a6-a8c9-1e896e2b7e31" data-file-name="components/analyzer/AnalysisResults.tsx">
    <div className="mr-4" data-unique-id="7de7d7c8-3ded-4c10-b1b1-49e288ac60c7" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      {icon}
    </div>
    <div data-unique-id="a70beb0f-06b7-40a9-8413-1a7d78abf8c1" data-file-name="components/analyzer/AnalysisResults.tsx">
      <span className="text-2xl font-bold" data-unique-id="6708e117-58b0-4342-9dd1-1c9328c72812" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{count}</span>
      <p className="text-sm" data-unique-id="e27da160-9a67-4ea9-91f9-520a7b881ace" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{label}</p>
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
  }} whileHover={{
    scale: 1.01,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow} mb-4`} data-unique-id="4ab0ca79-9dd4-4793-bb75-fb1a0d5d76fc" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
    <div className="p-5 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="6e83ea84-ad5a-4f0e-89f9-293f8c510440" data-file-name="components/analyzer/AnalysisResults.tsx">
      <div className="flex items-center space-x-3" data-unique-id="c3584223-7ef2-4bc4-add7-fd491500e612" data-file-name="components/analyzer/AnalysisResults.tsx">
        <div className="p-2 bg-white rounded-lg shadow-inner" data-unique-id="d5a192ae-4269-4449-ba2f-1271e67732a6" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {style.icon}
        </div>
        <div className={`${style.text} font-medium`} data-unique-id="e920cf25-2366-4cab-a65b-cce1b0b56604" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {point.text}
        </div>
      </div>
      <motion.button className={`${style.text} p-2 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="3ccb1c5a-c267-4814-9dd9-885ab81c4286" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
    }} data-unique-id="33d17d63-a4eb-4f1f-983b-3dad1e85be1d" data-file-name="components/analyzer/AnalysisResults.tsx">
      <p className={`${style.text} leading-relaxed`} data-unique-id="9abb333c-f84e-45f9-87c8-434797bcd179" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {point.explanation}
      </p>
    </motion.div>}
  </motion.div>;
}