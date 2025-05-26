import TCAnalyzerInterface from "@/components/TCAnalyzerInterface";
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 p-10" data-unique-id="c4f4f32c-22d2-47c9-9cc3-34a3d5ce2087" data-file-name="app/page.tsx">
      <div className="max-w-6xl mx-auto" data-unique-id="fc0a5fb6-eba7-4a6c-8b1d-39eaa6652222" data-file-name="app/page.tsx">
        <div className="mb-10" data-unique-id="b4b1b73f-eb08-481d-be1c-16d8a15a45df" data-file-name="app/page.tsx">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-3" data-unique-id="290f8fcc-a272-4fc2-9573-759d3f6c4248" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4c86809c-049b-4392-ada4-83c6ade4349a" data-file-name="app/page.tsx">
            T&C Analyzer
          </span></h1>
          <p className="text-slate-600 text-lg" data-unique-id="5d40e4c2-683e-403c-b0c5-cab21e8c506f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8c755a02-1b6d-4154-9933-bbe4887c3595" data-file-name="app/page.tsx">
            Upload or paste Terms & Conditions to analyze potential issues and get a summarized overview
          </span></p>
        </div>
        
        <TCAnalyzerInterface />
      </div>
    </main>;
}