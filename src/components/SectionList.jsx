import React, { useState } from 'react';
import { useEditor } from '../context/EditorContext';

export const SectionList = () => {
  const {
    selectedSections,
    activeInstanceId,
    setActiveInstanceId,
    isStructureOpen,
    removeSection,
    moveSection,
    reorderSections,
    updateSectionName
  } = useEditor();

  // Стан для відстеження елемента, який перетягують
  const [draggedIndex, setDraggedIndex] = useState(null);

  if (!isStructureOpen) return null;

  if (selectedSections.length === 0) {
    return (
      <div className="w-64 bg-gray-900/60 border-r border-gray-800 p-4 text-center text-gray-500 text-sm flex flex-col items-center justify-center">
        <p>Обраних секцій поки немає.</p>
        <p className="text-xs mt-1">Оберіть потрібні блоки в лівому меню.</p>
      </div>
    );
  }

  // Обробники Drag and Drop
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    reorderSections(draggedIndex, targetIndex);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="w-64 bg-gray-900/60 border-r border-gray-800 flex flex-col h-full text-gray-300 select-none transition-all duration-300">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Структура ({selectedSections.length})</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {selectedSections.map((sec, index) => {
          const isActive = sec.instanceId === activeInstanceId;
          const isDragging = draggedIndex === index;

          return (
            <div
              key={sec.instanceId}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => setActiveInstanceId(sec.instanceId)}
              className={`group flex items-center justify-between p-2 rounded-lg border text-xs cursor-grab active:cursor-grabbing transition ${
                isDragging ? 'opacity-40 border-dashed border-emerald-500' : ''
              } ${
                isActive
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-gray-800/40 border-gray-800 hover:border-gray-700 text-gray-300'
              }`}
            >
              {/* Іконка перетягування (грип-поінт) */}
              <span className="text-gray-500 mr-1.5 cursor-grab active:cursor-grabbing" title="Затисніть для перетягування">
                ⠿
              </span>

              {/* Інпут редагування назви */}
              <input
                type="text"
                value={sec.customName || ''}
                onChange={(e) => updateSectionName(sec.instanceId, e.target.value)}
                onFocus={() => setActiveInstanceId(sec.instanceId)}
                className="bg-transparent border-b border-transparent hover:border-gray-600 focus:border-emerald-400 outline-none px-1 py-0.5 font-medium truncate flex-1 text-xs text-gray-200"
                placeholder="Назва секції..."
              />

              {/* Кнопки стрілочок та видалення (залишаємо як альтернативу) */}
              <div className="flex items-center gap-0.5 ml-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSection(index, 'up');
                  }}
                  disabled={index === 0}
                  className="px-1 text-gray-400 hover:text-white disabled:opacity-20"
                  title="Вгору"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSection(index, 'down');
                  }}
                  disabled={index === selectedSections.length - 1}
                  className="px-1 text-gray-400 hover:text-white disabled:opacity-20"
                  title="Вниз"
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSection(sec.instanceId);
                  }}
                  className="px-1 text-red-400 hover:text-red-300 ml-0.5"
                  title="Видалити"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};