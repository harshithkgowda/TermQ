// In your app/page.tsx
import { Suspense } from 'react';
import TCAnalyzerWrapper from '@/components/TCAnalyzerWrapper';
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50" data-unique-id="e2a0c76b-3ef8-4657-8e34-1c4644b2c25d" data-file-name="app/page.tsx">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen" data-unique-id="d4db6cf5-4f51-49b9-b345-ce695bc805f0" data-file-name="app/page.tsx">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" data-unique-id="379d3601-fe68-4bb6-b791-b6d06433a81c" data-file-name="app/page.tsx"></div>
        </div>}>
        <TCAnalyzerWrapper />
      </Suspense>
    </main>;
}