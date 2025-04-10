import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toolbar } from './components/Toolbar';
import { Canvas } from './components/Canvas';
import { PropertyEditor } from './components/PropertyEditor';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col md:flex-row h-screen">
        <Toolbar />
        <Canvas />
        <PropertyEditor />
      </div>
    </DndProvider>
  );
}

export default App;