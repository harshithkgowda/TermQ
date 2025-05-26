// In your app/page.tsx
import { Suspense } from 'react';
import TCAnalyzerWrapper from '@/components/TCAnalyzerWrapper';
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50" data-unique-id="094721e8-3a17-425a-a09d-2ee560154ce0" data-file-name="app/page.tsx">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen" data-unique-id="438c8561-167b-4c4d-8745-02faecd8638e" data-file-name="app/page.tsx">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" data-unique-id="bfea75a9-8fc8-4cf8-8435-762f5d3084aa" data-file-name="app/page.tsx"></div>
        </div>}>
        <TCAnalyzerWrapper />
      </Suspense>
    </main>;
}