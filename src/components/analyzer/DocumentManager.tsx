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
  return <div className="mb-6" data-unique-id="4d8d29b9-18b9-446c-851b-85a9b4860929" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-4" data-unique-id="18b44b2f-81be-424b-a6f9-42150bf527f4" data-file-name="components/analyzer/DocumentManager.tsx">
        <h2 className="text-lg font-medium text-purple-800" data-unique-id="e590505d-7a84-48bd-a629-849e89c85e43" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="214d66ce-5461-4fec-ad02-a54340038d42" data-file-name="components/analyzer/DocumentManager.tsx">Documents</span></h2>
        
        <div className="flex items-center space-x-3" data-unique-id="3cdc71be-062b-46f1-a6d5-a6e4a4275217" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setCompareMode(!isCompareMode)} className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${isCompareMode ? 'bg-purple-100 text-purple-700 border border-purple-300' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300'}`} data-unique-id="64209b71-84a0-4c07-88fb-073ec124c3bc" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            <ArrowLeftRight className="h-4 w-4 mr-1.5" />
            {isCompareMode ? 'Exit Compare' : 'Compare Mode'}
          </motion.button>
          
          {!isCreatingNew && <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setIsCreatingNew(true)} className="flex items-center px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm font-medium" data-unique-id="a8758b94-2e53-4413-802e-52e645658d96" data-file-name="components/analyzer/DocumentManager.tsx">
              <Plus className="h-4 w-4 mr-1.5" /><span className="editable-text" data-unique-id="090dda26-6925-461d-8d6f-00e4fba66fbc" data-file-name="components/analyzer/DocumentManager.tsx">
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
    }} className="flex items-center mb-4 bg-purple-50 p-2 rounded-md border border-purple-200" data-unique-id="36c4d3c0-224f-4f38-99ae-1b4986bf25c2" data-file-name="components/analyzer/DocumentManager.tsx">
          <input type="text" value={newDocName} onChange={e => setNewDocName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Document name..." className="flex-1 px-3 py-1.5 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" autoFocus data-unique-id="915e420a-9561-4322-8698-fd9d0f1f7de9" data-file-name="components/analyzer/DocumentManager.tsx" />
          <div className="flex space-x-2 ml-2" data-unique-id="df329226-ebc1-4f57-b606-e98685a5ea1d" data-file-name="components/analyzer/DocumentManager.tsx">
            <button onClick={handleCreateDocument} className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm" data-unique-id="3b56b480-62f4-46c7-a4da-34482df8cbeb" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="2c307a7b-e8f5-49bf-a99d-223e37d41497" data-file-name="components/analyzer/DocumentManager.tsx">
              Create
            </span></button>
            <button onClick={() => {
          setIsCreatingNew(false);
          setNewDocName('');
        }} className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-md text-sm" data-unique-id="86ba4b73-a99e-46cf-8d91-3c1c2ea22179" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="e3f0d293-f7f0-4e0d-916f-46727c6e071d" data-file-name="components/analyzer/DocumentManager.tsx">
              Cancel
            </span></button>
          </div>
        </motion.div>}
      
      {documents.length === 0 ? <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="fdc888a3-450b-46df-9dc3-a11a42e39151" data-file-name="components/analyzer/DocumentManager.tsx">
          <FileText className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600" data-unique-id="ca73f942-2203-412a-b787-4e626bb9f614" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="fbf308bc-0223-44bf-a48f-f4a4a8deb5d7" data-file-name="components/analyzer/DocumentManager.tsx">No documents yet. Create your first document to get started.</span></p>
        </div> : <div className="grid grid-cols-1 gap-2" data-unique-id="abc0eeb1-3a5d-49a1-939e-22e031dc13c4" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
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
  }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)} onClick={isCompareMode ? onToggleCompare : onSelect} className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${isActive && !isCompareMode ? 'bg-purple-100 border-purple-300' : isSelected && isCompareMode ? 'bg-teal-100 border-teal-300' : 'bg-white border-slate-200 hover:border-purple-200'}`} data-unique-id="230b0b97-2edc-4c2f-896d-21a702304779" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
      <div className="flex items-center" data-unique-id="a1146ba6-496f-44cf-a26f-c136ae318a58" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
        {isCompareMode ? isSelected ? <CheckSquare className="h-5 w-5 text-teal-600 mr-2" /> : <Square className="h-5 w-5 text-slate-400 mr-2" /> : <FileText className={`h-5 w-5 mr-2 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />}
        <div data-unique-id="fa1d7b98-e4dd-46f4-8182-051783fb736b" data-file-name="components/analyzer/DocumentManager.tsx">
          <p className={`font-medium ${isActive && !isCompareMode ? 'text-purple-800' : isSelected && isCompareMode ? 'text-teal-800' : 'text-slate-700'}`} data-unique-id="b716cd45-f44b-425b-8ca5-899fb9f0e191" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            {document.name}
          </p>
          <p className="text-xs text-slate-500" data-unique-id="6a3c5286-d182-468a-8b83-1e82c034dc71" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            {new Date(document.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="7d7a636a-6f64-45cd-a275-2266f892398f" data-file-name="components/analyzer/DocumentManager.tsx"> • 
            </span>{document.analysisPoints.length}<span className="editable-text" data-unique-id="bb03836d-cdf6-408a-8b1a-24442e9feb53" data-file-name="components/analyzer/DocumentManager.tsx"> points
          </span></p>
        </div>
      </div>
      
      {(isHovering || isActive || isSelected) && <div className="flex space-x-1" data-unique-id="aa5d2979-0ec8-48d9-860b-f6ff58fdfe12" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          {!isCompareMode && <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50" data-unique-id="8c049b3e-2b48-402a-89a6-e8639b0e57d8" data-file-name="components/analyzer/DocumentManager.tsx">
              <Trash2 className="h-4 w-4" />
            </motion.button>}
        </div>}
    </motion.div>;
}