import React from 'react';
import { useDrop } from 'react-dnd';
import { useWebsiteStore } from '../store';
import { Plus } from 'lucide-react';
import { ElementType } from '../types';

const Element = ({ element }: { element: ElementType }) => {
  const setSelectedElement = useWebsiteStore((state) => state.setSelectedElement);

  const handleClick = () => {
    setSelectedElement(element);
  };

  switch (element.type) {
    case 'heading':
      return (
        <h2
          className="text-2xl font-bold cursor-pointer"
          onClick={handleClick}
          style={element.styles || {}}
        >
          {element.content}
        </h2>
      );
    case 'paragraph':
      return (
        <p
          className="cursor-pointer"
          onClick={handleClick}
          style={element.styles || {}}
        >
          {element.content}
        </p>
      );
    case 'image':
      return (
        <img
          src={element.content}
          alt="Content"
          className="max-w-full h-auto cursor-pointer"
          onClick={handleClick}
          style={element.styles || {}}
        />
      );
    case 'button':
      return (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          onClick={handleClick}
          style={element.styles || {}}
        >
          {element.content}
        </button>
      );
    default:
      return null;
  }
};

const Section = ({ section }: { section: { id: string; elements: ElementType[] } }) => {
  const addElement = useWebsiteStore((state) => state.addElement);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { type: string }) => {
      const defaultStyles = {
        marginBottom: '16px',
        fontSize: '16px',
        color: '#000000',
        fontWeight: '400',
        textAlign: 'left',
      };

      const imageStyles = {
        marginBottom: '16px',
        width: '100%',
        borderRadius: '0px',
      };

      const buttonStyles = {
        marginBottom: '16px',
        fontSize: '16px',
        color: '#ffffff',
        fontWeight: '500',
        backgroundColor: '#3b82f6',
        padding: '8px 16px',
        borderRadius: '4px',
        width: '100%',
      };

      const newElement: ElementType = {
        id: crypto.randomUUID(),
        type: item.type as ElementType['type'],
        content: item.type === 'image' 
          ? ''
          : item.type === 'heading'
          ? 'New Heading'
          : item.type === 'button'
          ? 'Click Me'
          : 'New paragraph text',
        styles: item.type === 'image' 
          ? imageStyles 
          : item.type === 'button'
          ? buttonStyles
          : defaultStyles,
      };
      addElement(section.id, newElement);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 md:p-6 border-2 ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      } rounded-lg mb-4`}
    >
      {section.elements.map((element) => (
        <Element key={element.id} element={element} />
      ))}
      {section.elements.length === 0 && (
        <div className="h-24 flex items-center justify-center text-gray-400">
          Drop elements here
        </div>
      )}
    </div>
  );
};

export const Canvas = () => {
  const { sections, addSection } = useWebsiteStore();

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
        <button
          onClick={addSection}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Section
        </button>
      </div>
    </div>
  );
};