import TCAnalyzerInterface from "@/components/TCAnalyzerInterface";
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 p-10" data-unique-id="c5e2ce57-2fea-4a05-8db3-9dbff62ba6b0" data-file-name="app/page.tsx">
      <div className="max-w-6xl mx-auto" data-unique-id="f0080340-6124-4833-94b3-2bd29433587c" data-file-name="app/page.tsx">
        <div className="mb-10" data-unique-id="5ac31265-98ad-40d4-b98e-3617286135be" data-file-name="app/page.tsx">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-3" data-unique-id="3b7be289-f1a1-4e67-8349-b8105b8130ee" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b2b0c59e-33ab-4e52-8d95-71a60c3250b9" data-file-name="app/page.tsx">
            T&C Analyzer
          </span></h1>
          <p className="text-slate-600 text-lg" data-unique-id="1e33b6b1-5ff6-4327-8218-cf3535024a17" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="81282933-466a-4b3c-bf5c-9ed8995b7b41" data-file-name="app/page.tsx">
            Upload or paste Terms & Conditions to analyze potential issues and get a summarized overview
          </span></p>
        </div>
        
        <TCAnalyzerInterface />
      </div>
    </main>;
}