import React, { useState } from 'react';
import { useEditor } from '../context/EditorContext';

export const BadgeGeneratorModal = ({ isOpen, onClose }) => {
  const { addSection, selectedSections, activeInstanceId, updateMarkdown, availableSections } = useEditor();

  const [label, setLabel] = useState('Build');
  const [message, setMessage] = useState('Passing');
  const [color, setColor] = useState('brightgreen');
  const [style, setStyle] = useState('flat');

  if (!isOpen) return null;

  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(
    message
  )}-${color}?style=${style}`;

  const markdownSnippet = `![${label}: ${message}](${badgeUrl})`;

  const handleInsert = () => {
    const activeSec = selectedSections.find((s) => s.instanceId === activeInstanceId);

    if (activeSec) {
      // Якщо в секції вже є текст, додаємо пробіл або новий рядок. 
      // Щоб йшли в рядок — додаємо через пробіл.
      const separator = activeSec.markdown.trim() ? ' ' : '';
      updateMarkdown(activeSec.instanceId, `${activeSec.markdown.trim()}${separator}${markdownSnippet}`);
    } else {
      const badgeTemplate = availableSections.find((s) => s.id === 'badges') || {
        id: 'badges',
        name: 'Бейджі (Badges)',
        category: 'Основне',
        markdown: ''
      };

      addSection({
        ...badgeTemplate,
        markdown: `${markdownSnippet} `
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl text-white">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
          <h3 className="text-base font-bold flex items-center gap-2">🛡️ Конструктор бейджів</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="bg-gray-950 p-6 rounded-lg border border-gray-800 flex flex-col items-center justify-center gap-2 mb-4">
          <span className="text-xs text-gray-500 uppercase font-semibold">Прев'ю:</span>
          <img src={badgeUrl} alt="Badge Preview" className="h-6" />
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-gray-400 mb-1">Лейбл (ліва частина):</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Текст (права частина):</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 mb-1">Колір:</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
              >
                <option value="brightgreen">Яскраво-зелений</option>
                <option value="green">Зелений</option>
                <option value="blue">Синій</option>
                <option value="red">Червоний</option>
                <option value="orange">Помаранчевий</option>
                <option value="yellow">Жовтий</option>
                <option value="blueviolet">Фіолетовий</option>
                <option value="gray">Сірий</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Стиль:</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
              >
                <option value="flat">Flat</option>
                <option value="flat-square">Flat Square</option>
                <option value="plastic">Plastic</option>
                <option value="for-the-badge">For The Badge</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs font-semibold transition"
          >
            Скасувати
          </button>
          <button
            onClick={handleInsert}
            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-semibold transition"
          >
            Вставити у секцію
          </button>
        </div>
      </div>
    </div>
  );
};