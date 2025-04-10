import { create } from 'zustand';
import { WebsiteState, ElementType, Section } from './types';

export const useWebsiteStore = create<WebsiteState>((set) => ({
  sections: [],
  selectedElement: null,
  addSection: () => 
    set((state) => ({
      sections: [...state.sections, { id: crypto.randomUUID(), elements: [] }],
    })),
  addElement: (sectionId, element) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? { ...section, elements: [...section.elements, element] }
          : section
      ),
      selectedElement: element, 
    })),
  updateElement: (updatedElement) =>
    set((state) => ({
      sections: state.sections.map((section) => ({
        ...section,
        elements: section.elements.map((element) =>
          element.id === updatedElement.id ? updatedElement : element
        ),
      })),
      selectedElement: updatedElement,
    })),
  setSelectedElement: (element) => set({ selectedElement: element }),
}));