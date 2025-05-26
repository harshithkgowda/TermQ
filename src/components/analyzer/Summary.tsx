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
  return <div data-unique-id="f965a214-d752-4e65-81e2-c6f1100558ff" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex justify-between items-center mb-6" data-unique-id="171c0748-3540-4674-a457-459441e729db" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-2xl font-semibold text-slate-800" data-unique-id="cfbf13f1-bd55-4b6a-9b4e-eb00beb5da40" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="278acf41-aaa0-4a52-8b89-b6327ff81c8a" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex space-x-2" data-unique-id="28d405f0-cdf5-49ac-bcd7-247fda365554" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors" data-unique-id="b1df2b0d-fbf2-492e-baa3-b614184e006d" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummary} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 text-sm transition-colors" data-unique-id="f8e0bb02-a2fb-422e-acde-eda77bfb7942" data-file-name="components/analyzer/Summary.tsx">
            <Download className="h-4 w-4" /><span className="editable-text" data-unique-id="0e4f68f2-ae36-4c1a-af00-45198da86cfd" data-file-name="components/analyzer/Summary.tsx">
            Download
          </span></button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-100 shadow-md" data-unique-id="6a7f73a8-064c-4a1b-9cd8-4543db54b514" data-file-name="components/analyzer/Summary.tsx">
        <motion.ul className="space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="3a8a71d6-d8a3-419e-aa7c-d7e7f4cb000a" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
          {summary.points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-4 rounded-lg border border-purple-100 shadow-sm" data-unique-id="44eac56f-8774-47fb-8494-c3deda7d3152" data-file-name="components/analyzer/Summary.tsx">
              <span className="text-purple-700 font-bold mr-3 flex-shrink-0" data-unique-id="64fe4997-330e-4796-8c6e-16874515f132" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="034a8050-4549-449b-b55f-104f964127aa" data-file-name="components/analyzer/Summary.tsx">•</span></span>
              <span className="text-slate-800" data-unique-id="8d4413b1-9d96-4448-bfd0-b2c9824fe2f5" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
            </motion.li>)}
        </motion.ul>
      </div>
    </div>;
}