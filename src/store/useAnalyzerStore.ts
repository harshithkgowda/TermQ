'use client'

import { create } from 'zustand'

export type AnalysisPoint = {
  id: string;
  text: string;
  type: 'harmful' | 'good' | 'awareness';
  explanation: string;
}

export type Summary = {
  points: string[];
}

type AnalyzerState = {
  content: string;
  file: File | null;
  imageUrl: string | null;
  isAnalyzing: boolean;
  analysisPoints: AnalysisPoint[];
  summary: Summary;
  error: string | null;
  
  // Actions
  setContent: (content: string) => void;
  setFile: (file: File | null) => void;
  setImageUrl: (url: string | null) => void;
  startAnalysis: () => void;
  setAnalysisResults: (points: AnalysisPoint[], summary: Summary) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  content: '',
  file: null,
  imageUrl: null,
  isAnalyzing: false,
  analysisPoints: [],
  summary: { points: [] },
  error: null,
}

export const useAnalyzerStore = create<AnalyzerState>((set) => ({
  ...initialState,
  
  setContent: (content) => set({ content }),
  setFile: (file) => set({ file }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  startAnalysis: () => set({ isAnalyzing: true }),
  setAnalysisResults: (analysisPoints, summary) => set({ 
    analysisPoints, 
    summary,
    isAnalyzing: false 
  }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setError: (error) => set({ error }),
  reset: () => set(initialState)
}))
