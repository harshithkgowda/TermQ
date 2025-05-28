'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import { Lightbulb, AlertTriangle, CheckCircle2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
export default function AIInsights() {
  const {
    aiInsights
  } = useAnalyzerStore();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    suggestions: true,
    risks: true,
    takeaways: true
  });
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  if (!aiInsights) {
    return <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center" data-unique-id="3eab0886-76f3-44ae-867b-bb19bacfd1e5" data-file-name="components/analyzer/AIInsights.tsx">
        <Sparkles className="h-10 w-10 text-blue-500 mx-auto mb-3" />
        <p className="text-blue-700" data-unique-id="a6822701-fa70-469a-bb8d-a150f1072987" data-file-name="components/analyzer/AIInsights.tsx"><span className="editable-text" data-unique-id="8680efb2-c006-4a4e-b1e2-6825d436eebf" data-file-name="components/analyzer/AIInsights.tsx">AI insights will appear here after analysis is complete.</span></p>
      </div>;
  }
  return <div className="space-y-6" data-unique-id="b328df07-1a8c-4fe9-882a-c06147b35cc6" data-file-name="components/analyzer/AIInsights.tsx">
      <InsightSection title="AI Suggestions" icon={<Lightbulb className="h-5 w-5 text-amber-500" />} items={aiInsights.suggestions} isExpanded={expandedSections.suggestions} onToggle={() => toggleSection('suggestions')} color="amber" />
      
      <InsightSection title="Potential Risks" icon={<AlertTriangle className="h-5 w-5 text-red-500" />} items={aiInsights.risks} isExpanded={expandedSections.risks} onToggle={() => toggleSection('risks')} color="red" />
      
      <InsightSection title="Key Takeaways" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} items={aiInsights.takeaways} isExpanded={expandedSections.takeaways} onToggle={() => toggleSection('takeaways')} color="emerald" />
    </div>;
}
interface InsightSectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  isExpanded: boolean;
  onToggle: () => void;
  color: 'amber' | 'red' | 'emerald';
}
function InsightSection({
  title,
  icon,
  items,
  isExpanded,
  onToggle,
  color
}: InsightSectionProps) {
  const colorStyles = {
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      hover: 'hover:bg-amber-100',
      iconBg: 'bg-amber-100'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      hover: 'hover:bg-red-100',
      iconBg: 'bg-red-100'
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      hover: 'hover:bg-emerald-100',
      iconBg: 'bg-emerald-100'
    }
  };
  const style = colorStyles[color];
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} className={`${style.bg} border ${style.border} rounded-lg overflow-hidden shadow-sm`} data-unique-id="48fba020-e763-4abd-a527-9e84d4cfe436" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
      <div className={`p-4 flex justify-between items-center cursor-pointer ${style.hover}`} onClick={onToggle} data-unique-id="7b88c1f3-4d86-4620-a0d9-5f4c69fdb688" data-file-name="components/analyzer/AIInsights.tsx">
        <div className="flex items-center space-x-3" data-unique-id="5747df34-a343-45b3-ab9b-dfe2888338c6" data-file-name="components/analyzer/AIInsights.tsx">
          <div className={`p-2 ${style.iconBg} rounded-lg`} data-unique-id="e6ead4e9-8560-42d1-afe0-8bb161523ce9" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
            {icon}
          </div>
          <h3 className={`font-medium ${style.text}`} data-unique-id="d64fe113-516b-4997-95a0-b4342ab9c50c" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">{title}</h3>
        </div>
        <button className={`p-1 ${style.text} rounded-full ${style.hover}`} data-unique-id="920b476f-013c-41f5-9926-f57b44b25d31" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
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
    }} className="px-4 pb-4" data-unique-id="efcd2ae8-cad4-4c36-bbed-3e48ce809323" data-file-name="components/analyzer/AIInsights.tsx">
          <ul className="space-y-2 mt-2" data-unique-id="19c5e937-6269-4c5b-aece-0c142f0bb995" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
            {items.map((item, index) => <motion.li key={index} initial={{
          opacity: 0,
          x: -5
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.1
        }} className={`flex items-start ${style.text}`} data-unique-id="a526870d-1587-4741-90a0-d5cf0153b632" data-file-name="components/analyzer/AIInsights.tsx">
                <span className="mr-2 mt-1" data-unique-id="1cd7300b-75f3-4d3b-a18f-0925958c54ff" data-file-name="components/analyzer/AIInsights.tsx"><span className="editable-text" data-unique-id="cb1afef2-e7fa-43f0-a7ae-b7a8bf635ced" data-file-name="components/analyzer/AIInsights.tsx">•</span></span>
                <span data-unique-id="d9747faa-5981-4467-98f9-117e7e42bb3e" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">{item}</span>
              </motion.li>)}
          </ul>
        </motion.div>}
    </motion.div>;
}