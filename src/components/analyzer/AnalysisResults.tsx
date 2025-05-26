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
  return <div data-unique-id="70452027-22c2-4580-af51-17543467a4e8" data-file-name="components/analyzer/AnalysisResults.tsx">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6" data-unique-id="40adc6c0-af2f-47e8-b5a3-9beb8adf98d9" data-file-name="components/analyzer/AnalysisResults.tsx"><span className="editable-text" data-unique-id="70af148f-0d5d-4e80-9ed7-1be9bd7766f8" data-file-name="components/analyzer/AnalysisResults.tsx">Analysis Results</span></h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8" data-unique-id="54b224b7-04ba-488a-bcae-0306d1a756e6" data-file-name="components/analyzer/AnalysisResults.tsx">
        <StatCard count={counts.harmful || 0} label="Harmful Points" color="bg-gradient-to-br from-red-100 to-rose-100 text-red-700 border-red-200" icon={<AlertCircle className="h-6 w-6" />} />
        <StatCard count={counts.good || 0} label="Good Points" color="bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 border-emerald-200" icon={<CheckCircle className="h-6 w-6" />} />
        <StatCard count={counts.awareness || 0} label="Awareness Points" color="bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-amber-200" icon={<Info className="h-6 w-6" />} />
      </div>
      
      <div className="space-y-3" data-unique-id="c30e0072-5cf9-4587-8878-174bd067c43f" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
  }} className={`${color} rounded-lg p-4 flex items-center`} data-unique-id="38f7fa10-7f83-4f19-990f-092b2eedd39d" data-file-name="components/analyzer/AnalysisResults.tsx">
      <div className="mr-4" data-unique-id="31914b07-d8d0-48dc-b35a-c2ccf8cc5637" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
        {icon}
      </div>
      <div data-unique-id="552df012-f56e-40ed-b069-f88907079190" data-file-name="components/analyzer/AnalysisResults.tsx">
        <span className="text-2xl font-bold" data-unique-id="72fbdd57-af96-4d2b-a2dd-efc8933351b8" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{count}</span>
        <p className="text-sm" data-unique-id="97451417-0ce3-4e7b-870e-ba283f8120a3" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">{label}</p>
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow} mb-4`} data-unique-id="be66d41f-fcef-4ad7-8258-12a248996862" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
      <div className="p-5 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="2815226b-bce4-468a-a937-c5df3cbdeb5b" data-file-name="components/analyzer/AnalysisResults.tsx">
        <div className="flex items-center space-x-3" data-unique-id="24d6e2c5-2ea4-4bb6-ba95-83304aff1d36" data-file-name="components/analyzer/AnalysisResults.tsx">
          <div className="p-2 bg-white rounded-lg shadow-inner" data-unique-id="a66f8cdd-b0fc-4e46-8814-50835268156d" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {style.icon}
          </div>
          <div className={`${style.text} font-medium`} data-unique-id="e849b8c0-b2d8-4499-89ab-1f62bdbea64f" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {point.text}
          </div>
        </div>
        <motion.button className={`${style.text} p-2 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="bddb9c77-f527-468f-9eae-b2da080e9309" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
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
    }} data-unique-id="8036c412-f329-40be-97a8-e27de323d2d6" data-file-name="components/analyzer/AnalysisResults.tsx">
          <p className={`${style.text} leading-relaxed`} data-unique-id="6e9db7c1-cb43-40f2-89cb-3234bd8e35e9" data-file-name="components/analyzer/AnalysisResults.tsx" data-dynamic-text="true">
            {point.explanation}
          </p>
        </motion.div>}
    </motion.div>;
}