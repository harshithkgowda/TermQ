import TCAnalyzerInterface from "@/components/TCAnalyzerInterface";
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-8" data-unique-id="265b64ed-67ce-4dc2-a652-ee704c9d4c59" data-file-name="app/page.tsx">
      <div className="max-w-6xl mx-auto" data-unique-id="d7120a3c-42ef-4aa1-b9c9-7fde3def5bad" data-file-name="app/page.tsx">
        <h1 className="text-4xl font-bold text-indigo-800 mb-2" data-unique-id="1035eeca-689e-4b88-9752-04975b0eb9fd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8e00f1d3-fedf-483d-88fd-f623280f0fdb" data-file-name="app/page.tsx">T&C Analyzer</span></h1>
        <p className="text-slate-600 mb-8" data-unique-id="6ebb1a9c-14e6-4d6c-9913-85b067f0b401" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0d7e95f6-f67f-4636-843f-3ad45529844c" data-file-name="app/page.tsx">Upload or paste Terms & Conditions to analyze potential issues and get a summarized overview</span></p>
        
        <TCAnalyzerInterface />
      </div>
    </main>;
}