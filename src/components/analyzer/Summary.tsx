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
  return <div data-unique-id="c6ef93c2-fb35-4c8c-a12f-bf781ef53d22" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3" data-unique-id="1944dc54-cd93-4711-af98-c73ac53e2ac6" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800" data-unique-id="b2106d6c-9517-40b2-a843-0755f894e70e" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="8e7b739b-402f-4436-9c88-d7cd0ef38191" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex flex-wrap gap-2" data-unique-id="e5df1d8d-87da-4edb-86e6-d56bacbcff50" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} disabled={!points.length} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-unique-id="7350ab9c-5920-4e37-b38b-c5b4f51dfffa" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummary} disabled={downloading || !points.length} className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-unique-id="954ce800-eb4c-4a0f-b279-5c3ee513a189" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {downloading ? <>
                <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }} className="h-4 w-4" data-unique-id="3b8f9599-7919-4d71-ab0c-9796b2c64e27" data-file-name="components/analyzer/Summary.tsx">
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
      
      <div ref={summaryRef} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-8 rounded-xl border border-blue-100 shadow-md" data-unique-id="524b1c7f-7d79-4029-8f99-5cc11c3c40bb" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
        {points.length > 0 ? <motion.ul className="space-y-4 md:space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="abc6c98b-2932-44fc-86dc-f3260797d05c" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-3 md:p-4 rounded-lg border border-blue-100 shadow-sm" data-unique-id="520b142c-6da8-4030-ac04-87ed4bf73c6c" data-file-name="components/analyzer/Summary.tsx">
                <span className="text-blue-700 font-bold mr-3 flex-shrink-0" data-unique-id="137122d4-e247-4db5-ae93-e6fb0691835e" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="da7c9dc8-04c4-408a-aa99-f9f7078316d2" data-file-name="components/analyzer/Summary.tsx">•</span></span>
                <span className="text-slate-800" data-unique-id="9edd94ff-39ef-485e-adbf-2261fad9954f" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
              </motion.li>)}
          </motion.ul> : <div className="text-center py-6" data-unique-id="c1e156de-b2c6-4c25-ab56-1a3b8319f980" data-file-name="components/analyzer/Summary.tsx">
            <p className="text-slate-600" data-unique-id="d19f415b-0a8e-4557-a1e7-a7278e7f7958" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="a2b41767-f3a1-42e0-9bcf-e52aa5681d22" data-file-name="components/analyzer/Summary.tsx">No summary points available.</span></p>
          </div>}
      </div>
    </div>;
}