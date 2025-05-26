// In your app/page.tsx
import { Suspense } from 'react';
import TCAnalyzerWrapper from '@/components/TCAnalyzerWrapper';
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 p-10" data-unique-id="150f7ddf-4775-47b8-a775-01c11f469b92" data-file-name="app/page.tsx">
      <div className="max-w-7xl mx-auto" data-unique-id="dad36507-f977-451b-a49b-3698683f3e3f" data-file-name="app/page.tsx">
        <div className="mb-10" data-unique-id="ff28ac6d-c4a9-4bee-b746-5c95a53dc708" data-file-name="app/page.tsx">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-3" data-unique-id="4cb812b9-5782-47af-ac6f-bacaa9194cb4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2d4235b4-8a2c-491f-bb8e-a13b6446ed2f" data-file-name="app/page.tsx">
            T&C Analyzer & Comparator
          </span></h1>
          <p className="text-slate-600 text-lg" data-unique-id="3b6a84c3-e9db-4324-9883-6c719b330ffe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1d42d7a1-335d-4d29-b61a-b80858b9b859" data-file-name="app/page.tsx">
            Upload or paste Terms & Conditions to analyze potential issues, get a summarized overview, and compare multiple documents
          </span></p>
        </div>
        
        <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]" data-unique-id="22fb6d67-ed9c-4fc6-9983-4bfb192f5870" data-file-name="app/page.tsx">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" data-unique-id="e10f37ca-71e5-49f2-aa76-46da112de1f2" data-file-name="app/page.tsx"></div>
          </div>}>
          <TCAnalyzerWrapper />
        </Suspense>
      </div>
    </main>;
}