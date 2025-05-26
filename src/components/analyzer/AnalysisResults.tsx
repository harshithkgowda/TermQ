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
  return <div data-unique-id="5a826a01-cd7b-4159-856e-4d6875891cc2" data-file-name="components/analyzer/AnalysisResults.tsx">
    <h2 className="text-2xl font-semibold text-slate-800 mb-6" data-unique-id="de6e8787-e705-4db5-9024-9cc9abeec252" data-file-name="components/analyzer/AnalysisResults.tsx"><span className="editable-text" data-unique-id="96c7eaad-84af-4f00-b0bd-03f061efb3ae" data-file-name="components/analyzer/AnalysisResults.tsx">Analysis Results</span></h2>

    <div className="grid grid-cols-3 gap-6 mb-8" data-unique-id="a02fbcdd-9628-4837-b243-1eb76b2fb6e7" data-file-name="components/analyzer/AnalysisResults.tsx">
      <StatCard count={counts.harmful || 0} label="Harmful Points" color="bg-gradient-to-br from-red-100 to-rose-100 text-red-700 border-red-200" icon={<AlertCircle className="h-6 w-6" />} />
      <StatCard count={counts.good || 0} label="Good Points" color="bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 border-emerald-200" icon={<CheckCircle className="h-6 w-6" />} />
      <StatCard count={counts.awareness || 0} label="Awareness Points" color="bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-amber-200" icon={<Info className="h-6 w-6" />} />
    </div>

    <div className="space-y-3" data-unique-id="6d9c57fc-8ff7-4356-b81a-86270eac2fe7" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
  }} className={`${color} rounded-lg p-4 flex items-center`} data-unique-id="63c509f6-d9bc-434c-b399-97ecfa745108" data-file-name="components/analyzer/AnalysisResults.tsx">
    <div className="mr-4" data-unique-id="fe5239a5-89e0-49cb-a7da-9d85e62970ef" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      {icon}
    </div>
    <div data-unique-id="f7dbde70-5af5-4ef6-a376-ad01e74c6826" data-file-name="components/analyzer/AnalysisResults.tsx">
      <span className="text-2xl font-bold" data-unique-id="aef94698-b9c9-47d2-95bb-cc63742a6fe0" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{count}</span>
      <p className="text-sm" data-unique-id="a5e30f4d-a09d-4beb-a8d0-894a0fb19aac" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{label}</p>
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow} mb-4`} data-unique-id="d866c5dc-4d63-4eb9-8f22-eef5607e8f11" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
    <div className="p-5 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="cd94269e-b823-40b5-84ac-ae085ba0e18c" data-file-name="components/analyzer/AnalysisResults.tsx">
      <div className="flex items-center space-x-3" data-unique-id="903f341a-41bb-4593-bdcd-80f617ba4768" data-file-name="components/analyzer/AnalysisResults.tsx">
        <div className="p-2 bg-white rounded-lg shadow-inner" data-unique-id="02075437-f588-4021-abbb-c593073d03e0" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {style.icon}
        </div>
        <div className={`${style.text} font-medium`} data-unique-id="9c1944df-f0c9-4f69-8604-b1a3b4181eea" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
          {point.text}
        </div>
      </div>
      <motion.button className={`${style.text} p-2 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="a50abe6c-7940-4fc5-918e-60338fd0c820" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
    }} data-unique-id="95a24252-8e43-4bfe-976e-d8eda060be6b" data-file-name="components/analyzer/AnalysisResults.tsx">
      <p className={`${style.text} leading-relaxed`} data-unique-id="57f44e9a-cc28-48f7-9ae9-4bddd093243c" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {point.explanation}
      </p>
    </motion.div>}
  </motion.div>;
}