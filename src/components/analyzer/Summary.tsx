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
  return <div data-unique-id="dfabdb4a-6f44-496d-83b6-9dd4ef1b317a" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex justify-between items-center mb-6" data-unique-id="87fdf624-0d3a-401a-b590-0dc5739c4a9b" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-2xl font-semibold text-slate-800" data-unique-id="8a5d8e1c-03f1-4c14-a342-f0f22a69797d" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="8546eddd-6735-4043-861e-17b0cc7049b6" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex space-x-2" data-unique-id="543b1f27-6938-4145-9eac-e3ceb2fc597a" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors" data-unique-id="55cb156f-c5c4-4525-aa2c-77a30788107d" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummary} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 text-sm transition-colors" data-unique-id="9393a7c9-644e-430c-afe4-fa7e2a145d78" data-file-name="components/analyzer/Summary.tsx">
            <Download className="h-4 w-4" /><span className="editable-text" data-unique-id="6d896104-2211-450e-930d-7a34a628cd10" data-file-name="components/analyzer/Summary.tsx">
            Download
          </span></button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100" data-unique-id="5f6baedf-c3fd-4f15-b28d-555629063002" data-file-name="components/analyzer/Summary.tsx">
        <motion.ul className="space-y-4" variants={container} initial="hidden" animate="show" data-unique-id="d81df0a4-877e-4a96-91bc-cbafb9cc0273" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
          {summary.points.map((point, index) => <motion.li key={index} variants={item} className="flex" data-unique-id="6a004bec-f392-4f82-9f2b-350564503b20" data-file-name="components/analyzer/Summary.tsx">
              <span className="text-indigo-700 font-bold mr-2" data-unique-id="92c5c396-afd3-4dcd-8ec1-1d17b0a5546b" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="2e72a762-665d-46cf-ab3b-1867595b8337" data-file-name="components/analyzer/Summary.tsx">•</span></span>
              <span className="text-slate-800" data-unique-id="b204b135-ae99-44c2-bd34-c55acb741d6b" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
            </motion.li>)}
        </motion.ul>
      </div>
    </div>;
}