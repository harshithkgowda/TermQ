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
  return <div className="mb-4 md:mb-6 px-4 md:px-6 pt-4 md:pt-6" data-unique-id="f2fb191e-5ebf-436b-b687-50734b937625" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3" data-unique-id="23d93585-d07e-40a2-87dd-84184aec5cb3" data-file-name="components/analyzer/DocumentManager.tsx">
        <h2 className="text-xl font-medium text-blue-800" data-unique-id="bef0b03a-21eb-4eac-bbe7-ef1f9060f58a" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="b18e154a-0325-44c3-89b9-4b66465cf6a7" data-file-name="components/analyzer/DocumentManager.tsx">Documents</span></h2>
        
        <div className="flex flex-wrap items-center gap-3" data-unique-id="0d40f427-09af-4005-ab4a-a84af531d7a8" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setCompareMode(!isCompareMode)} className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${isCompareMode ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`} data-unique-id="5a5c2453-50da-4a21-91cc-2e55de5a74b8" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            <ArrowLeftRight className="h-4 w-4 mr-1.5" />
            {isCompareMode ? 'Exit Compare' : 'Compare Mode'}
          </motion.button>
          
          {!isCreatingNew && <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setIsCreatingNew(true)} className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium" data-unique-id="1b042309-9d61-4cb2-9ea0-6947718c287f" data-file-name="components/analyzer/DocumentManager.tsx">
              <Plus className="h-4 w-4 mr-1.5" /><span className="editable-text" data-unique-id="38a4b3b0-c53d-475a-a822-8ef60a521175" data-file-name="components/analyzer/DocumentManager.tsx">
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
    }} className="flex items-center mb-4 bg-purple-50 p-2 rounded-md border border-purple-200" data-unique-id="cfffbeda-15aa-4608-a6e0-455a2ee0723d" data-file-name="components/analyzer/DocumentManager.tsx">
          <input type="text" value={newDocName} onChange={e => setNewDocName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Document name..." className="flex-1 px-3 py-1.5 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" autoFocus data-unique-id="54b66b30-309e-4b6a-b9b8-36bf7ffc3ee3" data-file-name="components/analyzer/DocumentManager.tsx" />
          <div className="flex space-x-2 ml-2" data-unique-id="82ce8434-c015-4121-94eb-71bf13ce9a87" data-file-name="components/analyzer/DocumentManager.tsx">
            <button onClick={handleCreateDocument} className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm" data-unique-id="2aebccda-1ed4-44c7-9716-8912f2e03af9" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="db5c2439-cf41-45e6-9aad-cb290ac30f59" data-file-name="components/analyzer/DocumentManager.tsx">
              Create
            </span></button>
            <button onClick={() => {
          setIsCreatingNew(false);
          setNewDocName('');
        }} className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-md text-sm" data-unique-id="673f7af5-9322-4b71-8bf2-cc3607dd9c0d" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="da90da58-f7c7-483c-aa04-94a8939a5c2f" data-file-name="components/analyzer/DocumentManager.tsx">
              Cancel
            </span></button>
          </div>
        </motion.div>}
      
      {documents.length === 0 ? <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="96c0ad77-b9b4-4039-8e04-b156d393f19e" data-file-name="components/analyzer/DocumentManager.tsx">
          <FileText className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600" data-unique-id="b459e20b-93a9-4446-af33-53368d77bce9" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="cbdb2da2-a23c-4439-9fb5-2dde03f377c6" data-file-name="components/analyzer/DocumentManager.tsx">No documents yet. Create your first document to get started.</span></p>
        </div> : <div className="grid grid-cols-1 gap-2" data-unique-id="b548bd4c-9347-4065-8113-78465932fd9f" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
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
  }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)} onClick={isCompareMode ? onToggleCompare : onSelect} className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${isActive && !isCompareMode ? 'bg-blue-100 border-blue-300' : isSelected && isCompareMode ? 'bg-blue-100 border-blue-300' : 'bg-white border-slate-200 hover:border-blue-200'}`} data-unique-id="810afc15-8582-40a3-b4ca-36d5870750fe" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
      <div className="flex items-center overflow-hidden" data-unique-id="a934985f-534f-48f5-9b93-87066c3c1351" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
        {isCompareMode ? isSelected ? <CheckSquare className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" /> : <Square className="h-5 w-5 text-slate-400 mr-2 flex-shrink-0" /> : <FileText className={`h-5 w-5 mr-2 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
        <div className="overflow-hidden" data-unique-id="2c13ab66-2c42-4ec6-b5ec-030110c1ba93" data-file-name="components/analyzer/DocumentManager.tsx">
          <p className={`font-medium truncate ${isActive && !isCompareMode ? 'text-blue-800' : isSelected && isCompareMode ? 'text-blue-800' : 'text-slate-700'}`} data-unique-id="d38efd04-76cf-481c-a809-0b279c4b6b1b" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            {document.name}
          </p>
          <p className="text-xs text-slate-500 truncate" data-unique-id="e249225d-3719-4465-83f4-21f606329441" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            {new Date(document.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="b8318d0e-548e-40ae-a9a5-247bd2443cc5" data-file-name="components/analyzer/DocumentManager.tsx"> • 
            </span>{document.analysisPoints.length}<span className="editable-text" data-unique-id="302a2de2-980d-424d-a8b5-d1b5a7d26330" data-file-name="components/analyzer/DocumentManager.tsx"> points
          </span></p>
        </div>
      </div>
      
      {(isHovering || isActive || isSelected) && <div className="flex space-x-1 flex-shrink-0 ml-2" data-unique-id="570a52cd-484c-4d31-a97d-91bb3d23b41b" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          {!isCompareMode && <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50" data-unique-id="55fea4b3-2003-42f2-8850-456276103b11" data-file-name="components/analyzer/DocumentManager.tsx">
              <Trash2 className="h-4 w-4" />
            </motion.button>}
        </div>}
    </motion.div>;
}