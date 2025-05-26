'use client';

import { motion } from 'framer-motion';
import { Download, Clipboard } from 'lucide-react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import { useState, useRef } from 'react';
export default function Summary() {
  const {
    summary
  } = useAnalyzerStore();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Ensure summary points exist to prevent errors
  const points = Array.isArray(summary?.points) ? summary.points : [];
  const copyToClipboard = () => {
    if (!points.length) return;
    const text = points.map(point => `• ${point}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const downloadSummary = () => {
    if (!points.length) return;
    setDownloading(true);
    try {
      const text = points.map(point => `• ${point}`).join('\n\n');
      const blob = new Blob([text], {
        type: 'text/plain'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'docbox-summary.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading summary:', error);
    } finally {
      setDownloading(false);
    }
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
  return <div data-unique-id="3f46b717-6dcf-4db7-9167-f0773044bbb4" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3" data-unique-id="bf3ed73b-116a-4ae6-bc89-c82805821f14" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800" data-unique-id="626f8a42-b683-41fd-8c19-adbff2606251" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="9cd605a1-c2cb-4f3d-8a99-3f05e869762c" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex flex-wrap gap-2" data-unique-id="157a1adc-a0a3-45ae-9f23-8297b52a4c15" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} disabled={!points.length} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-unique-id="9f30ab24-abf2-4c70-9603-d1b946e7905f" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummary} disabled={downloading || !points.length} className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-unique-id="e9c2db23-c609-4400-b7d2-1996b54a252c" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {downloading ? <>
                <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }} className="h-4 w-4" data-unique-id="793398f2-0cbe-46b2-8519-c3ebe362de54" data-file-name="components/analyzer/Summary.tsx">
                  <Download className="h-4 w-4" />
                </motion.div>
                Processing...
              </> : <>
                <Download className="h-4 w-4" />
                Download Text
              </>}
          </button>
        </div>
      </div>
      
      <div ref={summaryRef} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-8 rounded-xl border border-blue-100 shadow-md" data-unique-id="88b2d7b9-2f8c-42b2-9cac-f0a5e0fa5f37" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
        {points.length > 0 ? <motion.ul className="space-y-4 md:space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="9f9178d8-8b91-4cf3-a69d-68b845d89324" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-3 md:p-4 rounded-lg border border-blue-100 shadow-sm" data-unique-id="0f8b078f-51d1-4b1d-bd27-36f24d5a0def" data-file-name="components/analyzer/Summary.tsx">
                <span className="text-blue-700 font-bold mr-3 flex-shrink-0" data-unique-id="bfbb5661-b021-4a96-b5c1-715a6db436ae" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="3d6e4bf4-8c34-4b9a-b09a-5e486c033c3e" data-file-name="components/analyzer/Summary.tsx">•</span></span>
                <span className="text-slate-800" data-unique-id="1d384d32-49bb-4047-9701-e38f839d0727" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
              </motion.li>)}
          </motion.ul> : <div className="text-center py-6" data-unique-id="64fec974-0859-4ac7-a4c5-ccda3c9c6db2" data-file-name="components/analyzer/Summary.tsx">
            <p className="text-slate-600" data-unique-id="9811b751-2cbc-41a8-8965-c0b18392682d" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="69e97de1-a553-4696-a783-da1d529079fa" data-file-name="components/analyzer/Summary.tsx">No summary points available.</span></p>
          </div>}
      </div>
    </div>;
}