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
  return <div data-unique-id="16a0dc53-d16d-4895-a5fc-f945250092ca" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex justify-between items-center mb-6" data-unique-id="8ad6dde4-6c3a-4c36-97c9-94ac6ae1d2dc" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-2xl font-semibold text-slate-800" data-unique-id="32be1656-4003-4af6-a120-2387e2dfdd87" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="a24d6904-10de-4be1-8ec4-72cc8fc934a9" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex space-x-2" data-unique-id="0b107ce4-ce8c-4efd-afc8-1d63e2f6ce99" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors" data-unique-id="f13d02bc-e076-4f5d-932b-59d15d569cc6" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummary} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 text-sm transition-colors" data-unique-id="8ba8eaa9-3c6b-4941-bc29-e3febab45372" data-file-name="components/analyzer/Summary.tsx">
            <Download className="h-4 w-4" /><span className="editable-text" data-unique-id="d6ef6141-cf8c-48aa-adf5-6271c30bbdd0" data-file-name="components/analyzer/Summary.tsx">
            Download
          </span></button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-100 shadow-md" data-unique-id="44e8885e-6473-41d8-bac2-9b01b2600da7" data-file-name="components/analyzer/Summary.tsx">
        <motion.ul className="space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="a7fc4a88-8361-49db-8370-833f3e18f316" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
          {summary.points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-4 rounded-lg border border-purple-100 shadow-sm" data-unique-id="fb19c39e-e8ca-478b-b70e-fdb15a58c79e" data-file-name="components/analyzer/Summary.tsx">
              <span className="text-purple-700 font-bold mr-3 flex-shrink-0" data-unique-id="2991d66f-10c6-4dde-b9b1-a0ea024acfa2" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="d7be9ae5-0b18-4f7a-991d-8362d8260396" data-file-name="components/analyzer/Summary.tsx">•</span></span>
              <span className="text-slate-800" data-unique-id="f534cf96-6f5c-440e-b42c-bccfa04e4fac" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
            </motion.li>)}
        </motion.ul>
      </div>
    </div>;
}