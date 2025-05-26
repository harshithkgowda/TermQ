// In your app/page.tsx
import { Suspense } from 'react';
import TCAnalyzerWrapper from '@/components/TCAnalyzerWrapper';
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 p-10" data-unique-id="49a015bc-d585-4c2a-8cea-8bf5a9792a52" data-file-name="app/page.tsx">
      <div className="max-w-6xl mx-auto" data-unique-id="8e08595e-a565-4bd7-afc1-69698c47a8e7" data-file-name="app/page.tsx">
        <div className="mb-10" data-unique-id="e607eed1-56f5-4010-8ade-f7b4c8fd9670" data-file-name="app/page.tsx">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-3" data-unique-id="5f4316d8-8fd7-4d86-938f-778a3b97aefa" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="614ac3c7-4373-44e3-9054-3f9c0a5ac460" data-file-name="app/page.tsx">
            T&C Analyzer
          </span></h1>
          <p className="text-slate-600 text-lg" data-unique-id="2ef45348-6e38-498f-8dc1-48bef3c13923" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d63c96bc-c76a-4d8c-835a-0c183a9808f7" data-file-name="app/page.tsx">
            Upload or paste Terms & Conditions to analyze potential issues and get a summarized overview
          </span></p>
        </div>
        
        <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]" data-unique-id="f30e665b-3063-4632-85bb-22fbb3445026" data-file-name="app/page.tsx">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" data-unique-id="b066cf9e-e687-4e41-8f30-bf3b77f9d7a7" data-file-name="app/page.tsx"></div>
          </div>}>
          <TCAnalyzerWrapper />
        </Suspense>
      </div>
    </main>;
}