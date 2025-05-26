'use client';

import { motion } from 'framer-motion';
import { Download, FilePdf, Clipboard } from 'lucide-react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default function Summary() {
  const {
    summary
  } = useAnalyzerStore();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const copyToClipboard = () => {
    const text = summary.points.map(point => `• ${point}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const downloadSummaryAsPdf = async () => {
    if (!summaryRef.current) return;
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
  return <div data-unique-id="ba28c8c5-626a-4d4b-b284-f855b7f2bdb1" data-file-name="components/analyzer/Summary.tsx">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3" data-unique-id="f6dd1815-21c5-4c63-8af3-ea8c4786a07c" data-file-name="components/analyzer/Summary.tsx">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800" data-unique-id="6ea12146-67d5-48ff-97b4-dfbf68d66280" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="e530c5f0-16bf-4cf9-a97d-a2802c55842c" data-file-name="components/analyzer/Summary.tsx">Summary</span></h2>
        
        <div className="flex flex-wrap gap-2" data-unique-id="8a6a1d66-111a-4e1d-a528-ffa044466b32" data-file-name="components/analyzer/Summary.tsx">
          <button onClick={copyToClipboard} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 text-sm transition-colors" data-unique-id="a726ec40-b5e0-4d40-986f-d0ce800934ae" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          
          <button onClick={downloadSummaryAsPdf} disabled={downloading} className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700 text-sm transition-colors" data-unique-id="550d6377-4d19-4035-bed0-c066484ada8b" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
            {downloading ? <>
                <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }} className="h-4 w-4" data-unique-id="cc6d20ef-43da-4073-b005-a5e1653b6d76" data-file-name="components/analyzer/Summary.tsx">
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
      
      <div ref={summaryRef} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-8 rounded-xl border border-blue-100 shadow-md" data-unique-id="1a3b4c41-6121-483a-a951-7fa6cdb1c393" data-file-name="components/analyzer/Summary.tsx">
        <motion.ul className="space-y-4 md:space-y-5" variants={container} initial="hidden" animate="show" data-unique-id="2b1b51b4-1792-4b46-ae7f-f3a681f8e746" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">
          {summary.points.map((point, index) => <motion.li key={index} variants={item} className="flex bg-white/70 p-3 md:p-4 rounded-lg border border-blue-100 shadow-sm" data-unique-id="b57202c1-6144-4dc4-9d82-516a36d3eb1d" data-file-name="components/analyzer/Summary.tsx">
              <span className="text-blue-700 font-bold mr-3 flex-shrink-0" data-unique-id="18398c06-d8dc-4a3c-b4e4-a78be223194d" data-file-name="components/analyzer/Summary.tsx"><span className="editable-text" data-unique-id="64f4b639-d3d7-480a-b30d-f0cc8fba9ec3" data-file-name="components/analyzer/Summary.tsx">•</span></span>
              <span className="text-slate-800" data-unique-id="4a9bc3f8-a002-46bc-8f13-a62e9b3fbc1c" data-file-name="components/analyzer/Summary.tsx" data-dynamic-text="true">{point}</span>
            </motion.li>)}
        </motion.ul>
      </div>
    </div>;
}