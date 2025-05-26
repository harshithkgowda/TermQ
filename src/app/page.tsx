// In your app/page.tsx
import { Suspense } from 'react';
import TCAnalyzerWrapper from '@/components/TCAnalyzerWrapper';
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50" data-unique-id="7ba60e17-45f2-48da-af48-9aedf2d672cb" data-file-name="app/page.tsx">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen" data-unique-id="79685ba4-44ef-430e-9beb-721294367758" data-file-name="app/page.tsx">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" data-unique-id="82e1c26b-eb6c-4331-817d-a9b0a0eff419" data-file-name="app/page.tsx"></div>
        </div>}>
        <TCAnalyzerWrapper />
      </Suspense>
    </main>;
}