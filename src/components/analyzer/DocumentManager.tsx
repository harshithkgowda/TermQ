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
  return <div className="mb-4 md:mb-6 px-4 md:px-6 pt-4 md:pt-6" data-unique-id="b9bdac2c-fd7d-454c-bec2-6dab9e00cd07" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3" data-unique-id="204b8253-69aa-4ce5-b416-0644dfbfe06e" data-file-name="components/analyzer/DocumentManager.tsx">
        <h2 className="text-xl font-medium text-blue-800" data-unique-id="8b4d3b1f-dbbb-427f-bf2f-afac91b54ed7" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="a24b5923-31d5-4dd2-b619-a84bbbb62599" data-file-name="components/analyzer/DocumentManager.tsx">Documents</span></h2>
        
        <div className="flex flex-wrap items-center gap-3" data-unique-id="ff54844d-15d4-4122-9941-6860e938efd3" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setCompareMode(!isCompareMode)} className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${isCompareMode ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`} data-unique-id="1a240e00-7972-4665-af75-b52cefe15177" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            <ArrowLeftRight className="h-4 w-4 mr-1.5" />
            {isCompareMode ? 'Exit Compare' : 'Compare Mode'}
          </motion.button>
          
          {!isCreatingNew && <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setIsCreatingNew(true)} className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium" data-unique-id="45ec81d6-c3d2-41f1-9eca-a03600122a68" data-file-name="components/analyzer/DocumentManager.tsx">
              <Plus className="h-4 w-4 mr-1.5" /><span className="editable-text" data-unique-id="271a6e83-122f-4de9-8be8-968a761ce67f" data-file-name="components/analyzer/DocumentManager.tsx">
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
    }} className="flex items-center mb-4 bg-purple-50 p-2 rounded-md border border-purple-200" data-unique-id="7da2cf16-368a-4315-8dac-d6e2f2548f59" data-file-name="components/analyzer/DocumentManager.tsx">
          <input type="text" value={newDocName} onChange={e => setNewDocName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Document name..." className="flex-1 px-3 py-1.5 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" autoFocus data-unique-id="39ef3427-0bf5-41ca-a424-cc91ff5177eb" data-file-name="components/analyzer/DocumentManager.tsx" />
          <div className="flex space-x-2 ml-2" data-unique-id="18821297-7f81-4ce3-93c7-6daf55b07dcd" data-file-name="components/analyzer/DocumentManager.tsx">
            <button onClick={handleCreateDocument} className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm" data-unique-id="61f0eb2e-cee5-49af-8d77-ad997968ae2a" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="beeef1ec-6a95-4dfd-95a7-15ae29a8e75c" data-file-name="components/analyzer/DocumentManager.tsx">
              Create
            </span></button>
            <button onClick={() => {
          setIsCreatingNew(false);
          setNewDocName('');
        }} className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-md text-sm" data-unique-id="92351769-7ca4-443d-a52a-006b3f344624" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="e723ea36-5de4-42fd-a31c-8fcd33034221" data-file-name="components/analyzer/DocumentManager.tsx">
              Cancel
            </span></button>
          </div>
        </motion.div>}
      
      {documents.length === 0 ? <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="2abaeefc-296a-4c70-accd-741e2c9f9ede" data-file-name="components/analyzer/DocumentManager.tsx">
          <FileText className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600" data-unique-id="db004b87-ef7c-48ea-9c48-efd950e146ed" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="f33d4c21-1aa1-441a-a773-02aeb6dec35a" data-file-name="components/analyzer/DocumentManager.tsx">No documents yet. Create your first document to get started.</span></p>
        </div> : <div className="grid grid-cols-1 gap-2" data-unique-id="7add45c8-60c2-4060-ab99-bfe5ae0697a9" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
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
  }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)} onClick={isCompareMode ? onToggleCompare : onSelect} className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${isActive && !isCompareMode ? 'bg-blue-100 border-blue-300' : isSelected && isCompareMode ? 'bg-blue-100 border-blue-300' : 'bg-white border-slate-200 hover:border-blue-200'}`} data-unique-id="8d70ad20-cb14-465d-97c9-462a49e2cea6" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
      <div className="flex items-center overflow-hidden" data-unique-id="b6d20980-2fda-4672-b0e4-b71433d47c97" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
        {isCompareMode ? isSelected ? <CheckSquare className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" /> : <Square className="h-5 w-5 text-slate-400 mr-2 flex-shrink-0" /> : <FileText className={`h-5 w-5 mr-2 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
        <div className="overflow-hidden" data-unique-id="6dae3d6f-0f0b-4321-b919-0178eef71590" data-file-name="components/analyzer/DocumentManager.tsx">
          <p className={`font-medium truncate ${isActive && !isCompareMode ? 'text-blue-800' : isSelected && isCompareMode ? 'text-blue-800' : 'text-slate-700'}`} data-unique-id="588d88e8-5ed8-45ba-aaaf-5dda1654de4b" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            {document.name}
          </p>
          <p className="text-xs text-slate-500 truncate" data-unique-id="d07db693-2c7d-4bed-9bbf-942000467e5d" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            {new Date(document.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="d2b14090-552e-4581-9fc2-f1e69cbc6706" data-file-name="components/analyzer/DocumentManager.tsx"> • 
            </span>{document.analysisPoints.length}<span className="editable-text" data-unique-id="7792d54f-2d46-4f61-884d-65d101fea494" data-file-name="components/analyzer/DocumentManager.tsx"> points
          </span></p>
        </div>
      </div>
      
      {(isHovering || isActive || isSelected) && <div className="flex space-x-1 flex-shrink-0 ml-2" data-unique-id="c32e4178-ce31-4cd2-8118-12045161eeea" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          {!isCompareMode && <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50" data-unique-id="131fb3d8-5076-4612-8f1f-e53548986f1e" data-file-name="components/analyzer/DocumentManager.tsx">
              <Trash2 className="h-4 w-4" />
            </motion.button>}
        </div>}
    </motion.div>;
}