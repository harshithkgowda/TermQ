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
  return <div data-unique-id="8e4da64f-d798-4282-ad8c-3e9f55421395" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex justify-between items-center mb-6" data-unique-id="e9633545-26e7-4054-97d4-869538ec0c50" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-2xl font-semibold text-slate-800" data-unique-id="4a6634ac-f57a-425c-8598-cd0362678120" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="1e2f3d44-5bad-415f-ace2-7a204c0c795d" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex space-x-2" data-unique-id="e1f1929f-714c-4e97-af4e-8bb7220da0d5" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors" data-unique-id="1959b224-13a5-40ce-bda9-2f75135c4679" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummary} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 text-sm transition-colors" data-unique-id="021ab688-9886-4137-b4c2-ce7afd1ce483" data-file-name="components/analyzer/Summary.tsx">
            <Download className="h-4 w-4" /><span className="editable-text" data-unique-id="01d6e7d0-9a30-423f-a913-67a3d54dd853" data-file-name="components/analyzer/Summary.tsx">
            Download
          </span></button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-100 shadow-md" data-unique-id="065a7b15-3d67-4a45-89b7-1fcb3a242514" data-file-name="components/analyzer/Summary.tsx">
        <motion.ul className="space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="d4e01db1-3965-4f91-a4ca-b6c4e215f67b" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
          {summary.points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-4 rounded-lg border border-purple-100 shadow-sm" data-unique-id="9711e9a2-9e6e-4f1b-b049-aace910e3d8f" data-file-name="components/analyzer/Summary.tsx">
              <span className="text-purple-700 font-bold mr-3 flex-shrink-0" data-unique-id="f382431c-e8bd-465f-b961-8b29604263f9" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="8569d92e-11fc-4266-8c1c-6ea3d7d5abe0" data-file-name="components/analyzer/Summary.tsx">•</span></span>
              <span className="text-slate-800" data-unique-id="d90b8847-a8b5-4f2f-9f20-63f4989387e9" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
            </motion.li>)}
        </motion.ul>
      </div>
    </div>;
}