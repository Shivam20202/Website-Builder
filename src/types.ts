import React from 'react';

export interface ElementType {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button';
  content: string;
  styles?: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    marginBottom?: string;
    width?: string;
    borderRadius?: string;
    backgroundColor?: string;
    padding?: string;
  };
}

export interface Section {
  id: string;
  elements: ElementType[];
}

export interface WebsiteState {
  sections: Section[];
  selectedElement: ElementType | null;
  addSection: () => void;
  addElement: (sectionId: string, element: ElementType) => void;
  updateElement: (element: ElementType) => void;
  setSelectedElement: (element: ElementType | null) => void;
}