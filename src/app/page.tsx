// In your app/page.tsx
import { Suspense } from 'react';
import TCAnalyzerWrapper from '@/components/TCAnalyzerWrapper';
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 p-10" data-unique-id="98bc2fd5-9e02-456a-bc3e-abe6bb75e29c" data-file-name="app/page.tsx">
      <div className="max-w-6xl mx-auto" data-unique-id="96a22997-a831-4ab8-8309-9717b78b1039" data-file-name="app/page.tsx">
        <div className="mb-10" data-unique-id="f6da9a34-6627-4098-8282-201c1e646c86" data-file-name="app/page.tsx">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-3" data-unique-id="ef5984e2-fe92-4ba9-98c5-f6313fdb5e90" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="223d4be8-1394-410d-a221-84a7f78f797b" data-file-name="app/page.tsx">
            T&C Analyzer
          </span></h1>
          <p className="text-slate-600 text-lg" data-unique-id="7690558f-683a-43a8-b97e-a9bba1549376" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2da8b7b3-d71f-47b7-9aa1-fb18d9933f38" data-file-name="app/page.tsx">
            Upload or paste Terms & Conditions to analyze potential issues and get a summarized overview
          </span></p>
        </div>
        
        <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]" data-unique-id="0a94617b-0206-406a-813a-efc5e10bd095" data-file-name="app/page.tsx">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" data-unique-id="cbda67bb-77b7-4123-b06b-82d59d917ff1" data-file-name="app/page.tsx"></div>
          </div>}>
          <TCAnalyzerWrapper />
        </Suspense>
      </div>
    </main>;
}