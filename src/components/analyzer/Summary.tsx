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
  return <div data-unique-id="d05109b7-4c2a-48c2-9acd-fcc18cf41bc4" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex justify-between items-center mb-6" data-unique-id="21082411-fcc2-453f-8d0f-aa6dffaa1dbe" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-2xl font-semibold text-slate-800" data-unique-id="7ba5c905-e263-4a21-82e9-958721201c92" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="13be9019-396c-4ecd-acc7-fbc3d7e93e77" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex space-x-2" data-unique-id="292b9bda-194d-460b-93ec-4a1b991ac9e7" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors" data-unique-id="65e8c22a-cc8d-449d-9ee7-733598e4189a" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummary} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 text-sm transition-colors" data-unique-id="36040b71-7272-4d5c-8e5a-be70039a2577" data-file-name="components/analyzer/Summary.tsx">
            <Download className="h-4 w-4" /><span className="editable-text" data-unique-id="e180cd02-71c1-425b-af4a-075e14a97e96" data-file-name="components/analyzer/Summary.tsx">
            Download
          </span></button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-100 shadow-md" data-unique-id="10be0006-42d1-4662-ad48-6dcf4e4c1cb5" data-file-name="components/analyzer/Summary.tsx">
        <motion.ul className="space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="b52f50f4-76dd-4905-b515-3cacd511ce6c" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
          {summary.points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-4 rounded-lg border border-purple-100 shadow-sm" data-unique-id="c688c610-4bc3-4995-a129-95886be4d6d9" data-file-name="components/analyzer/Summary.tsx">
              <span className="text-purple-700 font-bold mr-3 flex-shrink-0" data-unique-id="fc77b5fc-9f4f-484a-b64e-64651c73235a" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="cf1dbd02-dd3a-4d15-8437-b9bf99c07b2f" data-file-name="components/analyzer/Summary.tsx">•</span></span>
              <span className="text-slate-800" data-unique-id="a2209583-2528-45ea-bc36-efa83408361c" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
            </motion.li>)}
        </motion.ul>
      </div>
    </div>;
}