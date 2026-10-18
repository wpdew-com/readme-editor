import React, { createContext, useContext, useState, useEffect } from 'react';
import { AVAILABLE_SECTIONS } from '../data/sectionsData';

const EditorContext = createContext();
const LOCAL_STORAGE_KEY = 'readme_so_custom_sections_v3';
const STRUCTURE_STORAGE_KEY = 'readme_so_structure_open';

export const EditorProvider = ({ children }) => {
  const [selectedSections, setSelectedSections] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          instanceId: item.instanceId || '_' + Math.random().toString(36).substr(2, 9),
          customName: item.customName || item.name || 'Секція'
        }));
      } catch (e) {
        console.error('Помилка зчитування localStorage:', e);
      }
    }
    return [];
  });

  const [activeInstanceId, setActiveInstanceId] = useState(() => {
    return selectedSections.length > 0 ? selectedSections[0].instanceId : null;
  });

  // Стан видимості панелі структури (зберігається в localStorage)
  const [isStructureOpen, setIsStructureOpen] = useState(() => {
    const saved = localStorage.getItem(STRUCTURE_STORAGE_KEY);
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Автоматичне збереження секцій у localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedSections));
  }, [selectedSections]);

  // Автоматичне збереження стану структури у localStorage
  useEffect(() => {
    localStorage.setItem(STRUCTURE_STORAGE_KEY, JSON.stringify(isStructureOpen));
  }, [isStructureOpen]);

  const toggleStructure = () => setIsStructureOpen((prev) => !prev);

  const addSection = (section) => {
    const newInstanceId = '_' + Math.random().toString(36).substr(2, 9);
    const newSection = {
      ...section,
      instanceId: newInstanceId,
      customName: section.name || 'Нова секція'
    };
    setSelectedSections((prev) => [...prev, newSection]);
    setActiveInstanceId(newInstanceId);
  };

  const removeSection = (instanceId) => {
    setSelectedSections((prev) => {
      const filtered = prev.filter((s) => s.instanceId !== instanceId);
      if (activeInstanceId === instanceId) {
        setActiveInstanceId(filtered.length > 0 ? filtered[0].instanceId : null);
      }
      return filtered;
    });
  };

  const updateMarkdown = (instanceId, newMarkdown) => {
    setSelectedSections((prev) =>
      prev.map((sec) => (sec.instanceId === instanceId ? { ...sec, markdown: newMarkdown } : sec))
    );
  };

  const updateSectionName = (instanceId, newName) => {
    setSelectedSections((prev) =>
      prev.map((sec) => (sec.instanceId === instanceId ? { ...sec, customName: newName } : sec))
    );
  };

  // Переміщення за стрілочками вгору / вниз
  const moveSection = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= selectedSections.length) return;

    const updated = [...selectedSections];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedItem);
    setSelectedSections(updated);
  };

  // 🆕 Перетягування блоків (Drag-and-Drop) за індексами
  const reorderSections = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    setSelectedSections((prev) => {
      const updated = [...prev];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);
      return updated;
    });
  };

  const clearAll = () => {
    if (confirm('Ви впевнені, що хочете очистити всі секції?')) {
      setSelectedSections([]);
      setActiveInstanceId(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const getFullMarkdown = () => {
    return selectedSections.map((sec) => sec.markdown).join('\n\n');
  };

  return (
    <EditorContext.Provider
      value={{
        availableSections: AVAILABLE_SECTIONS,
        selectedSections,
        activeInstanceId,
        setActiveInstanceId,
        isStructureOpen,
        toggleStructure,
        addSection,
        removeSection,
        updateMarkdown,
        updateSectionName,
        moveSection,
        reorderSections, // Експортуємо функцію перетягування
        clearAll,
        getFullMarkdown
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);