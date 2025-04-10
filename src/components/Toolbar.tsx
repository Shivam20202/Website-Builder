import React from 'react';
import { useDrag } from 'react-dnd';
import { Type, Image, Donut as ButtonIcon } from 'lucide-react';

const ToolbarItem = ({ type, icon: Icon, label }: { type: string; icon: React.ElementType; label: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm cursor-move hover:bg-gray-50 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="w-5 h-5 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

export const Toolbar = () => {
  return (
    <div className="p-4 bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200 md:w-64">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible">
        <ToolbarItem type="heading" icon={Type} label="Heading" />
        <ToolbarItem type="paragraph" icon={Type} label="Paragraph" />
        <ToolbarItem type="image" icon={Image} label="Image" />
        <ToolbarItem type="button" icon={ButtonIcon} label="Button" />
      </div>
    </div>
  );
};