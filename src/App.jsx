import React from 'react';
import { EditorProvider } from './context/EditorContext';
import { Sidebar } from './components/Sidebar';
import { SectionList } from './components/SectionList';
import { EditorPreview } from './components/EditorPreview';

export default function App() {
  return (
    <EditorProvider>
      <div className="flex h-screen w-screen overflow-hidden font-sans antialiased">
        <Sidebar />
        <SectionList />
        <EditorPreview />
      </div>
    </EditorProvider>
  );
}