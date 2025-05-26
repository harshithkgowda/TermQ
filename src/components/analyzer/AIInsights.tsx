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
    return <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center" data-unique-id="bd23603a-bcf1-4353-8461-9254e6a472bc" data-file-name="components/analyzer/AIInsights.tsx">
        <Sparkles className="h-10 w-10 text-blue-500 mx-auto mb-3" />
        <p className="text-blue-700" data-unique-id="eab84ea0-2374-4ff3-8a14-86aeebee0d25" data-file-name="components/analyzer/AIInsights.tsx"><span className="editable-text" data-unique-id="a4ffa530-308a-41b7-9934-60a0ed003ebb" data-file-name="components/analyzer/AIInsights.tsx">AI insights will appear here after analysis is complete.</span></p>
      </div>;
  }
  return <div className="space-y-6" data-unique-id="c907f354-e207-4737-90d2-9f2174666d79" data-file-name="components/analyzer/AIInsights.tsx">
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
  }} className={`${style.bg} border ${style.border} rounded-lg overflow-hidden shadow-sm`} data-unique-id="88ec842e-af03-4960-bec7-c21ba773a1f4" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
      <div className={`p-4 flex justify-between items-center cursor-pointer ${style.hover}`} onClick={onToggle} data-unique-id="3a6d8459-f466-417c-b7c5-7f3f8a754493" data-file-name="components/analyzer/AIInsights.tsx">
        <div className="flex items-center space-x-3" data-unique-id="0144ce42-38ea-4091-b151-96e30920ea3d" data-file-name="components/analyzer/AIInsights.tsx">
          <div className={`p-2 ${style.iconBg} rounded-lg`} data-unique-id="5695ca97-c681-4ccb-81e1-f62dc7b68bd3" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
            {icon}
          </div>
          <h3 className={`font-medium ${style.text}`} data-unique-id="147f8479-54f5-41c2-be19-81c291fe735a" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">{title}</h3>
        </div>
        <button className={`p-1 ${style.text} rounded-full ${style.hover}`} data-unique-id="3beaefc0-a99a-455b-ad29-a0decf4f6b55" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
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
    }} className="px-4 pb-4" data-unique-id="852c3dba-ecc7-46c7-824d-aa483fde7fc2" data-file-name="components/analyzer/AIInsights.tsx">
          <ul className="space-y-2 mt-2" data-unique-id="9ce9fd66-20ac-4be0-9ca3-75aa2b71b145" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
            {items.map((item, index) => <motion.li key={index} initial={{
          opacity: 0,
          x: -5
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.1
        }} className={`flex items-start ${style.text}`} data-unique-id="33992b0f-53e5-4b77-8ada-6a2acf16ab7c" data-file-name="components/analyzer/AIInsights.tsx">
                <span className="mr-2 mt-1" data-unique-id="ba81fe9f-48f8-4e75-8c7d-49d783cdfcd4" data-file-name="components/analyzer/AIInsights.tsx"><span className="editable-text" data-unique-id="dea47c19-5c23-4447-9774-fe5fc2cda7de" data-file-name="components/analyzer/AIInsights.tsx">•</span></span>
                <span data-unique-id="226e7696-f1ca-4c21-9da0-5246fd9d71a5" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">{item}</span>
              </motion.li>)}
          </ul>
        </motion.div>}
    </motion.div>;
}