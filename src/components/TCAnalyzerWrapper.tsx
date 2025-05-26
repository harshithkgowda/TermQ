'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent server-side rendering
const TCAnalyzerInterface = dynamic(() => import('@/components/TCAnalyzerInterface'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen" data-unique-id="840e4966-4ac0-4ae0-85c2-8e549b442e93" data-file-name="components/TCAnalyzerWrapper.tsx">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" data-unique-id="56566047-e55f-41d9-b415-38295400756c" data-file-name="components/TCAnalyzerWrapper.tsx"></div>
    </div>
});
export default function TCAnalyzerWrapper() {
  return <TCAnalyzerInterface />;
}