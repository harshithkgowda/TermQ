'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent server-side rendering
const TCAnalyzerInterface = dynamic(() => import('@/components/TCAnalyzerInterface'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen" data-unique-id="79b522fb-cfb1-4972-841c-d13e05227644" data-file-name="components/TCAnalyzerWrapper.tsx">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" data-unique-id="c5ddbc83-74ec-489c-bc6a-518a5273208d" data-file-name="components/TCAnalyzerWrapper.tsx"></div>
    </div>
});
export default function TCAnalyzerWrapper() {
  return <TCAnalyzerInterface />;
}