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
  return <div data-unique-id="962350f7-4cbf-4184-8db7-d7b0dd8817f1" data-file-name="components/analyzer/AnalysisResults.tsx">
    <h2 className="text-2xl font-semibold text-slate-800 mb-6" data-unique-id="f4431c8d-622f-4dae-affa-13afbd69ec24" data-file-name="components/analyzer/AnalysisResults.tsx"><span className="editable-text" data-unique-id="4e17743d-97cc-46ae-b1f2-882af3c8094c" data-file-name="components/analyzer/AnalysisResults.tsx">Analysis Results</span></h2>

    <div className="grid grid-cols-3 gap-6 mb-8" data-unique-id="07f820d1-035c-46bc-b7d0-c6b12106cc47" data-file-name="components/analyzer/AnalysisResults.tsx">
      <StatCard count={counts.harmful || 0} label="Harmful Points" color="bg-gradient-to-br from-red-100 to-rose-100 text-red-700 border-red-200" icon={<AlertCircle className="h-6 w-6" />} />
      <StatCard count={counts.good || 0} label="Good Points" color="bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 border-emerald-200" icon={<CheckCircle className="h-6 w-6" />} />
      <StatCard count={counts.awareness || 0} label="Awareness Points" color="bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-amber-200" icon={<Info className="h-6 w-6" />} />
    </div>

    <div className="space-y-3" data-unique-id="9685a09b-19a3-4016-a962-a8a48401600b" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
  }} className={`${color} rounded-lg p-4 flex items-center`} data-unique-id="412d354d-f350-4233-b5ba-a5e74a628959" data-file-name="components/analyzer/AnalysisResults.tsx">
    <div className="mr-4" data-unique-id="69f22363-9bc6-4c32-8d79-c1e5a0092828" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      {icon}
    </div>
    <div data-unique-id="22dc36b1-118c-47d2-8c2a-c6c411f3e192" data-file-name="components/analyzer/AnalysisResults.tsx">
      <span className="text-2xl font-bold" data-unique-id="c47890a3-f216-46c3-8d67-38bfd796f1d2" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{count}</span>
      <p className="text-sm" data-unique-id="709881af-c3a5-4ce7-809b-459d6b570c9f" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{label}</p>
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow} mb-4`} data-unique-id="30ff9095-4da5-4783-acee-22d2c326bd93" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
    <div className="p-5 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="c33b072c-d0c8-4dc3-95f7-79628d7dfb81" data-file-name="components/analyzer/AnalysisResults.tsx">
      <div className="flex items-center space-x-3" data-unique-id="55b5142c-ee67-48ac-a1b3-ba67b280978c" data-file-name="components/analyzer/AnalysisResults.tsx">
        <div className="p-2 bg-white rounded-lg shadow-inner" data-unique-id="672b5da3-87dc-47fd-ae6d-0964001b7f0e" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {style.icon}
        </div>
        <div className={`${style.text} font-medium`} data-unique-id="c651a380-ea91-4b19-93e8-9b43f239d72a" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {point.text}
        </div>
      </div>
      <motion.button className={`${style.text} p-2 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="64d9fa4f-424c-477e-9a09-2f7456029be0" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
    }} data-unique-id="b2dca2e0-99a8-4186-83bf-2368b949c254" data-file-name="components/analyzer/AnalysisResults.tsx">
      <p className={`${style.text} leading-relaxed`} data-unique-id="c8218b4b-9469-4112-a596-c819ec6425c1" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {point.explanation}
      </p>
    </motion.div>}
  </motion.div>;
}