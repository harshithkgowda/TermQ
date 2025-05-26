'use client';

import { motion } from 'framer-motion';
import { Download, FilePdf, Clipboard } from 'lucide-react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  const downloadSummaryAsPdf = async () => {
    if (!summaryRef.current || !points.length) return;
    try {
      setDownloading(true);
      const element = summaryRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');

      // Standard A4 size in mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const imgWidth = 210 - 40; // A4 width (210mm) minus margins (20mm each side)
      const imgHeight = canvas.height * imgWidth / canvas.width;

      // Add title
      pdf.setFontSize(18);
      pdf.setTextColor(51, 65, 153);
      pdf.text('Document Summary', 20, 20);
      pdf.setLineWidth(0.5);
      pdf.setDrawColor(51, 65, 153);
      pdf.line(20, 22, 190, 22);

      // Add date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);

      // Add summary image
      pdf.addImage(imgData, 'PNG', 20, 35, imgWidth, imgHeight);
      pdf.save('docbox-summary.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
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
  return <div data-unique-id="657f5b28-5e15-401a-9f4b-ad46cbe53eb4" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3" data-unique-id="a83eb4b4-f314-4d0a-b816-ccc7ec78a060" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800" data-unique-id="fac392a5-edee-4300-877c-8b3ab606ec98" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="b488b49f-0f2d-473f-ab73-a67c76e84449" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex flex-wrap gap-2" data-unique-id="4c7b4229-347b-45be-9f81-bbde198ff708" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} disabled={!points.length} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-unique-id="18919683-be9f-4c32-89ca-16c638e60dd3" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummaryAsPdf} disabled={downloading || !points.length} className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-unique-id="fca2266b-efe2-4d69-803e-efaed6d38e54" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {downloading ? <>
                <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }} className="h-4 w-4" data-unique-id="b0707353-dab9-49be-b6ce-9de38f5411ec" data-file-name="components/analyzer/Summary.tsx">
                  <Download className="h-4 w-4" />
                </motion.div>
                Processing...
              </> : <>
                <FilePdf className="h-4 w-4" />
                Download PDF
              </>}
          </button>
        </div>
      </div>
      
      <div ref={summaryRef} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-8 rounded-xl border border-blue-100 shadow-md" data-unique-id="b4f388d4-7e9e-4cd7-a9af-f1aa981a0924" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
        {points.length > 0 ? <motion.ul className="space-y-4 md:space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="cccdfd5b-f67a-4859-9ed5-e6150be67957" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-3 md:p-4 rounded-lg border border-blue-100 shadow-sm" data-unique-id="00eac149-4121-433f-9ccf-e36919d69838" data-file-name="components/analyzer/Summary.tsx">
                <span className="text-blue-700 font-bold mr-3 flex-shrink-0" data-unique-id="5c735834-6ed6-4c4d-a961-0c11ce7fbc57" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="7e1eb697-a191-4d26-97c3-1187995677cc" data-file-name="components/analyzer/Summary.tsx">•</span></span>
                <span className="text-slate-800" data-unique-id="36f0c47c-1174-463f-87de-a671bfcc77bc" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
              </motion.li>)}
          </motion.ul> : <div className="text-center py-6" data-unique-id="90ccf2fe-5065-4078-a1e3-6df593d57f12" data-file-name="components/analyzer/Summary.tsx">
            <p className="text-slate-600" data-unique-id="c27e2998-7d70-4c73-9253-a7524d9ff750" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="66e6cd01-4037-4ca2-bca2-cdf42feae01c" data-file-name="components/analyzer/Summary.tsx">No summary points available.</span></p>
          </div>}
      </div>
    </div>;
}