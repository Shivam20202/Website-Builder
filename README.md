Architecture Overview
The website builder is built using a modern React architecture with TypeScript, focusing on modularity, maintainability, and extensibility.

Core Technologies
React + TypeScript

Provides type safety and better developer experience
Enables catching errors early in development
State Management: Zustand

Lightweight and simple state management
Easy integration with React components
Efficient updates with minimal re-renders
Drag and Drop: react-dnd

Flexible drag and drop system
HTML5 backend for native browser support
Custom drag previews and drop targets
Styling: Tailwind CSS

Utility-first CSS framework
Responsive design out of the box
Easy customization and maintenance
Component Structure
App (Root Component)

Manages layout and DnD provider
Responsive container for all main components
Toolbar

Draggable element source
Mobile-responsive horizontal/vertical layout
Visual feedback during drag operations
Canvas

Drop zones for elements
Section management
Element rendering and selection
PropertyEditor

Dynamic property controls
Real-time element updates
Context-aware editing options
Features
Enhanced Element Properties

Font weight control
Text alignment
Margin adjustments
Border radius for images
Color picker
Font size control
Image Handling

Local image upload with FileReader
URL input support
Width and border radius controls
Responsive image display
Responsive Design

Mobile-first approach
Flexible layouts
Adaptive toolbar
Scrollable content areas
User Experience

Intuitive drag and drop
Real-time preview
Visual feedback
Smooth transitions
Future Extensibility
The architecture supports easy addition of:

New element types
Additional properties
Custom templates
Undo/redo functionality
Export/import capabilities
Collaboration features
The modular design and type-safe implementation ensure that new features can be added without breaking existing functionality.
