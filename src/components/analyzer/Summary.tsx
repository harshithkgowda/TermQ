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
      a.download = 'termq-summary.txt';
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
  return <div data-unique-id="6c65a15e-7b81-40fc-abbf-eb2eec6cad42" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3" data-unique-id="d4506921-a141-4ae4-8b75-1511e299430e" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800" data-unique-id="07b91bce-1857-41f7-a2d9-32ed9eb5233d" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="fab5d254-6642-4197-b6c8-282b7a1370cc" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex flex-wrap gap-2" data-unique-id="92132e25-9531-459e-8f65-fd6e66035a3f" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} disabled={!points.length} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-unique-id="76a04559-0881-4a0c-be8c-24d86af447d4" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummary} disabled={downloading || !points.length} className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-unique-id="b7dc4223-94a9-4b1c-a711-4245874663ee" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {downloading ? <>
                <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }} className="h-4 w-4" data-unique-id="b85ce712-230b-4480-8f98-e906f11b237c" data-file-name="components/analyzer/Summary.tsx">
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
      
      <div ref={summaryRef} className="bg-gradient-to-r from-indigo-50 to-teal-50 p-4 md:p-8 rounded-xl border border-indigo-100 shadow-md" data-unique-id="80c7f700-1fa2-4fa8-a178-77d2a5555dd3" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
        {points.length > 0 ? <motion.ul className="space-y-4 md:space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="a2fe36bc-ccb1-4b36-b849-dada1930883a" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-3 md:p-4 rounded-lg border border-blue-100 shadow-sm" data-unique-id="e8a9e40d-34ef-4685-bac1-cf3dc3abb256" data-file-name="components/analyzer/Summary.tsx">
                <span className="text-blue-700 font-bold mr-3 flex-shrink-0" data-unique-id="cc4be76d-3c4b-4747-ae86-e0d5384ffcca" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="75d9639b-f7a8-481d-a310-cf2ab60f2ee8" data-file-name="components/analyzer/Summary.tsx">•</span></span>
                <span className="text-slate-800" data-unique-id="1e8e749d-672d-419b-92d7-390877fe8db7" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
              </motion.li>)}
          </motion.ul> : <div className="text-center py-6" data-unique-id="4ec5915c-1216-46e6-bf33-bc51e3e8c350" data-file-name="components/analyzer/Summary.tsx">
            <p className="text-slate-600" data-unique-id="69957ebf-f6e3-48a8-b9d0-263b192f4bc3" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="c6ea7fd9-a74e-462a-9a74-ac6e12cc7f67" data-file-name="components/analyzer/Summary.tsx">No summary points available.</span></p>
          </div>}
      </div>
    </div>;
}