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
  return <div className="flex flex-col items-center" data-unique-id="7925df7b-62f4-4430-b83b-1f72c05bb76f" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
      {/* Pulsing circle animation */}
      <div className="relative mb-8" data-unique-id="d82cc4e0-e661-474e-a458-785c25de6e78" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.3, 0.6]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute inset-0 rounded-full bg-purple-300" data-unique-id="c513d1f2-c2ef-49f3-a4fd-ac3cca0379de" data-file-name="components/ui/AnalysisAnimation.tsx" />
        
        {/* Inner circle with rotating gradient */}
        <motion.div animate={{
        rotate: 360
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }} className="relative w-24 h-24 rounded-full overflow-hidden" data-unique-id="b9815b8b-67a8-4ed0-b8d0-ac8b493e1c5e" data-file-name="components/ui/AnalysisAnimation.tsx">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500" data-unique-id="0437333a-7ef0-480a-a46b-b9b021bbe475" data-file-name="components/ui/AnalysisAnimation.tsx" />
        </motion.div>
        
        {/* Current step icon */}
        <div className="absolute inset-0 flex items-center justify-center" data-unique-id="9e5e8260-abb7-4f16-8356-7ea5295c5345" data-file-name="components/ui/AnalysisAnimation.tsx">
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
        }} className={`p-3 rounded-full ${steps[currentStep].color}`} data-unique-id="8d115792-25d8-4b3c-aec3-2a1508c67bfe" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
            {steps[currentStep].icon}
          </motion.div>
        </div>
      </div>
      
      {/* Processing steps */}
      <div className="flex space-x-1" data-unique-id="e6dce743-61fb-4db4-b157-42aeb1de9174" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps.map((step, index) => <motion.div key={index} animate={{
        scale: currentStep === index ? 1.2 : 1,
        opacity: currentStep === index ? 1 : 0.5
      }} className="w-2 h-2 rounded-full bg-purple-400" data-unique-id="b0f7649a-c8b8-4129-89f5-5931c23d5c73" data-file-name="components/ui/AnalysisAnimation.tsx" />)}
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
    }} className="mt-4 text-lg font-medium text-purple-700" data-unique-id="37eb43d5-a63d-4268-9d37-beda9e57886b" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps[currentStep].text}
      </motion.div>
    </div>;
}