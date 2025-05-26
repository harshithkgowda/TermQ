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
  return <div className="flex flex-col items-center" data-unique-id="ac3ccad4-b3d5-4597-9fbc-35c4aa99895a" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
      {/* Pulsing circle animation */}
      <div className="relative mb-8" data-unique-id="646a3274-cbf3-4837-bb2e-b98f0c80d1d1" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.3, 0.6]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute inset-0 rounded-full bg-purple-300" data-unique-id="95d367b1-8bb7-45bf-b333-1230d94459d6" data-file-name="components/ui/AnalysisAnimation.tsx" />

        {/* Inner circle with static gradient instead of rotating */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden" data-unique-id="d3ca0863-be9f-42a6-bd47-521274b2dad0" data-file-name="components/ui/AnalysisAnimation.tsx">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500" data-unique-id="6c9919f8-4442-4b4b-9504-e1ab93ec821f" data-file-name="components/ui/AnalysisAnimation.tsx" />
        </div>

        {/* Current step icon */}
        <div className="absolute inset-0 flex items-center justify-center" data-unique-id="7ccf71da-bec7-4903-ae7d-a0ff886f9d1c" data-file-name="components/ui/AnalysisAnimation.tsx">
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
        }} className={`p-3 rounded-full ${steps[currentStep].color}`} data-unique-id="3c0f5361-6e47-438a-bf43-40823b736a0a" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
            {steps[currentStep].icon}
          </motion.div>
        </div>
      </div>

      {/* Processing steps */}
      <div className="flex space-x-1" data-unique-id="e5bd6a21-2711-4e07-ab2c-d10be1c97872" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps.map((step, index) => <motion.div key={index} animate={{
        scale: currentStep === index ? 1.2 : 1,
        opacity: currentStep === index ? 1 : 0.5
      }} className="w-2 h-2 rounded-full bg-purple-400" data-unique-id="49f63c75-4125-498b-b3a4-ac702ba7fd1b" data-file-name="components/ui/AnalysisAnimation.tsx" />)}
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
    }} className="mt-4 text-lg font-medium text-purple-700" data-unique-id="29f017aa-edb4-4fb9-b293-26386f7f902d" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps[currentStep].text}
      </motion.div>
    </div>;
}