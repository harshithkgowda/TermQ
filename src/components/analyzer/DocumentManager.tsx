'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnalyzerStore, Document } from '@/store/useAnalyzerStore';
import { FileText, Plus, Trash2, Copy, CheckSquare, Square, ArrowLeftRight, X } from 'lucide-react';
export default function DocumentManager() {
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
  return <div className="mb-4 md:mb-6 px-4 md:px-6 pt-4 md:pt-6" data-unique-id="b7a180a3-1fd0-492c-87bd-d9c65483286b" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3" data-unique-id="25d1ee65-6c18-417b-b827-2ef9ab75cb26" data-file-name="components/analyzer/DocumentManager.tsx">
        <h2 className="text-xl font-medium text-blue-800" data-unique-id="79c67886-232a-4949-9815-f1335dafc033" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="4997bb5a-e53c-4b21-ae0a-9e3da5557a06" data-file-name="components/analyzer/DocumentManager.tsx">Documents</span></h2>
        
        <div className="flex flex-wrap items-center gap-3" data-unique-id="bdd95884-d065-4946-b136-6ca153c84906" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setCompareMode(!isCompareMode)} className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${isCompareMode ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`} data-unique-id="78211401-e9fa-4f45-af35-951a199c74aa" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            <ArrowLeftRight className="h-4 w-4 mr-1.5" />
            {isCompareMode ? 'Exit Compare' : 'Compare Mode'}
          </motion.button>
          
          {!isCreatingNew && <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setIsCreatingNew(true)} className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium" data-unique-id="956537c8-5b7f-450c-9da3-ee424bf43000" data-file-name="components/analyzer/DocumentManager.tsx">
              <Plus className="h-4 w-4 mr-1.5" /><span className="editable-text" data-unique-id="91b2cd79-241d-49b1-8975-505f743033aa" data-file-name="components/analyzer/DocumentManager.tsx">
              New Document
            </span></motion.button>}
        </div>
      </div>
      
      {isCreatingNew && <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex items-center mb-4 bg-purple-50 p-2 rounded-md border border-purple-200" data-unique-id="0a3836cc-1c38-4d2d-bc6e-9af24425c025" data-file-name="components/analyzer/DocumentManager.tsx">
          <input type="text" value={newDocName} onChange={e => setNewDocName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Document name..." className="flex-1 px-3 py-1.5 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" autoFocus data-unique-id="30c9faa4-508c-4f63-a81d-0d10b2c2f7b3" data-file-name="components/analyzer/DocumentManager.tsx" />
          <div className="flex space-x-2 ml-2" data-unique-id="7b8bc86e-8550-4b6d-9eab-0ccddc7a2acd" data-file-name="components/analyzer/DocumentManager.tsx">
            <button onClick={handleCreateDocument} className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm" data-unique-id="c779f4ef-cf92-4c10-8fbb-d92a8cc8a571" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="7fd875e4-ff25-4cb6-b20b-734da01f0ff7" data-file-name="components/analyzer/DocumentManager.tsx">
              Create
            </span></button>
            <button onClick={() => {
          setIsCreatingNew(false);
          setNewDocName('');
        }} className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-md text-sm" data-unique-id="4f60bf88-f09f-4360-a091-95901f5ee32f" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="ebc9b69b-048b-49a8-8a0f-b8788eff6962" data-file-name="components/analyzer/DocumentManager.tsx">
              Cancel
            </span></button>
          </div>
        </motion.div>}
      
      {documents.length === 0 ? <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="1d5ad6d0-61e4-48dd-831c-9563abeecffc" data-file-name="components/analyzer/DocumentManager.tsx">
          <FileText className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600" data-unique-id="b0a74dff-4cee-4041-8fd6-0f2bff5d85f1" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="f177a7dc-301d-4f27-a1ef-b5115a05999b" data-file-name="components/analyzer/DocumentManager.tsx">No documents yet. Create your first document to get started.</span></p>
        </div> : <div className="grid grid-cols-1 gap-2" data-unique-id="f9971fdc-dad9-4c57-8283-08f3e5f50f80" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          {documents.map(doc => <DocumentItem key={doc.id} document={doc} isActive={doc.id === currentDocumentId} isSelected={compareDocumentIds.includes(doc.id)} isCompareMode={isCompareMode} onSelect={() => setCurrentDocument(doc.id)} onDelete={() => removeDocument(doc.id)} onToggleCompare={() => toggleCompareDocument(doc.id)} />)}
        </div>}
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
  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCompare();
  };
  return <motion.div whileHover={{
    scale: 1.01
  }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)} onClick={isCompareMode ? onToggleCompare : onSelect} className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${isActive && !isCompareMode ? 'bg-blue-100 border-blue-300' : isSelected && isCompareMode ? 'bg-blue-100 border-blue-300' : 'bg-white border-slate-200 hover:border-blue-200'}`} data-unique-id="783d4248-6a8f-417b-8732-44f520df8b67" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
      <div className="flex items-center overflow-hidden" data-unique-id="e9336ece-208c-4969-9859-713ec97c18bc" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
        {isCompareMode ? isSelected ? <CheckSquare className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" /> : <Square className="h-5 w-5 text-slate-400 mr-2 flex-shrink-0" /> : <FileText className={`h-5 w-5 mr-2 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
        <div className="overflow-hidden" data-unique-id="5b6f6d2a-41ae-49f0-8d99-5a0a22b39263" data-file-name="components/analyzer/DocumentManager.tsx">
          <p className={`font-medium truncate ${isActive && !isCompareMode ? 'text-blue-800' : isSelected && isCompareMode ? 'text-blue-800' : 'text-slate-700'}`} data-unique-id="6c97182e-a258-41dc-9efa-d5554d990705" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            {document.name}
          </p>
          <p className="text-xs text-slate-500 truncate" data-unique-id="0620c3b8-a251-40a4-a6d3-9baec44ee743" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            {new Date(document.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="58774f10-3165-4054-a13e-9bc006579422" data-file-name="components/analyzer/DocumentManager.tsx"> • 
            </span>{document.analysisPoints.length}<span className="editable-text" data-unique-id="0564a900-a0b0-421c-b44d-cd88823fc655" data-file-name="components/analyzer/DocumentManager.tsx"> points
          </span></p>
        </div>
      </div>
      
      {(isHovering || isActive || isSelected) && <div className="flex space-x-1 flex-shrink-0 ml-2" data-unique-id="933c361f-a46a-4b0e-8050-c83cbb926f27" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          {!isCompareMode && <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50" data-unique-id="c4c4149f-e6b3-473c-8869-a79fd2fa87bb" data-file-name="components/analyzer/DocumentManager.tsx">
              <Trash2 className="h-4 w-4" />
            </motion.button>}
        </div>}
    </motion.div>;
}