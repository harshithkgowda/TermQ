'use client';

import { useState, useEffect } from 'react';
import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import InputSelector from './analyzer/InputSelector';
import AnalysisResults from './analyzer/AnalysisResults';
import Summary from './analyzer/Summary';
import AIInsights from './analyzer/AIInsights';
import DocumentCompare from './analyzer/DocumentCompare';
import Sidebar from './ui/Sidebar';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, Save, Menu, X } from 'lucide-react';
import { analyzeContent } from '@/lib/analyzer';
import AnalysisAnimation from './ui/AnalysisAnimation';
export default function TCAnalyzerInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    content,
    isAnalyzing,
    analysisPoints,
    summary,
    aiInsights,
    error,
    setError,
    setIsAnalyzing,
    isCompareMode,
    addDocument,
    getCurrentDocument
  } = useAnalyzerStore();
  const [activeTab, setActiveTab] = useState<'input' | 'results' | 'summary' | 'ai-insights'>(analysisPoints.length > 0 ? 'results' : 'input');
  const [documentName, setDocumentName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Update document name when current document changes
  const currentDocument = getCurrentDocument();
  useEffect(() => {
    if (currentDocument) {
      setDocumentName(currentDocument.name);
    } else {
      setDocumentName('');
    }
  }, [currentDocument]);
  const handleAnalyze = async () => {
    try {
      setError(null);
      setIsAnalyzing(true);
      await analyzeContent();
      setActiveTab('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsAnalyzing(false);
    }
  };
  const handleSaveDocument = () => {
    if (!documentName.trim()) return;
    setIsSaving(true);

    // Create a new document with the current content and analysis
    const newDocument = {
      id: `doc-${Date.now()}`,
      name: documentName,
      content,
      file: null,
      imageUrl: null,
      analysisPoints,
      summary,
      createdAt: new Date()
    };
    addDocument(newDocument);
    setIsSaving(false);
    setDocumentName('');
  };
  return <div className="flex h-screen overflow-hidden" data-unique-id="6d7c5d85-da9f-4002-bcc4-0e030dee7093" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static z-20 h-full`} data-unique-id="70cb09e2-a6a8-4b48-8d40-c2e72c2d9c25" data-file-name="components/TCAnalyzerInterface.tsx">
        <Sidebar />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} data-unique-id="4ecfa319-4f2b-49de-b7dc-1869d7b89918" data-file-name="components/TCAnalyzerInterface.tsx"></div>}
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full" data-unique-id="235749ec-8507-4217-938d-42cd40f04693" data-file-name="components/TCAnalyzerInterface.tsx">
        <div className="bg-white h-full" data-unique-id="79ec400c-4917-4501-a2f3-b15791660034" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
          {/* App Header */}
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 p-4 md:p-6 border-b border-blue-100 relative" data-unique-id="23321bf7-693f-468a-99cf-ce876051e987" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
            {/* Sidebar Toggle - Moved to top right instead of overlapping with content */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-md shadow-md flex items-center justify-center" data-unique-id="80e08e59-3185-4330-9e79-1673f4772b09" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="text-center max-w-4xl mx-auto" data-unique-id="cbb25f8c-498e-438e-b462-306a62704180" data-file-name="components/TCAnalyzerInterface.tsx">
              <h1 className="text-3xl font-bold text-blue-700 mb-2" data-unique-id="644f4b03-1fc2-4a52-9951-1847efafdc4b" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="0b855a44-3f58-4caa-8888-b377f2ac6d3f" data-file-name="components/TCAnalyzerInterface.tsx">
                Docbox AI
              </span></h1>
              <p className="text-slate-600 mb-4" data-unique-id="922d1bc9-df77-4601-978c-d15907f3bb2b" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="79b007c1-a831-4733-871d-dae48f1fc096" data-file-name="components/TCAnalyzerInterface.tsx">
                Analyze Terms & Conditions documents and break them down into simple, understandable points
              </span></p>
              <div className="flex justify-center gap-4 text-sm text-blue-600" data-unique-id="e54d7e34-d4e7-4936-b69b-c0fb5ca8a31e" data-file-name="components/TCAnalyzerInterface.tsx">
                <div className="flex items-center" data-unique-id="41b520a8-10b8-4b34-9994-c5912289dab3" data-file-name="components/TCAnalyzerInterface.tsx">
                  <AlertCircle className="h-4 w-4 mr-1.5 text-red-500" />
                  <span data-unique-id="ce28a9e0-efa4-4ce7-8e82-35bc1cdc11a0" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="414444b2-48d4-420b-96c7-d1bbcc72ec13" data-file-name="components/TCAnalyzerInterface.tsx">Harmful Points</span></span>
                </div>
                <div className="flex items-center" data-unique-id="6dcd4d8a-7420-4a19-8b76-4ef040c9731b" data-file-name="components/TCAnalyzerInterface.tsx">
                  <CheckCircle className="h-4 w-4 mr-1.5 text-emerald-500" />
                  <span data-unique-id="4569e1d4-ee0c-4b54-981b-7f89c927dfd4" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="66dcaec4-9001-469b-b5f1-13bae84909dd" data-file-name="components/TCAnalyzerInterface.tsx">Beneficial Points</span></span>
                </div>
                <div className="flex items-center" data-unique-id="a02d34e9-5e05-412f-a001-868752e53930" data-file-name="components/TCAnalyzerInterface.tsx">
                  <Info className="h-4 w-4 mr-1.5 text-amber-500" />
                  <span data-unique-id="718893a8-9088-4efd-ae76-996c2ce349db" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="d8952c5c-2fa6-4c46-a2b1-6dca1d851a56" data-file-name="components/TCAnalyzerInterface.tsx">Things to Be Aware Of</span></span>
                </div>
              </div>
            </div>
          </div>
          {isCompareMode ? <DocumentCompare /> : <>
              {/* Tab Selection */}
              <div className="flex flex-wrap border-b border-blue-100 bg-white sticky top-0 z-10" data-unique-id="1cd37b41-9aac-4946-a346-6f17c89d4958" data-file-name="components/TCAnalyzerInterface.tsx">
                <TabButton isActive={activeTab === 'input'} onClick={() => setActiveTab('input')} disabled={isAnalyzing} label="Input Document" />
                <TabButton isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={isAnalyzing || analysisPoints.length === 0} label="Analysis" />
                <TabButton isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={isAnalyzing || !summary?.points?.length} label="Summary" />
                <TabButton isActive={activeTab === 'ai-insights'} onClick={() => setActiveTab('ai-insights')} disabled={isAnalyzing || !aiInsights} label="AI Insights" />
              </div>
              
              {/* Content Area */}
              <div className="p-4 md:p-6 min-h-[calc(100vh-48px)]" data-unique-id="16211f98-bf56-4cb8-bd94-faafe52c003a" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                {error && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-center border border-red-200 shadow-sm" data-unique-id="b27df5df-4bb0-4724-a6db-c8e07867ecdb" data-file-name="components/TCAnalyzerInterface.tsx">
                    <AlertCircle className="mr-3 h-5 w-5" />
                    <span className="font-medium" data-unique-id="4a9095ee-b85e-470d-b705-1a9c4ab8dcae" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">{error}</span>
                  </motion.div>}
                
                {isAnalyzing && <div className="py-16 flex flex-col items-center justify-center" data-unique-id="c1bbec34-e478-4d78-8279-68bd170f95a5" data-file-name="components/TCAnalyzerInterface.tsx">
                    <AnalysisAnimation />
                    <p className="mt-6 text-slate-600 text-lg" data-unique-id="4027d92e-1248-4f4a-8a30-6a362eabf37e" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="d3702565-f4ff-4a8a-b050-b30bb616de48" data-file-name="components/TCAnalyzerInterface.tsx">Analyzing your document...</span></p>
                  </div>}
                
                {!isAnalyzing && <>
                    {activeTab === 'input' && <div data-unique-id="6e61be98-15b7-456a-b4a3-8129debd2b6c" data-file-name="components/TCAnalyzerInterface.tsx">
                        <InputSelector />
                        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between gap-4" data-unique-id="b1dcd154-b959-44df-8fbd-ae4c0e3a83e6" data-file-name="components/TCAnalyzerInterface.tsx">
                          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto" data-unique-id="81e3eda2-44c8-4e82-bc9b-82c1a0d57e89" data-file-name="components/TCAnalyzerInterface.tsx">
                            <input type="text" value={documentName} onChange={e => setDocumentName(e.target.value)} placeholder="Document name (required to save)" className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-md md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500" data-unique-id="73037b14-f5f1-4017-b297-2fa5fb58cd00" data-file-name="components/TCAnalyzerInterface.tsx" />
                            <motion.button onClick={handleSaveDocument} disabled={!documentName.trim() || !content || isSaving} whileHover={documentName.trim() && content ? {
                      scale: 1.03
                    } : {}} whileTap={documentName.trim() && content ? {
                      scale: 0.97
                    } : {}} className={`flex items-center w-full md:w-auto mt-2 md:mt-0 px-4 py-2 md:rounded-l-none rounded-md font-medium transition-all justify-center ${documentName.trim() && content && !isSaving ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="1b592d03-06e3-4e33-bf5a-7312df1685ad" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
                              <Save className="h-4 w-4 mr-2" />
                              {isSaving ? 'Saving...' : 'Save Document'}
                            </motion.button>
                          </div>
                          
                          <motion.button onClick={handleAnalyze} disabled={!content} whileHover={content ? {
                    scale: 1.03
                  } : {}} whileTap={content ? {
                    scale: 0.97
                  } : {}} className={`w-full md:w-auto px-6 md:px-8 py-2 md:py-3 rounded-md font-medium transition-all shadow-md ${content ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} data-unique-id="755c85b0-0b2c-482f-8978-8c93b27b5957" data-file-name="components/TCAnalyzerInterface.tsx"><span className="editable-text" data-unique-id="61f6dd0a-09c1-47e9-a06a-55e4fb38b603" data-file-name="components/TCAnalyzerInterface.tsx">
                            Analyze Document
                          </span></motion.button>
                        </div>
                      </div>}
                    {activeTab === 'results' && <AnalysisResults />}
                    {activeTab === 'summary' && <Summary />}
                    {activeTab === 'ai-insights' && <AIInsights />}
                  </>}
              </div>
            </>}
        </div>
      </div>
    </div>;
}
function TabButton({
  isActive,
  onClick,
  disabled,
  label
}: {
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return <button onClick={onClick} disabled={disabled} className={`px-4 md:px-8 py-3 md:py-4 font-medium transition-all relative flex-1 md:flex-none text-center ${isActive ? 'text-blue-700' : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-blue-600'}`} data-unique-id="023bc563-6719-429d-9873-73ee2a8c7c26" data-file-name="components/TCAnalyzerInterface.tsx" data-dynamic-text="true">
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" initial={false} data-unique-id="c625d56d-7f8d-4fd6-95e0-b0eebeb90ff8" data-file-name="components/TCAnalyzerInterface.tsx" />}
    </button>;
}