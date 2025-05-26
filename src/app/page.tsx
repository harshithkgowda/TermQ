import TCAnalyzerInterface from "@/components/TCAnalyzerInterface";
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 p-10" data-unique-id="17fdc6a6-2c04-42de-b289-2c266294cc00" data-file-name="app/page.tsx">
      <div className="max-w-6xl mx-auto" data-unique-id="702c2c8d-dc7e-476b-9977-db43347b94e0" data-file-name="app/page.tsx">
        <div className="mb-10" data-unique-id="3c91d613-3c12-4494-82b4-9329927df9a9" data-file-name="app/page.tsx">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-3" data-unique-id="ddb0671e-d007-4df3-b7ef-5e29e1a29b91" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="be23e8e1-85b5-46cd-aa12-76aad07f2396" data-file-name="app/page.tsx">
            T&C Analyzer
          </span></h1>
          <p className="text-slate-600 text-lg" data-unique-id="a402d78b-7b12-4657-997b-8ad7daeb0d75" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b916f1e0-80a5-4f73-bc0e-8c9db8f58366" data-file-name="app/page.tsx">
            Upload or paste Terms & Conditions to analyze potential issues and get a summarized overview
          </span></p>
        </div>
        
        <TCAnalyzerInterface />
      </div>
    </main>;
}