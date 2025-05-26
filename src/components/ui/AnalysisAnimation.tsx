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
  return <div className="flex flex-col items-center" data-unique-id="bbdb4af0-2948-43b4-8188-6518e4dd73c9" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
      {/* Pulsing circle animation */}
      <div className="relative mb-8" data-unique-id="42e2871f-fdba-4534-8e80-0eb577369eaf" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.3, 0.6]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute inset-0 rounded-full bg-purple-300" data-unique-id="785bd34c-c6e7-4fa4-8164-610206982fb0" data-file-name="components/ui/AnalysisAnimation.tsx" />
        
        {/* Inner circle with rotating gradient */}
        <motion.div animate={{
        rotate: 360
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }} className="relative w-24 h-24 rounded-full overflow-hidden" data-unique-id="48535aee-8d06-49b4-9584-6d9c611a2f2c" data-file-name="components/ui/AnalysisAnimation.tsx">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500" data-unique-id="ca679041-994b-4086-bec4-ca21b3d0cca1" data-file-name="components/ui/AnalysisAnimation.tsx" />
        </motion.div>
        
        {/* Current step icon */}
        <div className="absolute inset-0 flex items-center justify-center" data-unique-id="c6376577-0734-44d7-a27e-7c0f094f09f1" data-file-name="components/ui/AnalysisAnimation.tsx">
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
        }} className={`p-3 rounded-full ${steps[currentStep].color}`} data-unique-id="90ccd460-df18-4f96-90f5-71860ac551c7" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
            {steps[currentStep].icon}
          </motion.div>
        </div>
      </div>
      
      {/* Processing steps */}
      <div className="flex space-x-1" data-unique-id="727f186f-b727-4199-a6cf-d6dbb36adb95" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps.map((step, index) => <motion.div key={index} animate={{
        scale: currentStep === index ? 1.2 : 1,
        opacity: currentStep === index ? 1 : 0.5
      }} className="w-2 h-2 rounded-full bg-purple-400" data-unique-id="f49fbf92-7151-48bf-bc5c-7055cebe4360" data-file-name="components/ui/AnalysisAnimation.tsx" />)}
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
    }} className="mt-4 text-lg font-medium text-purple-700" data-unique-id="c2128dbf-d20b-4966-b74a-2c8bd6b81440" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps[currentStep].text}
      </motion.div>
    </div>;
}