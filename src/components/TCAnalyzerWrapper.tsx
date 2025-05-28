'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Use dynamic import with ssr: false to prevent server-side rendering
const TCAnalyzerInterface = dynamic(() => import('@/components/TCAnalyzerInterface'), {
  ssr: false,
  loading: () => <div className="flex flex-col items-center justify-center min-h-screen" data-unique-id="f1982f89-150b-4406-9a26-833c07172e58" data-file-name="components/TCAnalyzerWrapper.tsx">
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="flex flex-col items-center" data-unique-id="5e52f9fe-0ec6-4360-9694-adb3d4d4600d" data-file-name="components/TCAnalyzerWrapper.tsx">
        <motion.h1 initial={{
        y: -20
      }} animate={{
        y: 0
      }} transition={{
        type: "spring",
        stiffness: 300,
        damping: 15
      }} className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent mb-6" data-unique-id="d39e8f43-8ac5-4523-9b7d-ead25669ad13" data-file-name="components/TCAnalyzerWrapper.tsx"><span className="editable-text" data-unique-id="6c5055ea-0fe4-4963-bea6-494f46b4ada4" data-file-name="components/TCAnalyzerWrapper.tsx">
          TermQ
        </span></motion.h1>
        <motion.div animate={{
        rotate: 360,
        borderColor: ["#0EA5E9", "#8B5CF6", "#10B981", "#0EA5E9"]
      }} transition={{
        rotate: {
          repeat: Infinity,
          duration: 1.5,
          ease: "linear"
        },
        borderColor: {
          repeat: Infinity,
          duration: 3,
          ease: "linear"
        }
      }} className="h-12 w-12 rounded-full border-t-2 border-b-2" data-unique-id="a601e6da-d6fb-44bd-b9b6-cfe8bf07cb0e" data-file-name="components/TCAnalyzerWrapper.tsx" />
      </motion.div>
    </div>
});
export default function TCAnalyzerWrapper() {
  return <TCAnalyzerInterface />;
}