'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent server-side rendering
const TCAnalyzerInterface = dynamic(() => import('@/components/TCAnalyzerInterface'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-[400px]" data-unique-id="044c3e5e-ffad-4c62-a5f8-b161d91efb61" data-file-name="components/TCAnalyzerWrapper.tsx">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" data-unique-id="3d14718d-baae-4f3f-9b91-edfdad3e8d2c" data-file-name="components/TCAnalyzerWrapper.tsx"></div>
      </div>
});
export default function TCAnalyzerWrapper() {
  return <TCAnalyzerInterface />;
}