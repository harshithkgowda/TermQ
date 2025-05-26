// In your app/page.tsx
import { Suspense } from 'react';
import TCAnalyzerWrapper from '@/components/TCAnalyzerWrapper';
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50" data-unique-id="11ff1de0-1826-46bd-8326-bf124dcbda60" data-file-name="app/page.tsx">
      <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-screen" data-unique-id="89869a98-cb24-45e9-b277-b8ae0a5837aa" data-file-name="app/page.tsx">
            <h1 className="text-3xl font-bold text-blue-700 mb-4" data-unique-id="d6eeab7f-8af8-451c-865d-ee4e942be1e1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4468e193-ca18-45ee-847a-f72713bd6d0c" data-file-name="app/page.tsx">Docbox AI</span></h1>
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" data-unique-id="583df960-5073-45b5-aeb9-49b6acb7f28d" data-file-name="app/page.tsx"></div>
          </div>}>
        <TCAnalyzerWrapper />
      </Suspense>
    </main>;
}