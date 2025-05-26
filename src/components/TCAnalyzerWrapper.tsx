'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent server-side rendering
const TCAnalyzerInterface = dynamic(() => import('@/components/TCAnalyzerInterface'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-[400px]" data-unique-id="587bad84-97e3-4fbe-808e-5336957da544" data-file-name="components/TCAnalyzerWrapper.tsx">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" data-unique-id="d15d2968-e2ae-42a1-8352-cd1dd1d00ca0" data-file-name="components/TCAnalyzerWrapper.tsx"></div>
      </div>
});
export default function TCAnalyzerWrapper() {
  return <TCAnalyzerInterface />;
}