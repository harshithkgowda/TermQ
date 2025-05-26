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
  return <div className="flex flex-col items-center" data-unique-id="1ee969eb-abf3-4187-96cc-39b94c1362fe" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
      {/* Pulsing circle animation */}
      <div className="relative mb-8" data-unique-id="f1668140-07bb-47a4-9c0d-c825ebf03441" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.3, 0.6]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute inset-0 rounded-full bg-purple-300" data-unique-id="a3120126-382e-4fc8-9650-23f9602bf133" data-file-name="components/ui/AnalysisAnimation.tsx" />

        {/* Inner circle with static gradient instead of rotating */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden" data-unique-id="2a84386e-1eab-4825-8b27-d36359c47818" data-file-name="components/ui/AnalysisAnimation.tsx">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500" data-unique-id="ba53000f-f528-40a2-9f24-99c5251e245d" data-file-name="components/ui/AnalysisAnimation.tsx" />
        </div>

        {/* Current step icon */}
        <div className="absolute inset-0 flex items-center justify-center" data-unique-id="52ddd677-1491-4efe-b625-54f472937c89" data-file-name="components/ui/AnalysisAnimation.tsx">
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
        }} className={`p-3 rounded-full ${steps[currentStep].color}`} data-unique-id="f89bfdd6-be93-44f0-ae28-0ec6d200f690" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
            {steps[currentStep].icon}
          </motion.div>
        </div>
      </div>

      {/* Processing steps */}
      <div className="flex space-x-1" data-unique-id="9994932d-c09f-4b58-90e5-ee258368dcaf" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps.map((step, index) => <motion.div key={index} animate={{
        scale: currentStep === index ? 1.2 : 1,
        opacity: currentStep === index ? 1 : 0.5
      }} className="w-2 h-2 rounded-full bg-purple-400" data-unique-id="19dd8948-2435-4887-b905-a8979026c59d" data-file-name="components/ui/AnalysisAnimation.tsx" />)}
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
    }} className="mt-4 text-lg font-medium text-purple-700" data-unique-id="a69caabd-968e-4fa9-bee3-36bdb1933859" data-file-name="components/ui/AnalysisAnimation.tsx" data-dynamic-text="true">
        {steps[currentStep].text}
      </motion.div>
    </div>;
}