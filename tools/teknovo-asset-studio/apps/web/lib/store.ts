'use client';

import { create } from 'zustand';

interface StudioFilterState {
  query: string;
  category: string;
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
}

export const useStudioFilters = create<StudioFilterState>((set) => ({
  query: '',
  category: 'all',
  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category })
}));
