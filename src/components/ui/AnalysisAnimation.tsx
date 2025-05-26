'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, MagnifyingGlass, Scale, BrainCircuit, CheckCircle } from 'lucide-react';
type Step = {
  icon: React.ReactNode;
  text: string;
  color: string;
};
export default function AnalysisAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps: Step[] = [{
    icon: <FileText className="h-7 w-7" />,
    text: "Processing document",
    color: "text-purple-600 bg-purple-100"
  }, {
    icon: <MagnifyingGlass className="h-7 w-7" />,
    text: "Identifying key clauses",
    color: "text-blue-600 bg-blue-100"
  }, {
    icon: <Scale className="h-7 w-7" />,
    text: "Evaluating implications",
    color: "text-teal-600 bg-teal-100"
  }, {
    icon: <BrainCircuit className="h-7 w-7" />,
    text: "Generating analysis",
    color: "text-indigo-600 bg-indigo-100"
  }, {
    icon: <CheckCircle className="h-7 w-7" />,
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
  return <div className="flex flex-col items-center" data-unique-id="be06e66c-88e4-4880-82ea-014aa24c599f" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
      {/* Pulsing circle animation */}
      <div className="relative mb-8" data-unique-id="87af6a12-d6da-4291-9bfe-424d90ca0cee" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.3, 0.6]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute inset-0 rounded-full bg-purple-300" data-unique-id="5b3e22c9-5c10-46c9-b0da-f3d7f4e36d55" data-file-name="components/ui/AnalysisAnimation.tsx" />
        
        {/* Inner circle with rotating gradient */}
        <motion.div animate={{
        rotate: 360
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }} className="relative w-24 h-24 rounded-full overflow-hidden" data-unique-id="20a861c7-0e96-491c-99fc-053345c0c6ba" data-file-name="components/ui/AnalysisAnimation.tsx">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500" data-unique-id="67bdbdfd-08b9-4cf8-9035-eeeec656bdca" data-file-name="components/ui/AnalysisAnimation.tsx" />
        </motion.div>
        
        {/* Current step icon */}
        <div className="absolute inset-0 flex items-center justify-center" data-unique-id="2f7c9030-6767-4a99-abc2-090e1d8cd41e" data-file-name="components/ui/AnalysisAnimation.tsx">
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
        }} className={`p-3 rounded-full ${steps[currentStep].color}`} data-unique-id="5729c3a3-f502-40ad-af21-62cfaf18c44b" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
            {steps[currentStep].icon}
          </motion.div>
        </div>
      </div>
      
      {/* Processing steps */}
      <div className="flex space-x-1" data-unique-id="88f27d21-8e60-45bd-adbb-c7662975e2a7" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps.map((step, index) => <motion.div key={index} animate={{
        scale: currentStep === index ? 1.2 : 1,
        opacity: currentStep === index ? 1 : 0.5
      }} className="w-2 h-2 rounded-full bg-purple-400" data-unique-id="7bf9d50c-e907-4f34-9518-7fc5a6d417f6" data-file-name="components/ui/AnalysisAnimation.tsx" />)}
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
    }} className="mt-4 text-lg font-medium text-purple-700" data-unique-id="23d5f262-2675-46b9-b39f-9ded9d1e0555" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps[currentStep].text}
      </motion.div>
    </div>;
}