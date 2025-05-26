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
  return <div data-unique-id="da392bad-3011-4b40-9dbb-ec7c5d8a892b" data-file-name="components/analyzer/AnalysisResults.tsx">
    <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-6" data-unique-id="0bc999ad-6523-4a8f-ba0d-8c38f8cd29b7" data-file-name="components/analyzer/AnalysisResults.tsx"><span className="editable-text" data-unique-id="b2554f35-545c-4357-aa38-681eb862f072" data-file-name="components/analyzer/AnalysisResults.tsx">Analysis Results</span></h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8" data-unique-id="589a4c2c-1861-4a84-b65f-606dec6c775d" data-file-name="components/analyzer/AnalysisResults.tsx">
      <StatCard count={counts.harmful || 0} label="Harmful Points" color="bg-gradient-to-br from-red-100 to-rose-100 text-red-700 border-red-200" icon={<AlertCircle className="h-5 md:h-6 w-5 md:w-6" />} />
      <StatCard count={counts.good || 0} label="Good Points" color="bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 border-emerald-200" icon={<CheckCircle className="h-5 md:h-6 w-5 md:w-6" />} />
      <StatCard count={counts.awareness || 0} label="Awareness Points" color="bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-amber-200" icon={<Info className="h-5 md:h-6 w-5 md:w-6" />} />
    </div>

    <div className="space-y-3" data-unique-id="bde7cf31-a813-4b80-80db-f38e434952d7" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
  }} className={`${color} rounded-lg p-4 flex items-center`} data-unique-id="b777417a-5df4-4036-b31d-cb879d29608e" data-file-name="components/analyzer/AnalysisResults.tsx">
    <div className="mr-4" data-unique-id="ef934347-73bc-413d-adac-de25c2b7a2d3" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      {icon}
    </div>
    <div data-unique-id="b18852af-70b1-4f2c-a9fe-3062f749d792" data-file-name="components/analyzer/AnalysisResults.tsx">
      <span className="text-2xl font-bold" data-unique-id="21f7f6dc-e032-471e-96fd-e33ce5b21e8d" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{count}</span>
      <p className="text-sm" data-unique-id="e79ae881-416f-42d2-9951-b3d515f35932" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{label}</p>
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow} mb-4`} data-unique-id="7c8164bf-0422-496f-889f-de352ca6065f" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
    <div className="p-5 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="75ef9a25-0ca3-4f6e-82d7-28732a5f3583" data-file-name="components/analyzer/AnalysisResults.tsx">
      <div className="flex items-center space-x-3" data-unique-id="296a6d07-2b8a-406d-bb40-67313fbb9fcc" data-file-name="components/analyzer/AnalysisResults.tsx">
        <div className="p-2 bg-white rounded-lg shadow-inner" data-unique-id="5021e7de-a7b6-49f8-b88c-5b7ea3142c8e" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {style.icon}
        </div>
        <div className={`${style.text} font-medium`} data-unique-id="8703e585-821c-450c-8bbb-8d0ccc7eb368" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {point.text}
        </div>
      </div>
      <motion.button className={`${style.text} p-2 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="6494c8ff-45fc-4cdd-9072-283029d7a1f5" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
    }} data-unique-id="256e9c12-5cee-4b8d-b8b5-79d4873e3e30" data-file-name="components/analyzer/AnalysisResults.tsx">
      <p className={`${style.text} leading-relaxed`} data-unique-id="b5a656fc-6acd-4fbd-8db4-15f9d57d8f4a" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {point.explanation}
      </p>
    </motion.div>}
  </motion.div>;
}