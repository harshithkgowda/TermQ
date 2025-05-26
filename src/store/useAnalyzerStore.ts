'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AnalysisPoint = {
  id: string;
  text: string;
  type: 'harmful' | 'good' | 'awareness';
  explanation: string;
}

export type Summary = {
  points: string[];
}

export type Document = {
  id: string;
  name: string;
  content: string;
  file: File | null;
  imageUrl: string | null;
  analysisPoints: AnalysisPoint[];
  summary: Summary;
  createdAt: Date;
}

type AnalyzerState = {
  documents: Document[];
  currentDocumentId: string | null;
  compareDocumentIds: string[];
  content: string;
  file: File | null;
  imageUrl: string | null;
  isAnalyzing: boolean;
  analysisPoints: AnalysisPoint[];
  summary: Summary;
  error: string | null;
  isCompareMode: boolean;
  
  // Document actions
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  removeDocument: (id: string) => void;
  setCurrentDocument: (id: string | null) => void;
  toggleCompareDocument: (id: string) => void;
  setCompareMode: (isCompareMode: boolean) => void;
  
  // Current document actions
  setContent: (content: string) => void;
  setFile: (file: File | null) => void;
  setImageUrl: (url: string | null) => void;
  startAnalysis: () => void;
  setAnalysisResults: (points: AnalysisPoint[], summary: Summary) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  
  // Helper methods
  getCurrentDocument: () => Document | null;
  getCompareDocuments: () => Document[];
}

const initialState = {
  documents: [],
  currentDocumentId: null,
  compareDocumentIds: [],
  content: '',
  file: null,
  imageUrl: null,
  isAnalyzing: false,
  analysisPoints: [],
  summary: { points: [] },
  error: null,
  isCompareMode: false,
}

export const useAnalyzerStore = create<AnalyzerState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Document actions
      addDocument: (document) => set((state) => ({
        documents: [...state.documents, document],
        currentDocumentId: document.id
      })),
      
      updateDocument: (id, updates) => set((state) => ({
        documents: state.documents.map(doc => 
          doc.id === id ? { ...doc, ...updates } : doc
        )
      })),
      
      removeDocument: (id) => set((state) => {
        const newDocuments = state.documents.filter(doc => doc.id !== id);
        const newCompareDocumentIds = state.compareDocumentIds.filter(docId => docId !== id);
        
        // If we're removing the current document, set a new current document
        let newCurrentDocumentId = state.currentDocumentId;
        if (state.currentDocumentId === id) {
          newCurrentDocumentId = newDocuments.length > 0 ? newDocuments[0].id : null;
        }
        
        return {
          documents: newDocuments,
          currentDocumentId: newCurrentDocumentId,
          compareDocumentIds: newCompareDocumentIds
        };
      }),
      
      setCurrentDocument: (id) => {
        const state = get();
        const document = state.documents.find(doc => doc.id === id) || null;
        
        set({
          currentDocumentId: id,
          content: document?.content || '',
          file: document?.file || null,
          imageUrl: document?.imageUrl || null,
          analysisPoints: document?.analysisPoints || [],
          summary: document?.summary || { points: [] }
        });
      },
      
      toggleCompareDocument: (id) => set((state) => {
        if (state.compareDocumentIds.includes(id)) {
          return {
            compareDocumentIds: state.compareDocumentIds.filter(docId => docId !== id)
          };
        } else {
          // Limit to comparing 2 documents at a time
          const newCompareIds = [...state.compareDocumentIds, id].slice(-2);
          return { compareDocumentIds: newCompareIds };
        }
      }),
      
      setCompareMode: (isCompareMode) => set({ isCompareMode }),
      
      // Current document actions
      setContent: (content) => set({ content }),
      
      setFile: (file) => set({ file }),
      
      setImageUrl: (imageUrl) => set({ imageUrl }),
      
      startAnalysis: () => set({ isAnalyzing: true }),
      
      setAnalysisResults: (analysisPoints, summary) => {
        const state = get();
        set({ 
          analysisPoints, 
          summary,
          isAnalyzing: false 
        });
        
        // If we have a current document, update it
        if (state.currentDocumentId) {
          get().updateDocument(state.currentDocumentId, {
            analysisPoints,
            summary
          });
        }
      },
      
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      
      setError: (error) => set({ error }),
      
      reset: () => set({
        content: '',
        file: null,
        imageUrl: null,
        isAnalyzing: false,
        analysisPoints: [],
        summary: { points: [] },
        error: null
      }),
      
      // Helper methods
      getCurrentDocument: () => {
        const state = get();
        return state.documents.find(doc => doc.id === state.currentDocumentId) || null;
      },
      
      getCompareDocuments: () => {
        const state = get();
        return state.compareDocumentIds
          .map(id => state.documents.find(doc => doc.id === id))
          .filter((doc): doc is Document => doc !== undefined);
      }
    }),
    {
      name: 'tc-analyzer-storage',
      partialize: (state) => ({
        documents: state.documents,
        currentDocumentId: state.currentDocumentId,
        compareDocumentIds: state.compareDocumentIds
      })
    }
  )
)
