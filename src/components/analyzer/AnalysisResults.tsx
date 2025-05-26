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
  return <div data-unique-id="6197bd40-e129-4077-9272-c6bb82d6684b" data-file-name="components/analyzer/AnalysisResults.tsx">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6" data-unique-id="f6232b05-2e45-412c-82c6-3a293fcd4518" data-file-name="components/analyzer/AnalysisResults.tsx"><span className="editable-text" data-unique-id="a85aaf9d-74e7-471a-9b9e-c1df0c33a9f5" data-file-name="components/analyzer/AnalysisResults.tsx">Analysis Results</span></h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8" data-unique-id="f5dc2144-13b9-4984-8068-56826fac967c" data-file-name="components/analyzer/AnalysisResults.tsx">
        <StatCard count={counts.harmful || 0} label="Harmful Points" color="bg-gradient-to-br from-red-100 to-rose-100 text-red-700 border-red-200" icon={<AlertCircle className="h-6 w-6" />} />
        <StatCard count={counts.good || 0} label="Good Points" color="bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 border-emerald-200" icon={<CheckCircle className="h-6 w-6" />} />
        <StatCard count={counts.awareness || 0} label="Awareness Points" color="bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-amber-200" icon={<Info className="h-6 w-6" />} />
      </div>
      
      <div className="space-y-3" data-unique-id="518c71ff-57ca-4461-a88f-7a5834054016" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
  }} className={`${color} rounded-lg p-4 flex items-center`} data-unique-id="d4beb2c6-270b-42f6-90d0-bd29940f3d93" data-file-name="components/analyzer/AnalysisResults.tsx">
      <div className="mr-4" data-unique-id="aefce420-b5d4-43b1-8b74-6b26efcb1429" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {icon}
      </div>
      <div data-unique-id="52ff3614-58ec-439f-9ec3-af37a565f5ee" data-file-name="components/analyzer/AnalysisResults.tsx">
        <span className="text-2xl font-bold" data-unique-id="46c8ca47-11b0-4394-ad00-69f6628886f2" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{count}</span>
        <p className="text-sm" data-unique-id="040b18ff-8ac4-40a5-8faa-6a4f296f73a5" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{label}</p>
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow} mb-4`} data-unique-id="c74fe0c9-0dbc-484b-bcbe-bc5cdb3a59c7" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      <div className="p-5 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="cb2aaba7-5167-4cb0-8b90-8aded3940d86" data-file-name="components/analyzer/AnalysisResults.tsx">
        <div className="flex items-center space-x-3" data-unique-id="b2429357-87d6-433f-815c-f67f6517beb9" data-file-name="components/analyzer/AnalysisResults.tsx">
          <div className="p-2 bg-white rounded-lg shadow-inner" data-unique-id="9b0e6573-4e7d-4530-b90b-ee206d9e2754" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {style.icon}
          </div>
          <div className={`${style.text} font-medium`} data-unique-id="ba085359-337f-4680-bc17-9a16223f7e52" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {point.text}
          </div>
        </div>
        <motion.button className={`${style.text} p-2 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="592041e4-714e-4db7-bee0-c1a6384dc9c2" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
    }} data-unique-id="c1d4ef35-5b35-456e-9dd6-37c8c68687dc" data-file-name="components/analyzer/AnalysisResults.tsx">
          <p className={`${style.text} leading-relaxed`} data-unique-id="039b0c05-e8ea-4ad4-8b2f-12715799f553" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {point.explanation}
          </p>
        </motion.div>}
    </motion.div>;
}