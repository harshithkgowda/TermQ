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
  return <div className="h-full w-64 bg-gradient-to-b from-indigo-50 to-cyan-50 border-r border-indigo-200 flex flex-col" data-unique-id="7aaff61c-298f-4d89-924f-09d3b94a9574" data-file-name="components/ui/Sidebar.tsx">
      <div className="p-4 flex items-center justify-center border-b border-indigo-200 bg-gradient-to-r from-indigo-50 to-teal-50" data-unique-id="49d1f064-a991-458a-8595-fcb1becefc1f" data-file-name="components/ui/Sidebar.tsx">
        <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent" data-unique-id="b1697cef-8621-44d6-bb81-792653e1bf09" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="960ad757-381b-409a-a866-b4081450ea8b" data-file-name="components/ui/Sidebar.tsx">
          TermQ
        </span></h1>
      </div>

      <div className="flex-1 overflow-auto" data-unique-id="9db88c53-14d8-4fa6-9418-a2f35a5f7868" data-file-name="components/ui/Sidebar.tsx">
        <div className="p-4" data-unique-id="38b52200-81c5-40b6-943d-47403dca1792" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsDocumentsOpen(!isDocumentsOpen)} data-unique-id="dc840a4b-d365-4eeb-bbc7-59e34afdb178" data-file-name="components/ui/Sidebar.tsx">
            <div className="flex items-center" data-unique-id="371594bb-d2ee-4257-9ba5-79e76bc2f3a1" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
              {isDocumentsOpen ? <ChevronDown className="h-4 w-4 text-blue-600 mr-2" /> : <ChevronRight className="h-4 w-4 text-blue-600 mr-2" />}
              <h2 className="font-medium text-blue-800" data-unique-id="319f0614-6499-475c-9770-ef1e2e811a88" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="7becc0f4-ed97-434d-b975-2288d808f46d" data-file-name="components/ui/Sidebar.tsx">Documents</span></h2>
            </div>
          </div>
          
          {isDocumentsOpen && <div className="space-y-2" data-unique-id="94e7291c-9cb4-4f20-b5f8-049e98317a9d" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
              <button onClick={() => setIsCreatingNew(true)} className="w-full flex items-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-md text-sm font-medium mb-2" data-unique-id="3cf783d2-1092-4858-9bf9-7ce7692b7ed5" data-file-name="components/ui/Sidebar.tsx">
                <Plus className="h-4 w-4 mr-1.5" /><span className="editable-text" data-unique-id="75eb0520-789c-4c92-a37d-5f8d3755cb7d" data-file-name="components/ui/Sidebar.tsx">
                New Document
              </span></button>
              
              {isCreatingNew && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} className="bg-blue-100 p-2 rounded-md border border-blue-300 mb-2" data-unique-id="4ae5d0a8-32ca-43cf-b96b-ffb66d3a8a02" data-file-name="components/ui/Sidebar.tsx">
                  <input type="text" value={newDocName} onChange={e => setNewDocName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Document name..." className="w-full px-2 py-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" autoFocus data-unique-id="a45fe70d-357a-4633-b66a-e75b769250db" data-file-name="components/ui/Sidebar.tsx" />
                  <div className="flex space-x-2 mt-2" data-unique-id="ebb2395a-dcde-4f4a-8b16-2d0bdb6065c2" data-file-name="components/ui/Sidebar.tsx">
                    <button onClick={handleCreateDocument} className="flex-1 px-2 py-1 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-md text-sm" data-unique-id="f7d9d233-6744-4fe7-b60e-3112e9c9c415" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="7aa6a5c6-6df7-493e-a59a-5140e2ed05a5" data-file-name="components/ui/Sidebar.tsx">
                      Create
                    </span></button>
                    <button onClick={() => {
                setIsCreatingNew(false);
                setNewDocName('');
              }} className="flex-1 px-2 py-1 bg-slate-200 hover:bg-slate-300 transition-colors text-slate-700 rounded-md text-sm" data-unique-id="a2b642ff-3b47-48ae-a232-7c52c7c54f39" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="0288fb97-d212-4092-928f-78a1642f7317" data-file-name="components/ui/Sidebar.tsx">
                      Cancel
                    </span></button>
                  </div>
                </motion.div>}
              
              {documents.length === 0 ? <div className="text-center py-4 bg-white rounded-lg border border-blue-200" data-unique-id="d92c1d77-27f0-439a-8579-bf467b67e6a1" data-file-name="components/ui/Sidebar.tsx">
                  <p className="text-slate-600 text-sm" data-unique-id="e18a4119-13c1-4361-bd68-dab03595fbbf" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="86e81807-40b8-46a8-8838-8f37cd4f0bda" data-file-name="components/ui/Sidebar.tsx">No documents yet.</span></p>
                </div> : <div className="space-y-1" data-unique-id="35cfd2b6-8148-42bd-b0f3-21c336515cd2" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
                  {documents.map(doc => <DocumentItem key={doc.id} document={doc} isActive={doc.id === currentDocumentId} isSelected={compareDocumentIds.includes(doc.id)} isCompareMode={isCompareMode} onSelect={() => setCurrentDocument(doc.id)} onDelete={() => removeDocument(doc.id)} onToggleCompare={() => toggleCompareDocument(doc.id)} />)}
                </div>}
            </div>}
        </div>
      </div>
      
      <div className="p-4 border-t border-blue-200" data-unique-id="5a89906a-80f3-4e51-a9ea-8ed20f596230" data-file-name="components/ui/Sidebar.tsx">
        <button onClick={() => setCompareMode(!isCompareMode)} className={`w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all ${isCompareMode ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:shadow-sm'}`} data-unique-id="7a4ccbcc-478d-43da-bd0e-2d598c689b4d" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
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
  }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)} onClick={isCompareMode ? onToggleCompare : onSelect} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${isActive && !isCompareMode ? 'bg-blue-100 border border-blue-300' : isSelected && isCompareMode ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-slate-200 hover:border-blue-200'}`} data-unique-id="567167d8-2389-4e7d-b410-7f1f3ed41e41" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
      <div className="flex items-center overflow-hidden" data-unique-id="e32a4dc1-7577-4644-aa9b-303ecd4f588a" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
        {isCompareMode ? isSelected ? <CheckSquare className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" /> : <FileText className={`h-4 w-4 mr-2 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
        <div className="overflow-hidden" data-unique-id="2bb419c4-ca1a-4873-8082-d61d2896663a" data-file-name="components/ui/Sidebar.tsx">
          <p className={`text-sm font-medium truncate ${isActive && !isCompareMode ? 'text-blue-800' : isSelected && isCompareMode ? 'text-blue-800' : 'text-slate-700'}`} data-unique-id="7e6d1672-85a8-4c57-a5b3-6e155d0ba115" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
            {document.name}
          </p>
        </div>
      </div>
      
      {(isHovering || isActive) && !isCompareMode && <div className="flex-shrink-0" data-unique-id="445cfae1-476b-4c3e-928b-2ffdd23e3c9d" data-file-name="components/ui/Sidebar.tsx">
          <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50" data-unique-id="26e31e68-9e32-44d4-ae7b-4c99681276de" data-file-name="components/ui/Sidebar.tsx">
            <Trash2 className="h-3 w-3" />
          </motion.button>
        </div>}
    </motion.div>;
}