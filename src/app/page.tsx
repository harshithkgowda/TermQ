// In your app/page.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileSearch, Shield, Sparkles, ArrowRight, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return <main className="min-h-screen bg-[#f8fafc]" data-unique-id="97b21ace-94e5-4d44-9e87-5c3da94a3c3e" data-file-name="app/page.tsx" data-dynamic-text="true">
    {/* Hero Section */}
    <section className="relative overflow-hidden" data-unique-id="509381df-7b21-479d-87d4-43ec6df299d6" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0" data-unique-id="23565370-23b0-42c1-8a24-13056c8ebf00" data-file-name="app/page.tsx">
        <div className="absolute right-0 top-32 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl" data-unique-id="08e02097-ab33-4c12-aca0-c2d16ef9a81d" data-file-name="app/page.tsx"></div>
        <div className="absolute left-20 top-96 w-72 h-72 bg-teal-200 rounded-full opacity-20 blur-3xl" data-unique-id="8d988163-6ee6-4beb-b627-9422ecc0d82d" data-file-name="app/page.tsx"></div>
        <div className="absolute left-40 top-20 w-48 h-48 bg-amber-200 rounded-full opacity-20 blur-3xl" data-unique-id="c5a9e505-84e1-4a1c-bb77-a84709101158" data-file-name="app/page.tsx"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32" data-unique-id="9e7eab40-9216-47d6-80e2-5029d79bdfc9" data-file-name="app/page.tsx" data-dynamic-text="true">
        <div className="flex flex-col items-center text-center" data-unique-id="d1e016e6-01f4-4889-b8fe-1fe58fcdc7a5" data-file-name="app/page.tsx">
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="mb-6" data-unique-id="3a1c7b7f-fdbb-4040-97f3-dc8e36272d10" data-file-name="app/page.tsx">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium" data-unique-id="9c2b9f17-342d-4689-b8b3-8ffefc3e9a8c" data-file-name="app/page.tsx">
              <Sparkles className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="15874cfb-d72d-4c45-9fab-536fd4d7a8b1" data-file-name="app/page.tsx">
                Terms Made Simple
              </span></div>
          </motion.div>

          <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="text-5xl md:text-6xl font-bold text-slate-800 mb-6" data-unique-id="56c777c9-3343-4331-9771-f96d4d24d220" data-file-name="app/page.tsx">
            <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent" data-unique-id="13cc0438-0995-4a2d-8029-284131891ce9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6e9bd8e2-c726-4c12-a077-42e241e69bbb" data-file-name="app/page.tsx">TermQ</span></span>
          </motion.h1>

          <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-10" data-unique-id="2e8cfdb9-d83d-4399-9b52-8d18b232f73d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="48fbb837-996d-4e5b-aea5-3e254e968812" data-file-name="app/page.tsx">
              Analyze and simplify complex Terms & Conditions
              with AI-powered insights in seconds.
            </span></motion.p>

          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} data-unique-id="f75e5608-91d8-4641-9ad5-c3676fcf0ba4" data-file-name="app/page.tsx">
            <Link href="/app" className="group relative inline-flex items-center overflow-hidden rounded-lg bg-indigo-600 px-8 py-3 text-white transition-all duration-300 ease-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" data-unique-id="1641d652-5921-4391-bf29-a310c398e33b" data-file-name="app/page.tsx">
              <span className="relative mr-2 font-medium" data-unique-id="894ff8b0-4375-4459-8ead-366b2d01a772" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fdb219b7-8a5e-4a26-9334-751ba61ab441" data-file-name="app/page.tsx">Start Now</span></span>
              <motion.span animate={{
                x: [0, 5, 0]
              }} transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }} data-unique-id="ef055a2e-30cf-49d8-b779-4672f186bf4c" data-file-name="app/page.tsx">
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24" data-unique-id="083b7e1c-ed32-4656-80e1-32d84dc42eb1" data-file-name="app/page.tsx">
          <FeatureCard icon={<FileSearch className="h-6 w-6 text-teal-500" />} title="Instant Analysis" description="Upload or paste any Terms & Conditions document and get an instant breakdown of important clauses." delay={0} />
          <FeatureCard icon={<Shield className="h-6 w-6 text-indigo-500" />} title="Risk Detection" description="Automatically highlights harmful clauses and potential risks in legal documents." delay={0.1} />
          <FeatureCard icon={<FileText className="h-6 w-6 text-amber-500" />} title="Easy Comparison" description="Compare multiple versions of documents to identify changes and differences." delay={0.2} />
        </motion.div>
      </div>

      {/* Bottom Wave */}
      {/* <div className="absolute bottom-0 left-0 right-0" data-unique-id="658d5569-41b7-484a-a30e-ad1bfb4cc07e" data-file-name="app/page.tsx">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white fill-current" data-unique-id="5ab021b6-d078-4b48-913c-89c6ffbe7eb5" data-file-name="app/page.tsx">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
          </svg>
        </div> */}
    </section>
  </main>;
}
function FeatureCard({
  icon,
  title,
  description,
  delay = 0
}) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: 0.6 + delay
  }} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow" data-unique-id="3698b1bc-aa56-4a80-9a45-5c0b4f487181" data-file-name="app/page.tsx">
    <div className="p-3 bg-slate-50 rounded-lg inline-block mb-4" data-unique-id="51e30659-1cf8-4f2b-9961-fe8fdeb9543d" data-file-name="app/page.tsx" data-dynamic-text="true">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2" data-unique-id="4aad0bf9-040e-416f-9c7c-2f0084a9e4e7" data-file-name="app/page.tsx" data-dynamic-text="true">{title}</h3>
    <p className="text-slate-600" data-unique-id="e1744840-64e8-4f02-a9e9-abd7fc29031e" data-file-name="app/page.tsx" data-dynamic-text="true">{description}</p>
  </motion.div>;
}