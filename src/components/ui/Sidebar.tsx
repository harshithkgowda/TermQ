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
  return <div className="h-full w-64 bg-blue-50 border-r border-blue-200 flex flex-col" data-unique-id="bab7b444-1b73-4d96-af77-ed7ea7e7a975" data-file-name="components/ui/Sidebar.tsx">
      <div className="p-4 flex items-center justify-center border-b border-blue-200" data-unique-id="55347574-c981-4eb9-8a40-062c65cb2d3c" data-file-name="components/ui/Sidebar.tsx">
        <h1 className="text-xl font-medium text-blue-700" data-unique-id="5dd5396f-bf8d-40d9-a018-62f1b303a877" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="2430117d-8cb5-46e9-9295-b3372a40b8dc" data-file-name="components/ui/Sidebar.tsx">Docbox AI</span></h1>
      </div>

      <div className="flex-1 overflow-auto" data-unique-id="d99b9916-0398-48c9-949d-ed6215712af8" data-file-name="components/ui/Sidebar.tsx">
        <div className="p-4" data-unique-id="9581a0ac-4619-4b4e-ab17-4ac3e8fb0483" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsDocumentsOpen(!isDocumentsOpen)} data-unique-id="d5fe011e-54d5-48e6-ba69-ab240e1ca7d9" data-file-name="components/ui/Sidebar.tsx">
            <div className="flex items-center" data-unique-id="2339c4a9-f6ca-41b1-9911-c59842fa9589" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
              {isDocumentsOpen ? <ChevronDown className="h-4 w-4 text-blue-600 mr-2" /> : <ChevronRight className="h-4 w-4 text-blue-600 mr-2" />}
              <h2 className="font-medium text-blue-800" data-unique-id="5ff1acf6-e4aa-4e44-8833-d342316d30fc" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="d80905e0-6f9f-445e-a48b-1db617d9b2bc" data-file-name="components/ui/Sidebar.tsx">Documents</span></h2>
            </div>
          </div>
          
          {isDocumentsOpen && <div className="space-y-2" data-unique-id="0e15bd61-5019-4d55-82b0-8f1c568d2c9d" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
              <button onClick={() => setIsCreatingNew(true)} className="w-full flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium mb-2" data-unique-id="23e0c2e7-3c29-40b9-b692-e4623e82c0f5" data-file-name="components/ui/Sidebar.tsx">
                <Plus className="h-4 w-4 mr-1.5" /><span className="editable-text" data-unique-id="78ba4dd4-7be3-4d0c-b701-93917959c1e6" data-file-name="components/ui/Sidebar.tsx">
                New Document
              </span></button>
              
              {isCreatingNew && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} className="bg-blue-100 p-2 rounded-md border border-blue-300 mb-2" data-unique-id="08f2f7b7-194d-44f3-9cc8-8904a3f49c48" data-file-name="components/ui/Sidebar.tsx">
                  <input type="text" value={newDocName} onChange={e => setNewDocName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Document name..." className="w-full px-2 py-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" autoFocus data-unique-id="18b6ef80-9de5-4694-82e3-45b0865945bb" data-file-name="components/ui/Sidebar.tsx" />
                  <div className="flex space-x-2 mt-2" data-unique-id="9fce6bea-d00e-46b7-9302-f41465894bf6" data-file-name="components/ui/Sidebar.tsx">
                    <button onClick={handleCreateDocument} className="flex-1 px-2 py-1 bg-blue-600 text-white rounded-md text-sm" data-unique-id="651cd62c-47ed-4b93-8e64-0096a91e727b" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="d0d1aace-48d0-441d-9580-f52380458ad3" data-file-name="components/ui/Sidebar.tsx">
                      Create
                    </span></button>
                    <button onClick={() => {
                setIsCreatingNew(false);
                setNewDocName('');
              }} className="flex-1 px-2 py-1 bg-slate-200 text-slate-700 rounded-md text-sm" data-unique-id="351320b9-a467-490d-aaa6-191bb46d844d" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="17e1a42e-9a8e-4a7a-9e81-900ef0816f05" data-file-name="components/ui/Sidebar.tsx">
                      Cancel
                    </span></button>
                  </div>
                </motion.div>}
              
              {documents.length === 0 ? <div className="text-center py-4 bg-white rounded-lg border border-blue-200" data-unique-id="d7cc4cbc-0bc8-4de1-8b1d-47d26d53e8c2" data-file-name="components/ui/Sidebar.tsx">
                  <p className="text-slate-600 text-sm" data-unique-id="5651ef6b-a82b-46f1-ba8a-4fd8ccb4a29e" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="e1bbbf48-f640-4db8-bafa-77dfb3e0be79" data-file-name="components/ui/Sidebar.tsx">No documents yet.</span></p>
                </div> : <div className="space-y-1" data-unique-id="bb29d940-d9c2-43ff-9fd2-ba53473534da" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
                  {documents.map(doc => <DocumentItem key={doc.id} document={doc} isActive={doc.id === currentDocumentId} isSelected={compareDocumentIds.includes(doc.id)} isCompareMode={isCompareMode} onSelect={() => setCurrentDocument(doc.id)} onDelete={() => removeDocument(doc.id)} onToggleCompare={() => toggleCompareDocument(doc.id)} />)}
                </div>}
            </div>}
        </div>
      </div>
      
      <div className="p-4 border-t border-blue-200" data-unique-id="0e674898-f107-4b64-a612-1b07a74f1d0e" data-file-name="components/ui/Sidebar.tsx">
        <button onClick={() => setCompareMode(!isCompareMode)} className={`w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium ${isCompareMode ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`} data-unique-id="8ae2ffa4-4918-42e8-9967-2849555caeb7" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
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
  }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)} onClick={isCompareMode ? onToggleCompare : onSelect} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${isActive && !isCompareMode ? 'bg-blue-100 border border-blue-300' : isSelected && isCompareMode ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-slate-200 hover:border-blue-200'}`} data-unique-id="9bde71e7-c86f-4162-bec8-f641af4b5234" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
      <div className="flex items-center overflow-hidden" data-unique-id="932e441a-3924-4a43-a755-57846b4feddc" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
        {isCompareMode ? isSelected ? <CheckSquare className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" /> : <FileText className={`h-4 w-4 mr-2 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
        <div className="overflow-hidden" data-unique-id="1ca2c4ab-cbbc-4688-b537-6d32e6e58f0d" data-file-name="components/ui/Sidebar.tsx">
          <p className={`text-sm font-medium truncate ${isActive && !isCompareMode ? 'text-blue-800' : isSelected && isCompareMode ? 'text-blue-800' : 'text-slate-700'}`} data-unique-id="b09fa9e4-27e6-4132-9711-e933e5f14013" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
            {document.name}
          </p>
        </div>
      </div>
      
      {(isHovering || isActive) && !isCompareMode && <div className="flex-shrink-0" data-unique-id="70e207c5-77d3-473a-864e-0b98dd015fb6" data-file-name="components/ui/Sidebar.tsx">
          <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50" data-unique-id="1649b9d0-ee23-40b4-ad64-ba10f276cc94" data-file-name="components/ui/Sidebar.tsx">
            <Trash2 className="h-3 w-3" />
          </motion.button>
        </div>}
    </motion.div>;
}