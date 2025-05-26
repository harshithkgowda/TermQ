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
    icon: <Search className="h-7 w-7" />,
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
  return <div className="flex flex-col items-center" data-unique-id="ca94e54e-1961-4ad8-8e62-a7a53dab1793" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
      {/* Pulsing circle animation */}
      <div className="relative mb-8" data-unique-id="f3a370e2-ee23-438d-b8fc-00c424a82aae" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.3, 0.6]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute inset-0 rounded-full bg-purple-300" data-unique-id="938e907a-c435-494a-a445-14b3de66eafd" data-file-name="components/ui/AnalysisAnimation.tsx" />

        {/* Inner circle with static gradient instead of rotating */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden" data-unique-id="58183fb8-ad0b-4f3d-b04b-7e5722a59988" data-file-name="components/ui/AnalysisAnimation.tsx">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500" data-unique-id="0af39b86-4054-465f-bca4-28409477de09" data-file-name="components/ui/AnalysisAnimation.tsx" />
        </div>

        {/* Current step icon */}
        <div className="absolute inset-0 flex items-center justify-center" data-unique-id="fcb7ba32-7149-4a64-88bf-de58f5af46a3" data-file-name="components/ui/AnalysisAnimation.tsx">
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
        }} className={`p-3 rounded-full ${steps[currentStep].color}`} data-unique-id="c5052a0c-8b37-48f2-90a8-a9257af0b013" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
            {steps[currentStep].icon}
          </motion.div>
        </div>
      </div>

      {/* Processing steps */}
      <div className="flex space-x-1" data-unique-id="c62f70e3-cb94-437a-8f18-9abac8641d0c" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps.map((step, index) => <motion.div key={index} animate={{
        scale: currentStep === index ? 1.2 : 1,
        opacity: currentStep === index ? 1 : 0.5
      }} className="w-2 h-2 rounded-full bg-purple-400" data-unique-id="7b9869c7-e85c-4b63-8ca5-8d021c4bddb2" data-file-name="components/ui/AnalysisAnimation.tsx" />)}
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
    }} className="mt-4 text-lg font-medium text-purple-700" data-unique-id="18ab86d4-1dfd-4633-95ed-c4e6599a1d4e" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps[currentStep].text}
      </motion.div>
    </div>;
}