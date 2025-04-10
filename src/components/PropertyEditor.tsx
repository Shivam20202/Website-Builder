import React from 'react';
import { useWebsiteStore } from '../store';
import { Upload } from 'lucide-react';

export const PropertyEditor = () => {
  const { selectedElement, updateElement } = useWebsiteStore();

  if (!selectedElement) {
    return (
      <div className="w-64 p-4 bg-gray-100 border-l border-gray-200 overflow-y-auto">
        <p className="text-gray-500 text-center">Select an element to edit its properties</p>
      </div>
    );
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newElement = {
      ...selectedElement,
      content: e.target.value,
    };
    updateElement(newElement);
  };

  const handleStyleChange = (property: string, value: string) => {
    const newElement = {
      ...selectedElement,
      styles: {
        ...selectedElement.styles,
        [property]: value,
      },
    };
    updateElement(newElement);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newElement = {
          ...selectedElement,
          content: reader.result as string,
        };
        updateElement(newElement);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStyleValue = (property: string, defaultValue: string): string => {
    if (!selectedElement.styles) return defaultValue;
    const value = selectedElement.styles[property];
    if (!value) return defaultValue;
    
    // Remove units for number inputs
    if (property === 'fontSize' || property === 'borderRadius' || property === 'marginBottom') {
      return value.replace('px', '');
    }
    if (property === 'width') {
      return value.replace('%', '');
    }
    return value;
  };

  return (
    <div className="w-64 p-4 bg-gray-100 border-l border-gray-200 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      
      <div className="space-y-4">
        {selectedElement.type === 'image' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={selectedElement.content}
                onChange={handleContentChange}
                placeholder="Image URL"
                className="w-full p-2 border rounded"
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            {selectedElement.type === 'paragraph' ? (
              <textarea
                value={selectedElement.content}
                onChange={handleContentChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
            ) : (
              <input
                type="text"
                value={selectedElement.content}
                onChange={handleContentChange}
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        )}

        {selectedElement.type !== 'image' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Color
            </label>
            <input
              type="color"
              value={getStyleValue('color', '#000000')}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-full p-1 border rounded"
            />
          </div>
        )}

        {selectedElement.type !== 'image' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Size (px)
              </label>
              <input
                type="number"
                min="8"
                max="72"
                value={getStyleValue('fontSize', '16')}
                onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Weight
              </label>
              <select
                value={getStyleValue('fontWeight', '400')}
                onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="400">Regular</option>
                <option value="500">Medium</option>
                <option value="600">Semi Bold</option>
                <option value="700">Bold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Align
              </label>
              <select
                value={getStyleValue('textAlign', 'left')}
                onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        )}

        {(selectedElement.type === 'image' || selectedElement.type === 'button') && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width (%)
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={getStyleValue('width', '100')}
                onChange={(e) => handleStyleChange('width', `${e.target.value}%`)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Border Radius (px)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={getStyleValue('borderRadius', '0')}
                onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`)}
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Margin Bottom (px)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={getStyleValue('marginBottom', '16')}
            onChange={(e) => handleStyleChange('marginBottom', `${e.target.value}px`)}
            className="w-full p-2 border rounded"
          />
        </div>

        {selectedElement.type === 'button' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <input
              type="color"
              value={getStyleValue('backgroundColor', '#3b82f6')}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-full p-1 border rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};