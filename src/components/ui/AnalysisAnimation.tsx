'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Scale, BrainCircuit, CheckCircle } from 'lucide-react';
type Step = {
  icon: React.ReactNode;
  text: string;
  color: string;
};
export default function AnalysisAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps: Step[] = [{
    icon: <FileText className="h-6 w-6 md:h-7 md:w-7" />,
    text: "Processing document",
    color: "text-blue-600 bg-blue-100"
  }, {
    icon: <Search className="h-6 w-6 md:h-7 md:w-7" />,
    text: "Identifying key clauses",
    color: "text-purple-600 bg-purple-100"
  }, {
    icon: <Scale className="h-6 w-6 md:h-7 md:w-7" />,
    text: "Evaluating implications",
    color: "text-teal-600 bg-teal-100"
  }, {
    icon: <BrainCircuit className="h-6 w-6 md:h-7 md:w-7" />,
    text: "Generating analysis",
    color: "text-indigo-600 bg-indigo-100"
  }, {
    icon: <CheckCircle className="h-6 w-6 md:h-7 md:w-7" />,
    text: "Finalizing results",
    color: "text-emerald-600 bg-emerald-100"
  }];

  // Loop through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);
  return <div className="flex flex-col items-center" data-unique-id="75bf16bd-2646-4570-bd81-714c9416697e" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
      {/* Pulsing circle animation */}
      <div className="relative mb-8" data-unique-id="3b144d3c-622d-473d-9f03-0d7fcb8e7ef3" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.3, 0.6]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute inset-0 rounded-full bg-purple-300" data-unique-id="4ab97531-5823-41b7-965b-7e51cf9ca475" data-file-name="components/ui/AnalysisAnimation.tsx" />

        {/* Inner circle with static gradient instead of rotating */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden" data-unique-id="a7b2413d-b084-4b06-b18e-141f1e343724" data-file-name="components/ui/AnalysisAnimation.tsx">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500" data-unique-id="6576cf8d-e817-4555-86ed-00185853b1e4" data-file-name="components/ui/AnalysisAnimation.tsx" />
        </div>

        {/* Current step icon */}
        <div className="absolute inset-0 flex items-center justify-center" data-unique-id="dc39ed61-394a-463f-a180-92fe4edbebc1" data-file-name="components/ui/AnalysisAnimation.tsx">
          <motion.div key={currentStep} initial={{
          scale: 0.5,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.5,
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className={`p-3 rounded-full ${steps[currentStep].color}`} data-unique-id="1d4ca9a7-ab50-4352-912e-63b8eadddd87" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
            {steps[currentStep].icon}
          </motion.div>
        </div>
      </div>

      {/* Processing steps */}
      <div className="flex space-x-1" data-unique-id="23e1ccc7-e1b5-4e6a-a935-c8dad9730a28" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps.map((step, index) => <motion.div key={index} animate={{
        scale: currentStep === index ? 1.2 : 1,
        opacity: currentStep === index ? 1 : 0.5
      }} className="w-2 h-2 rounded-full bg-purple-400" data-unique-id="62ae5c2b-acb2-4378-a371-3243012a06cd" data-file-name="components/ui/AnalysisAnimation.tsx" />)}
      </div>

      {/* Current step text */}
      <motion.div key={`text-${currentStep}`} initial={{
      opacity: 0,
      y: 5
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0
    }} transition={{
      duration: 0.3
    }} className="mt-4 text-lg font-medium text-purple-700" data-unique-id="1d7fbc46-5552-419a-a01b-ac9b25a26a0b" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps[currentStep].text}
      </motion.div>
    </div>;
}