import TCAnalyzerInterface from "@/components/TCAnalyzerInterface";
export default function HomePage() {
  return <main className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 p-10" data-unique-id="ad869e2b-ae09-475b-9dc0-92cc281e05c6" data-file-name="app/page.tsx">
      <div className="max-w-6xl mx-auto" data-unique-id="b60f4135-a2ee-4947-8d98-4392bcb51c1e" data-file-name="app/page.tsx">
        <div className="mb-10" data-unique-id="5b571050-d126-436c-b1f5-554a44fc9afb" data-file-name="app/page.tsx">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-3" data-unique-id="f96554bb-f3dc-42c1-9883-57e6605586ca" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="55bb8817-6465-4676-828a-a3dc7848d233" data-file-name="app/page.tsx">
            T&C Analyzer
          </span></h1>
          <p className="text-slate-600 text-lg" data-unique-id="8807f3ec-0983-4df2-94b0-ab9a9ff51b15" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="31652b3d-eb60-4e3e-bff0-4227ac936a83" data-file-name="app/page.tsx">
            Upload or paste Terms & Conditions to analyze potential issues and get a summarized overview
          </span></p>
        </div>
        
        <TCAnalyzerInterface />
      </div>
    </main>;
}