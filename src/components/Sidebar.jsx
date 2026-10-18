import React from 'react';
import { useEditor } from '../context/EditorContext';

export const Sidebar = () => {
  const { availableSections, selectedSections, addSection, clearAll } = useEditor();

  const categories = Array.from(new Set(availableSections.map((s) => s.category)));

  return (
    <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col h-full text-gray-300 select-none">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-bold text-white flex items-center justify-between">
          <span className="flex items-center gap-2">📚 Секції README</span>
          {selectedSections.length > 0 && (
            <button
              onClick={clearAll}
              title="Очистити все"
              className="text-xs text-red-400 hover:text-red-300 font-normal underline"
            >
              Очистити
            </button>
          )}
        </h2>
        <p className="text-xs text-gray-400 mt-1">Натисніть, щоб додати будь-яку секцію</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {categories.map((cat) => (
          <div key={cat}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
              {cat}
            </div>
            <div className="space-y-1">
              {availableSections
                .filter((sec) => sec.category === cat)
                .map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => addSection(sec)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition bg-gray-800 hover:bg-emerald-600 hover:text-white text-gray-200 flex items-center justify-between group"
                  >
                    <span>{sec.name}</span>
                    <span className="text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition">+ Додати</span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};