// In your app/page.tsx
import { Suspense } from 'react';
import TCAnalyzerWrapper from '@/components/TCAnalyzerWrapper';
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-4 md:p-6 lg:p-10" data-unique-id="0faf0aa4-79fd-45f8-8c29-a1e3e0ff61b2" data-file-name="app/page.tsx">
      <div className="max-w-7xl mx-auto" data-unique-id="9a8ec67d-504b-49ba-941e-cf06a0b8f343" data-file-name="app/page.tsx">
        <div className="mb-6 md:mb-10 text-center md:text-left" data-unique-id="75584f7b-9699-44a2-b97d-3c7e9b8c85c7" data-file-name="app/page.tsx">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2 md:mb-3" data-unique-id="e182e498-4e0c-4ac7-bd13-10a8f5842eee" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f50039ce-4c5d-449f-974d-1134fc69dcd8" data-file-name="app/page.tsx">
            Docbox AI
          </span></h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto md:mx-0" data-unique-id="edfec449-d4ce-4699-8efe-84bea76a4dd9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="568228cd-7049-48ed-8860-deba744ea914" data-file-name="app/page.tsx">
            Upload or paste documents to analyze important points, get summarized insights, and compare multiple versions
          </span></p>
        </div>
        
        <Suspense fallback={<div className="flex items-center justify-center min-h-[300px] md:min-h-[400px]" data-unique-id="240258cf-328f-4a8a-8091-bbbbbb0572cf" data-file-name="app/page.tsx">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" data-unique-id="0a8bea74-dd6f-4039-9c67-90a6443e8734" data-file-name="app/page.tsx"></div>
          </div>}>
          <TCAnalyzerWrapper />
        </Suspense>
      </div>
    </main>;
}