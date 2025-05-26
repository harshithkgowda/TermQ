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
  return <div className="mb-4 md:mb-6 px-4 md:px-6 pt-4 md:pt-6" data-unique-id="ac4aa1bd-4631-463b-8225-cb9985f4a3a4" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3" data-unique-id="49b847a5-3ee7-4d2b-9e9a-e6e61e90fb82" data-file-name="components/analyzer/DocumentManager.tsx">
        <h2 className="text-xl font-medium text-blue-800" data-unique-id="c68d8457-7ad8-476b-92aa-0cf25f7bfbe0" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="13486854-9786-4d0e-bcde-3a449099bf29" data-file-name="components/analyzer/DocumentManager.tsx">Documents</span></h2>
        
        <div className="flex flex-wrap items-center gap-3" data-unique-id="4be88d05-22ca-4d2f-b61a-0cde13cef6e3" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setCompareMode(!isCompareMode)} className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${isCompareMode ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`} data-unique-id="9781a4a7-6c4d-49e6-a418-fb1cc5b33974" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            <ArrowLeftRight className="h-4 w-4 mr-1.5" />
            {isCompareMode ? 'Exit Compare' : 'Compare Mode'}
          </motion.button>
          
          {!isCreatingNew && <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setIsCreatingNew(true)} className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium" data-unique-id="095b9de5-d9f7-4963-9a99-55446c1b03b6" data-file-name="components/analyzer/DocumentManager.tsx">
              <Plus className="h-4 w-4 mr-1.5" /><span className="editable-text" data-unique-id="e70d8a08-88dc-4a23-a944-93aef62695d2" data-file-name="components/analyzer/DocumentManager.tsx">
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
    }} className="flex items-center mb-4 bg-purple-50 p-2 rounded-md border border-purple-200" data-unique-id="683e548e-fcba-454e-ad57-1166118fa2ab" data-file-name="components/analyzer/DocumentManager.tsx">
          <input type="text" value={newDocName} onChange={e => setNewDocName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Document name..." className="flex-1 px-3 py-1.5 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" autoFocus data-unique-id="56aa5b9f-67ba-4b45-901e-3921c3175e22" data-file-name="components/analyzer/DocumentManager.tsx" />
          <div className="flex space-x-2 ml-2" data-unique-id="177a5f89-0e3f-4e3e-96f4-5aab1388c05f" data-file-name="components/analyzer/DocumentManager.tsx">
            <button onClick={handleCreateDocument} className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm" data-unique-id="df30aac5-b82a-4a66-a21b-db5b49744fbe" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="223d11a8-a578-4d92-900f-17bae4dcfaad" data-file-name="components/analyzer/DocumentManager.tsx">
              Create
            </span></button>
            <button onClick={() => {
          setIsCreatingNew(false);
          setNewDocName('');
        }} className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-md text-sm" data-unique-id="16335059-73c9-43b0-9ab9-d551181b9f23" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="70415a06-1f66-4792-958a-be03c2df4d52" data-file-name="components/analyzer/DocumentManager.tsx">
              Cancel
            </span></button>
          </div>
        </motion.div>}
      
      {documents.length === 0 ? <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="0196f4fc-01eb-4924-b947-4365e9a158e3" data-file-name="components/analyzer/DocumentManager.tsx">
          <FileText className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600" data-unique-id="4214df84-cee2-4c95-a9eb-7b58d635940b" data-file-name="components/analyzer/DocumentManager.tsx"><span className="editable-text" data-unique-id="258c3893-ccda-48d9-910d-4a12b19e5424" data-file-name="components/analyzer/DocumentManager.tsx">No documents yet. Create your first document to get started.</span></p>
        </div> : <div className="grid grid-cols-1 gap-2" data-unique-id="3576d99e-e798-4d70-add4-4a4df765fb93" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
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
  }} onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)} onClick={isCompareMode ? onToggleCompare : onSelect} className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${isActive && !isCompareMode ? 'bg-blue-100 border-blue-300' : isSelected && isCompareMode ? 'bg-blue-100 border-blue-300' : 'bg-white border-slate-200 hover:border-blue-200'}`} data-unique-id="f036ad8d-d232-4a18-ad83-107a7ebbf0c9" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
      <div className="flex items-center overflow-hidden" data-unique-id="87de349e-7984-4200-93ca-07cb9c05acee" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
        {isCompareMode ? isSelected ? <CheckSquare className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" /> : <Square className="h-5 w-5 text-slate-400 mr-2 flex-shrink-0" /> : <FileText className={`h-5 w-5 mr-2 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
        <div className="overflow-hidden" data-unique-id="b538b7a3-b24c-4f40-b230-3d29ec0ea97d" data-file-name="components/analyzer/DocumentManager.tsx">
          <p className={`font-medium truncate ${isActive && !isCompareMode ? 'text-blue-800' : isSelected && isCompareMode ? 'text-blue-800' : 'text-slate-700'}`} data-unique-id="2dcf0bdc-1d6c-40e6-aa52-a13cc6ff9d0f" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            {document.name}
          </p>
          <p className="text-xs text-slate-500 truncate" data-unique-id="2336a97f-f6f3-4e9c-9a9c-901846951ea2" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
            {new Date(document.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="a702de71-09f3-443f-b53f-583291db07d4" data-file-name="components/analyzer/DocumentManager.tsx"> • 
            </span>{document.analysisPoints.length}<span className="editable-text" data-unique-id="3e8f264c-5e40-4466-804c-f70115c46aca" data-file-name="components/analyzer/DocumentManager.tsx"> points
          </span></p>
        </div>
      </div>
      
      {(isHovering || isActive || isSelected) && <div className="flex space-x-1 flex-shrink-0 ml-2" data-unique-id="96703e2a-70aa-4e95-9f42-78c7cfb0d137" data-file-name="components/analyzer/DocumentManager.tsx" data-dynamic-text="true">
          {!isCompareMode && <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50" data-unique-id="b4a0dc36-720c-463a-b615-2319ed3f5d4f" data-file-name="components/analyzer/DocumentManager.tsx">
              <Trash2 className="h-4 w-4" />
            </motion.button>}
        </div>}
    </motion.div>;
}