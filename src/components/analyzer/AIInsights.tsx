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
    return <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center" data-unique-id="a5f7952f-f473-47aa-822f-29b0d784fd2c" data-file-name="components/analyzer/AIInsights.tsx">
        <Sparkles className="h-10 w-10 text-blue-500 mx-auto mb-3" />
        <p className="text-blue-700" data-unique-id="9b0c1641-a722-4f98-9142-e0d648809abc" data-file-name="components/analyzer/AIInsights.tsx"><span className="editable-text" data-unique-id="5c4fa416-752b-4321-954a-43b127fa366d" data-file-name="components/analyzer/AIInsights.tsx">AI insights will appear here after analysis is complete.</span></p>
      </div>;
  }
  return <div className="space-y-6" data-unique-id="4a047c48-31b3-49f0-a47d-06b9f692e1f1" data-file-name="components/analyzer/AIInsights.tsx">
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
  }} className={`${style.bg} border ${style.border} rounded-lg overflow-hidden shadow-sm`} data-unique-id="fedeebb0-30fd-4be0-b681-a1b74ea68d08" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
      <div className={`p-4 flex justify-between items-center cursor-pointer ${style.hover}`} onClick={onToggle} data-unique-id="7b2255be-9cd4-4c93-80d1-252624a91894" data-file-name="components/analyzer/AIInsights.tsx">
        <div className="flex items-center space-x-3" data-unique-id="7be2fd44-f4e6-4f6a-aad5-d5f8545f03ea" data-file-name="components/analyzer/AIInsights.tsx">
          <div className={`p-2 ${style.iconBg} rounded-lg`} data-unique-id="5813680c-0b42-4f2d-9398-25c7f6608b08" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
            {icon}
          </div>
          <h3 className={`font-medium ${style.text}`} data-unique-id="88b9c3aa-9bc4-4b41-9797-89508c2f108d" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">{title}</h3>
        </div>
        <button className={`p-1 ${style.text} rounded-full ${style.hover}`} data-unique-id="2982752a-7029-4c5b-bbc9-909ae4cfba2e" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
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
    }} className="px-4 pb-4" data-unique-id="5527ff2e-c64f-47d9-a5a4-93fe45ce9e5e" data-file-name="components/analyzer/AIInsights.tsx">
          <ul className="space-y-2 mt-2" data-unique-id="8508dbfd-0975-455f-9459-4cc8b54e33fb" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">
            {items.map((item, index) => <motion.li key={index} initial={{
          opacity: 0,
          x: -5
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.1
        }} className={`flex items-start ${style.text}`} data-unique-id="a1dd214a-39c9-4248-b18a-518a2d31a171" data-file-name="components/analyzer/AIInsights.tsx">
                <span className="mr-2 mt-1" data-unique-id="fd9b176a-ca00-402a-8767-5eaac026d702" data-file-name="components/analyzer/AIInsights.tsx"><span className="editable-text" data-unique-id="a68cfa6d-4ae3-4378-9096-0f39a16775c5" data-file-name="components/analyzer/AIInsights.tsx">•</span></span>
                <span data-unique-id="3aae6716-c5b1-4974-9d9d-c921899d45d3" data-file-name="components/analyzer/AIInsights.tsx" data-dynamic-text="true">{item}</span>
              </motion.li>)}
          </ul>
        </motion.div>}
    </motion.div>;
}