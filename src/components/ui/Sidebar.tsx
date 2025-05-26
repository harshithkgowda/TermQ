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
  return <div className="h-full w-64 bg-blue-50 border-r border-blue-200 flex flex-col" data-unique-id="0609f466-5769-4f6b-9a93-605db7ba973e" data-file-name="components/ui/Sidebar.tsx">
      <div className="p-4 flex items-center justify-center border-b border-blue-200" data-unique-id="9c6bd846-8d38-427f-8ecc-4c1b8d82ef28" data-file-name="components/ui/Sidebar.tsx">
        <h1 className="text-xl font-medium text-blue-700" data-unique-id="1c2a9383-15f2-4663-a018-54f069a518a2" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="72562ebd-6ddd-4cf0-81fe-96e0f3f298b6" data-file-name="components/ui/Sidebar.tsx">Docbox AI</span></h1>
      </div>

      <div className="flex-1 overflow-auto" data-unique-id="2488ae47-2f0f-4a38-9c50-dfa6e086c5bb" data-file-name="components/ui/Sidebar.tsx">
        <div className="p-4" data-unique-id="cc3e9885-95ce-4961-a77c-47043bab6ff7" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsDocumentsOpen(!isDocumentsOpen)} data-unique-id="1cccca77-8f2e-44bd-ad14-d9da816a4e0b" data-file-name="components/ui/Sidebar.tsx">
            <div className="flex items-center" data-unique-id="fb4b9e4e-a198-45f2-8eeb-898a5afecb2b" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
              {isDocumentsOpen ? <ChevronDown className="h-4 w-4 text-blue-600 mr-2" /> : <ChevronRight className="h-4 w-4 text-blue-600 mr-2" />}
              <h2 className="font-medium text-blue-800" data-unique-id="f0b1a76b-6b8c-4cab-b84f-bc92721d710c" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="117ce6e9-1f4d-42b7-beac-a46898390db3" data-file-name="components/ui/Sidebar.tsx">Documents</span></h2>
            </div>
          </div>
          
          {isDocumentsOpen && <div className="space-y-2" data-unique-id="5d87c8f6-e9e1-4343-b988-0d06e9227fb4" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
              <button onClick={() => setIsCreatingNew(true)} className="w-full flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium mb-2" data-unique-id="05261132-126e-4a71-8be2-458a8e2bbc2f" data-file-name="components/ui/Sidebar.tsx">
                <Plus className="h-4 w-4 mr-1.5" /><span className="editable-text" data-unique-id="c60446d4-9ce5-473b-84c8-1d41dc7c3131" data-file-name="components/ui/Sidebar.tsx">
                New Document
              </span></button>
              
              {isCreatingNew && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} className="bg-blue-100 p-2 rounded-md border border-blue-300 mb-2" data-unique-id="50810918-9c0f-40df-9a57-24f3d8ce8b7a" data-file-name="components/ui/Sidebar.tsx">
                  <input type="text" value={newDocName} onChange={e => setNewDocName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Document name..." className="w-full px-2 py-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" autoFocus data-unique-id="e0dee982-b195-48ab-879a-69c3a866a315" data-file-name="components/ui/Sidebar.tsx" />
                  <div className="flex space-x-2 mt-2" data-unique-id="7e96810e-fc58-4dbb-be28-337d57356788" data-file-name="components/ui/Sidebar.tsx">
                    <button onClick={handleCreateDocument} className="flex-1 px-2 py-1 bg-blue-600 text-white rounded-md text-sm" data-unique-id="694859ae-55e2-4314-b758-d53153da9556" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="6c32d327-fd8d-4d1e-b04d-04c2b2be716c" data-file-name="components/ui/Sidebar.tsx">
                      Create
                    </span></button>
                    <button onClick={() => {
                setIsCreatingNew(false);
                setNewDocName('');
              }} className="flex-1 px-2 py-1 bg-slate-200 text-slate-700 rounded-md text-sm" data-unique-id="f7ecafce-5d64-4361-a2d9-fd9711299239" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="9ff4ad79-5178-40f0-9842-6e4e56c9c55d" data-file-name="components/ui/Sidebar.tsx">
                      Cancel
                    </span></button>
                  </div>
                </motion.div>}
              
              {documents.length === 0 ? <div className="text-center py-4 bg-white rounded-lg border border-blue-200" data-unique-id="5b668427-7ce3-4ba7-ad7d-022ea35d5bd0" data-file-name="components/ui/Sidebar.tsx">
                  <p className="text-slate-600 text-sm" data-unique-id="0c6f7c3e-479e-4232-b2a0-b46407ba275a" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="08a460d4-ea3c-4d12-a6af-e4942ff16109" data-file-name="components/ui/Sidebar.tsx">No documents yet.</span></p>
                </div> : <div className="space-y-1" data-unique-id="15f19df0-d578-4659-94a4-eba27507bc7c" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
                  {documents.map(doc => <DocumentItem key={doc.id} document={doc} isActive={doc.id === currentDocumentId} isSelected={compareDocumentIds.includes(doc.id)} isCompareMode={isCompareMode} onSelect={() => setCurrentDocument(doc.id)} onDelete={() => removeDocument(doc.id)} onToggleCompare={() => toggleCompareDocument(doc.id)} />)}
                </div>}
            </div>}
        </div>
      </div>
      
      <div className="p-4 border-t border-blue-200" data-unique-id="5a75a4dc-f40e-4d3b-ad70-df901ebbeed4" data-file-name="components/ui/Sidebar.tsx">
        <button onClick={() => setCompareMode(!isCompareMode)} className={`w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium ${isCompareMode ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`} data-unique-id="03964039-f33c-4ed7-a4d8-63af8c3dd29a" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
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
  }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)} onClick={isCompareMode ? onToggleCompare : onSelect} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${isActive && !isCompareMode ? 'bg-blue-100 border border-blue-300' : isSelected && isCompareMode ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-slate-200 hover:border-blue-200'}`} data-unique-id="79ee496e-639a-4655-901d-3821d0b3ec39" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
      <div className="flex items-center overflow-hidden" data-unique-id="b91fd38f-ff23-49e5-a24d-8e46e578b33f" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
        {isCompareMode ? isSelected ? <CheckSquare className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" /> : <FileText className={`h-4 w-4 mr-2 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
        <div className="overflow-hidden" data-unique-id="c00681c5-5215-417d-b567-44dff8ab5885" data-file-name="components/ui/Sidebar.tsx">
          <p className={`text-sm font-medium truncate ${isActive && !isCompareMode ? 'text-blue-800' : isSelected && isCompareMode ? 'text-blue-800' : 'text-slate-700'}`} data-unique-id="b481261b-c1c4-4e04-bb97-db97ac406304" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
            {document.name}
          </p>
        </div>
      </div>
      
      {(isHovering || isActive) && !isCompareMode && <div className="flex-shrink-0" data-unique-id="622014d3-0b13-44a9-90cd-0763d59a1ee6" data-file-name="components/ui/Sidebar.tsx">
          <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50" data-unique-id="61746339-49e1-447c-a7a0-20fb4742b43e" data-file-name="components/ui/Sidebar.tsx">
            <Trash2 className="h-3 w-3" />
          </motion.button>
        </div>}
    </motion.div>;
}