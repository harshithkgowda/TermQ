import { Suspense } from 'react';
import TCAnalyzerWrapper from '@/components/TCAnalyzerWrapper';
export default function AppPage() {
  return <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-violet-50 to-teal-50" data-unique-id="9d632591-265b-44f6-8e76-b740054a8c1c" data-file-name="app/app/page.tsx">
      <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-screen" data-unique-id="3d1bd1f8-b8f8-49e0-85a1-c1656d147b05" data-file-name="app/app/page.tsx">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4" data-unique-id="a1688cad-d910-4d90-9bec-db5c442e0986" data-file-name="app/app/page.tsx"><span className="editable-text" data-unique-id="1e4bdefc-7c32-42a2-8b2e-a23ea2fd3601" data-file-name="app/app/page.tsx">TermQ</span></h1>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" data-unique-id="8d8ebb24-6ada-40ff-be23-4b08b19c6584" data-file-name="app/app/page.tsx"></div>
        </div>}>
        <TCAnalyzerWrapper />
      </Suspense>
    </main>;
}