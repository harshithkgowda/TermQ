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
  return <div data-unique-id="65197e39-3341-4c13-8ef1-e5268a998026" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3" data-unique-id="bd0de479-8c8f-4517-840a-fa052870dabb" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800" data-unique-id="f94fecc1-ada7-46aa-8c86-319e4fb05778" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="91d30035-4a35-4387-a5a0-0d79c7a17624" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex flex-wrap gap-2" data-unique-id="f16d2529-2cd2-47f9-8034-16ace2a78e9d" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} disabled={!points.length} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-unique-id="9ee39ecd-232b-4ce9-b6eb-c566af2d3733" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummary} disabled={downloading || !points.length} className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-unique-id="32ce154d-7819-490a-99ea-3237aeafd966" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {downloading ? <>
                <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }} className="h-4 w-4" data-unique-id="2e5baef3-4315-4a6b-a527-28718456951d" data-file-name="components/analyzer/Summary.tsx">
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
      
      <div ref={summaryRef} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-8 rounded-xl border border-blue-100 shadow-md" data-unique-id="3a7187b7-fbda-4400-92ab-66386216b59e" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
        {points.length > 0 ? <motion.ul className="space-y-4 md:space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="84756caf-2610-4d64-95a9-a254e5b2e271" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-3 md:p-4 rounded-lg border border-blue-100 shadow-sm" data-unique-id="966f3b86-8b94-492c-9b3b-4d8822d963d6" data-file-name="components/analyzer/Summary.tsx">
                <span className="text-blue-700 font-bold mr-3 flex-shrink-0" data-unique-id="c9934f92-bb06-4948-8399-d7471f92a2b7" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="8da85647-a074-4143-a2e8-9a8167b80218" data-file-name="components/analyzer/Summary.tsx">•</span></span>
                <span className="text-slate-800" data-unique-id="f21890be-4c6b-436d-8fe7-1644061b866c" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
              </motion.li>)}
          </motion.ul> : <div className="text-center py-6" data-unique-id="69cf3b0e-deb3-42e5-8491-515379907766" data-file-name="components/analyzer/Summary.tsx">
            <p className="text-slate-600" data-unique-id="63632974-9249-4e57-af0c-4657b32b913c" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="a34bb592-232a-4f54-9ff9-729fbcef9874" data-file-name="components/analyzer/Summary.tsx">No summary points available.</span></p>
          </div>}
      </div>
    </div>;
}