'use client';

import { motion } from 'framer-motion';
import { Download, Clipboard } from 'lucide-react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import { useState } from 'react';
export default function Summary() {
  const {
    summary
  } = useAnalyzerStore();
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    const text = summary.points.map(point => `• ${point}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const downloadSummary = () => {
    const text = summary.points.map(point => `• ${point}`).join('\n\n');
    const blob = new Blob([text], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tc-summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return <div data-unique-id="cecd43ca-0999-4462-be3a-09a40d3d5487" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex justify-between items-center mb-6" data-unique-id="cc963008-0b1f-41c0-898f-88ed2135343d" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-2xl font-semibold text-slate-800" data-unique-id="14b07a6b-f87a-41ef-b31f-34906d762231" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="bd24c18f-3082-4112-881a-9943e95e6e2b" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex space-x-2" data-unique-id="56228545-0a19-4ce1-801b-0afc57a6c2b9" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors" data-unique-id="2a484d14-2ce8-45b7-9bb5-2416d821d98a" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummary} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 text-sm transition-colors" data-unique-id="04566860-5936-49ca-a18c-59ff5b350e32" data-file-name="components/analyzer/Summary.tsx">
            <Download className="h-4 w-4" /><span className="editable-text" data-unique-id="4906eb13-56a7-40c1-8cc2-52ba23ddc552" data-file-name="components/analyzer/Summary.tsx">
            Download
          </span></button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-100 shadow-md" data-unique-id="eb76aeee-e49f-494e-949d-25962c00e335" data-file-name="components/analyzer/Summary.tsx">
        <motion.ul className="space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="fae7b40a-32b7-49b6-8bbd-f3bc953b162f" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
          {summary.points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-4 rounded-lg border border-purple-100 shadow-sm" data-unique-id="0133bae2-4ffa-4ef7-b48a-42fecca5fd5d" data-file-name="components/analyzer/Summary.tsx">
              <span className="text-purple-700 font-bold mr-3 flex-shrink-0" data-unique-id="2b788c94-fa0f-40c3-a04e-da1d1747caac" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="0a88ffb8-78ba-4b98-9d9c-498f5f3ce150" data-file-name="components/analyzer/Summary.tsx">•</span></span>
              <span className="text-slate-800" data-unique-id="0b4960c3-0f4c-42c6-9425-47701fed9e00" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
            </motion.li>)}
        </motion.ul>
      </div>
    </div>;
}