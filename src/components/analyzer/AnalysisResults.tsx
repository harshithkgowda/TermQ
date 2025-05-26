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
  return <div data-unique-id="707e2839-9028-41b9-b1e6-fa6e891908a0" data-file-name="components/analyzer/AnalysisResults.tsx">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6" data-unique-id="930253d4-8ea6-46fe-800e-698977492144" data-file-name="components/analyzer/AnalysisResults.tsx"><span className="editable-text" data-unique-id="c5200c16-6d93-4f80-ac88-c63cb991e764" data-file-name="components/analyzer/AnalysisResults.tsx">Analysis Results</span></h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8" data-unique-id="421f7a58-e84d-4d76-9866-5ca873ca1909" data-file-name="components/analyzer/AnalysisResults.tsx">
        <StatCard count={counts.harmful || 0} label="Harmful Points" color="bg-gradient-to-br from-red-100 to-rose-100 text-red-700 border-red-200" icon={<AlertCircle className="h-6 w-6" />} />
        <StatCard count={counts.good || 0} label="Good Points" color="bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 border-emerald-200" icon={<CheckCircle className="h-6 w-6" />} />
        <StatCard count={counts.awareness || 0} label="Awareness Points" color="bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-amber-200" icon={<Info className="h-6 w-6" />} />
      </div>
      
      <div className="space-y-3" data-unique-id="5b478c12-7ad2-4ced-a311-506532587f55" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
  }} className={`${color} rounded-lg p-4 flex items-center`} data-unique-id="78d94511-c343-4afc-8faf-711e717e8e4b" data-file-name="components/analyzer/AnalysisResults.tsx">
      <div className="mr-4" data-unique-id="86633f6a-d3cf-4090-a8f9-6b24b0074139" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {icon}
      </div>
      <div data-unique-id="f27a0ca0-b4c5-4280-89d3-9e2cce4969a6" data-file-name="components/analyzer/AnalysisResults.tsx">
        <span className="text-2xl font-bold" data-unique-id="ed0253e1-df0d-471c-869a-a68a5e5b4581" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{count}</span>
        <p className="text-sm" data-unique-id="36cf9107-551d-460c-a0dc-c2f8105b7fa6" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{label}</p>
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow} mb-4`} data-unique-id="1e23357a-e7cf-4914-9ea5-c925f032e125" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      <div className="p-5 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="1a9f61bb-7d53-4cad-af47-dd35ebfd54b1" data-file-name="components/analyzer/AnalysisResults.tsx">
        <div className="flex items-center space-x-3" data-unique-id="e8b3c118-d4d0-4f78-953a-a046b204fddf" data-file-name="components/analyzer/AnalysisResults.tsx">
          <div className="p-2 bg-white rounded-lg shadow-inner" data-unique-id="3d7d699d-ee98-4114-8ca1-365752b52caa" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {style.icon}
          </div>
          <div className={`${style.text} font-medium`} data-unique-id="c0befe2d-2ba2-465a-8f82-7c5a1e26e0c5" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {point.text}
          </div>
        </div>
        <motion.button className={`${style.text} p-2 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="43338997-ce56-48fb-8f15-bfccb00c2b7f" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
    }} data-unique-id="d8366869-5131-4c8c-8acc-34f741d0095b" data-file-name="components/analyzer/AnalysisResults.tsx">
          <p className={`${style.text} leading-relaxed`} data-unique-id="c4673db9-6518-4358-8498-3e43a8b85494" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {point.explanation}
          </p>
        </motion.div>}
    </motion.div>;
}