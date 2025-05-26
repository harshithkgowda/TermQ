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
  return <div className="h-full w-64 bg-blue-50 border-r border-blue-200 flex flex-col" data-unique-id="f3479b77-b3fe-42ea-a552-01be87debe26" data-file-name="components/ui/Sidebar.tsx">
      <div className="p-4 flex items-center justify-center border-b border-blue-200" data-unique-id="2ec8cab2-963b-4428-a50e-536974812ba9" data-file-name="components/ui/Sidebar.tsx">
        <h1 className="text-xl font-medium text-blue-700" data-unique-id="5222e1fb-4375-4273-b1b2-a18318dfb6a7" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="f5c16c65-d289-455d-ad59-a1b15aa15383" data-file-name="components/ui/Sidebar.tsx">Docbox AI</span></h1>
      </div>

      <div className="flex-1 overflow-auto" data-unique-id="27c7413b-7941-4313-8da4-3fe81c0de2d8" data-file-name="components/ui/Sidebar.tsx">
        <div className="p-4" data-unique-id="0e29dc8a-8741-4868-8020-211083e2a598" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
          <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsDocumentsOpen(!isDocumentsOpen)} data-unique-id="aad4ec34-4839-4f80-8d70-9265eb3f9013" data-file-name="components/ui/Sidebar.tsx">
            <div className="flex items-center" data-unique-id="8a182f57-2ae6-4408-987d-4b7139bf8a1b" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
              {isDocumentsOpen ? <ChevronDown className="h-4 w-4 text-blue-600 mr-2" /> : <ChevronRight className="h-4 w-4 text-blue-600 mr-2" />}
              <h2 className="font-medium text-blue-800" data-unique-id="2dc72298-3086-4e8b-bf3e-0c4ef5cdcd51" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="f87b3492-90e7-4534-8717-bc39ea3d7806" data-file-name="components/ui/Sidebar.tsx">Documents</span></h2>
            </div>
          </div>
          
          {isDocumentsOpen && <div className="space-y-2" data-unique-id="5c19e777-ed24-4881-add2-43292a77a473" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
              <button onClick={() => setIsCreatingNew(true)} className="w-full flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium mb-2" data-unique-id="6642fc89-4c92-4576-a09e-0a6fa40afce1" data-file-name="components/ui/Sidebar.tsx">
                <Plus className="h-4 w-4 mr-1.5" /><span className="editable-text" data-unique-id="ee8923cb-0b48-468b-82af-45251df8a7e9" data-file-name="components/ui/Sidebar.tsx">
                New Document
              </span></button>
              
              {isCreatingNew && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} className="bg-blue-100 p-2 rounded-md border border-blue-300 mb-2" data-unique-id="b25d84fb-3eac-4e29-890f-ccc37dbb9f20" data-file-name="components/ui/Sidebar.tsx">
                  <input type="text" value={newDocName} onChange={e => setNewDocName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Document name..." className="w-full px-2 py-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" autoFocus data-unique-id="03ca4c46-29f0-4e9b-859c-16680d3331f5" data-file-name="components/ui/Sidebar.tsx" />
                  <div className="flex space-x-2 mt-2" data-unique-id="2b22902e-fe68-4bdf-8d2f-ccbe7abc7c13" data-file-name="components/ui/Sidebar.tsx">
                    <button onClick={handleCreateDocument} className="flex-1 px-2 py-1 bg-blue-600 text-white rounded-md text-sm" data-unique-id="f199eaf7-e223-4b25-a2d9-3e411ceaa8c6" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="2a497de3-c300-45f5-8be4-231dafec0daa" data-file-name="components/ui/Sidebar.tsx">
                      Create
                    </span></button>
                    <button onClick={() => {
                setIsCreatingNew(false);
                setNewDocName('');
              }} className="flex-1 px-2 py-1 bg-slate-200 text-slate-700 rounded-md text-sm" data-unique-id="6fd7b41a-43ba-4e13-95cd-ddca63be2843" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="586e0481-be63-44f7-901b-c906fab6c43f" data-file-name="components/ui/Sidebar.tsx">
                      Cancel
                    </span></button>
                  </div>
                </motion.div>}
              
              {documents.length === 0 ? <div className="text-center py-4 bg-white rounded-lg border border-blue-200" data-unique-id="c1e7ba8f-83a4-4eba-b939-722e1cba2bc2" data-file-name="components/ui/Sidebar.tsx">
                  <p className="text-slate-600 text-sm" data-unique-id="65adb1b2-ed42-4e13-8a1c-e14c385bfd8c" data-file-name="components/ui/Sidebar.tsx"><span className="editable-text" data-unique-id="bbf98357-ff81-47bd-b0f6-ab68f599e056" data-file-name="components/ui/Sidebar.tsx">No documents yet.</span></p>
                </div> : <div className="space-y-1" data-unique-id="6f51993e-50b3-4f70-9c3b-c40118b5c0c8" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
                  {documents.map(doc => <DocumentItem key={doc.id} document={doc} isActive={doc.id === currentDocumentId} isSelected={compareDocumentIds.includes(doc.id)} isCompareMode={isCompareMode} onSelect={() => setCurrentDocument(doc.id)} onDelete={() => removeDocument(doc.id)} onToggleCompare={() => toggleCompareDocument(doc.id)} />)}
                </div>}
            </div>}
        </div>
      </div>
      
      <div className="p-4 border-t border-blue-200" data-unique-id="f8db28a6-96d4-4b8f-b9cf-2ec1a00347fb" data-file-name="components/ui/Sidebar.tsx">
        <button onClick={() => setCompareMode(!isCompareMode)} className={`w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium ${isCompareMode ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`} data-unique-id="c2062a45-c83d-46fc-9c3f-d191b4ad40c0" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
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
  }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)} onClick={isCompareMode ? onToggleCompare : onSelect} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${isActive && !isCompareMode ? 'bg-blue-100 border border-blue-300' : isSelected && isCompareMode ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-slate-200 hover:border-blue-200'}`} data-unique-id="d7104426-f462-46e8-9442-a1653e4f0850" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
      <div className="flex items-center overflow-hidden" data-unique-id="58d3d87e-5412-432a-b914-da4b79dcff20" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
        {isCompareMode ? isSelected ? <CheckSquare className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" /> : <Square className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" /> : <FileText className={`h-4 w-4 mr-2 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
        <div className="overflow-hidden" data-unique-id="c9a960c6-cb63-4a21-ad31-fbffa5dbf87e" data-file-name="components/ui/Sidebar.tsx">
          <p className={`text-sm font-medium truncate ${isActive && !isCompareMode ? 'text-blue-800' : isSelected && isCompareMode ? 'text-blue-800' : 'text-slate-700'}`} data-unique-id="e7832afd-f322-4dbd-b658-2c49ef1fb2c3" data-file-name="components/ui/Sidebar.tsx" data-dynamic-text="true">
            {document.name}
          </p>
        </div>
      </div>
      
      {(isHovering || isActive) && !isCompareMode && <div className="flex-shrink-0" data-unique-id="ee5491a5-74cb-4360-a38a-73d077dc1bd6" data-file-name="components/ui/Sidebar.tsx">
          <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50" data-unique-id="ae1a24f2-ddfa-4885-ac0d-4c36bd56534f" data-file-name="components/ui/Sidebar.tsx">
            <Trash2 className="h-3 w-3" />
          </motion.button>
        </div>}
    </motion.div>;
}