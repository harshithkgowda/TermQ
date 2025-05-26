'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnalyzerStore, Document } from '@/store/useAnalyzerStore';
import { FileText, Plus, Trash2, CheckSquare, Square, ChevronRight, ChevronDown } from 'lucide-react';
export default function Sidebar() {
  const {
    documents,
    currentDocumentId,
    compareDocumentIds,
    isCompareMode,
    addDocument,
    setCurrentDocument,
    removeDocument,
    toggleCompareDocument,
    setCompareMode
  } = useAnalyzerStore();
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(true);
  const handleCreateDocument = () => {
    if (!newDocName.trim()) return;
    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      name: newDocName,
      content: '',
      file: null,
      imageUrl: null,
      analysisPoints: [],
      summary: {
        points: []
      },
      createdAt: new Date()
    };
    addDocument(newDocument);
    setNewDocName('');
    setIsCreatingNew(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateDocument();
    } else if (e.key === 'Escape') {
      setIsCreatingNew(false);
      setNewDocName('');
    }
  };
  return <div className="h-full w-64 bg-blue-50 border-r border-blue-200 flex flex-col" data-unique-id="e7a2d024-0e6a-4b64-b096-8ef714bf61cb" data-file-name="components/ui/Sidebar.tsx">
      <div className="p-4 flex items-center justify-center border-b border-blue-200" data-unique-id="5d82c3a5-3a3d-44d4-bd37-b1714488e148" data-file-name="components/ui/Sidebar.tsx">
        <h1 className="text-xl font-medium text-blue-700" data-unique-id="47780897-e05b-43de-8d9f-1128476db5a5" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="4ead14d5-bdf6-4635-bf40-b07767aab52a" data-file-name="components/ui/Sidebar.tsx">Docbox AI</span></h1>
      </div>

      <div className="flex-1 overflow-auto" data-unique-id="54759aaa-26a0-4b59-8e2a-09655f5963d1" data-file-name="components/ui/Sidebar.tsx">
        <div className="p-4" data-unique-id="e17d0e5f-d26c-4345-abe3-795eb4a96f6a" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsDocumentsOpen(!isDocumentsOpen)} data-unique-id="c99adcd8-3f3f-4997-8be7-e27cd43a4386" data-file-name="components/ui/Sidebar.tsx">
            <div className="flex items-center" data-unique-id="19bb8e80-86c2-47af-ba03-44d37b8e475a" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
              {isDocumentsOpen ? <ChevronDown className="h-4 w-4 text-blue-600 mr-2" /> : <ChevronRight className="h-4 w-4 text-blue-600 mr-2" />}
              <h2 className="font-medium text-blue-800" data-unique-id="259abc15-919e-4657-b212-03e468603ad0" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="e8302761-b17e-47e6-9921-5a551cbb5643" data-file-name="components/ui/Sidebar.tsx">Documents</span></h2>
            </div>
          </div>
          
          {isDocumentsOpen && <div className="space-y-2" data-unique-id="579d32b5-e211-4b9c-bfe8-4e614238d025" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
              <button onClick={() => setIsCreatingNew(true)} className="w-full flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium mb-2" data-unique-id="a71dec8e-ce7a-47ec-aa2b-d34f0c6edd26" data-file-name="components/ui/Sidebar.tsx">
                <Plus className="h-4 w-4 mr-1.5" /><span className="editable-text" data-unique-id="05d7455d-f66b-4cae-af5d-31face115763" data-file-name="components/ui/Sidebar.tsx">
                New Document
              </span></button>
              
              {isCreatingNew && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} className="bg-blue-100 p-2 rounded-md border border-blue-300 mb-2" data-unique-id="da283ef0-5b1f-4727-9269-f7f2739a2456" data-file-name="components/ui/Sidebar.tsx">
                  <input type="text" value={newDocName} onChange={e => setNewDocName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Document name..." className="w-full px-2 py-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" autoFocus data-unique-id="c92d8e6d-9035-456d-a7dc-1d3bebe80459" data-file-name="components/ui/Sidebar.tsx" />
                  <div className="flex space-x-2 mt-2" data-unique-id="8a3e23fe-62a5-46e6-a01b-5d5846f7a81c" data-file-name="components/ui/Sidebar.tsx">
                    <button onClick={handleCreateDocument} className="flex-1 px-2 py-1 bg-blue-600 text-white rounded-md text-sm" data-unique-id="eee3252f-1ef3-4ee7-b061-35303e2177b3" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="35c06e28-882d-4698-95aa-92d36179bcfa" data-file-name="components/ui/Sidebar.tsx">
                      Create
                    </span></button>
                    <button onClick={() => {
                setIsCreatingNew(false);
                setNewDocName('');
              }} className="flex-1 px-2 py-1 bg-slate-200 text-slate-700 rounded-md text-sm" data-unique-id="5bcc66b0-a374-4214-99e0-3d68fa9a80e1" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="89aac596-10a3-41a1-94a5-d10e449fab45" data-file-name="components/ui/Sidebar.tsx">
                      Cancel
                    </span></button>
                  </div>
                </motion.div>}
              
              {documents.length === 0 ? <div className="text-center py-4 bg-white rounded-lg border border-blue-200" data-unique-id="d396f39f-1e05-422b-8f02-e96acde27496" data-file-name="components/ui/Sidebar.tsx">
                  <p className="text-slate-600 text-sm" data-unique-id="92816ef5-1331-4387-8ad1-eae2e86e57db" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="7f1661d6-6eca-4e7f-a188-d074bc41a699" data-file-name="components/ui/Sidebar.tsx">No documents yet.</span></p>
                </div> : <div className="space-y-1" data-unique-id="93334e63-f79f-461b-b730-cf44f5099112" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
                  {documents.map(doc => <DocumentItem key={doc.id} document={doc} isActive={doc.id === currentDocumentId} isSelected={compareDocumentIds.includes(doc.id)} isCompareMode={isCompareMode} onSelect={() => setCurrentDocument(doc.id)} onDelete={() => removeDocument(doc.id)} onToggleCompare={() => toggleCompareDocument(doc.id)} />)}
                </div>}
            </div>}
        </div>
      </div>
      
      <div className="p-4 border-t border-blue-200" data-unique-id="7707f99f-8c85-4a29-800c-650dd64af3cd" data-file-name="components/ui/Sidebar.tsx">
        <button onClick={() => setCompareMode(!isCompareMode)} className={`w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium ${isCompareMode ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`} data-unique-id="a0ff8259-9a4b-4931-b35d-60c5b0457295" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
          {isCompareMode ? 'Exit Compare Mode' : 'Compare Documents'}
        </button>
      </div>
    </div>;
}
function DocumentItem({
  document,
  isActive,
  isSelected,
  isCompareMode,
  onSelect,
  onDelete,
  onToggleCompare
}: {
  document: Document;
  isActive: boolean;
  isSelected: boolean;
  isCompareMode: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onToggleCompare: () => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };
  return <motion.div whileHover={{
    scale: 1.01
  }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)} onClick={isCompareMode ? onToggleCompare : onSelect} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${isActive && !isCompareMode ? 'bg-blue-100 border border-blue-300' : isSelected && isCompareMode ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-slate-200 hover:border-blue-200'}`} data-unique-id="dc35bb82-6946-44ca-b51b-f13fef046a54" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
      <div className="flex items-center overflow-hidden" data-unique-id="aad795eb-7c74-4df4-93ba-d8eb0bfce64a" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
        {isCompareMode ? isSelected ? <CheckSquare className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" /> : <FileText className={`h-4 w-4 mr-2 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
        <div className="overflow-hidden" data-unique-id="e90680d4-a57e-4ff6-bf2d-7df60efad6ed" data-file-name="components/ui/Sidebar.tsx">
          <p className={`text-sm font-medium truncate ${isActive && !isCompareMode ? 'text-blue-800' : isSelected && isCompareMode ? 'text-blue-800' : 'text-slate-700'}`} data-unique-id="c7282ef1-62f3-4039-9cc5-bb428bb62f86" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
            {document.name}
          </p>
        </div>
      </div>
      
      {(isHovering || isActive) && !isCompareMode && <div className="flex-shrink-0" data-unique-id="0dfd908f-5c76-41af-a4aa-6556c945aced" data-file-name="components/ui/Sidebar.tsx">
          <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50" data-unique-id="fd843d52-8caf-4a02-9e45-a2646f0b998a" data-file-name="components/ui/Sidebar.tsx">
            <Trash2 className="h-3 w-3" />
          </motion.button>
        </div>}
    </motion.div>;
}