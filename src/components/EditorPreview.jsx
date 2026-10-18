import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { useEditor } from '../context/EditorContext';
import { BadgeGeneratorModal } from './BadgeGeneratorModal';

export const EditorPreview = () => {
  const {
    selectedSections,
    activeInstanceId,
    isStructureOpen,
    toggleStructure,
    updateMarkdown,
    getFullMarkdown
  } = useEditor();

  const [activeTab, setActiveTab] = useState('split');
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  const activeSection = selectedSections.find((s) => s.instanceId === activeInstanceId);
  const fullMarkdown = getFullMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMarkdown);
    alert('Markdown скопійовано в буфер обміну!');
  };

  const handleDownload = () => {
    const blob = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'README.md';
    link.click();
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-950 text-white">
      {/* Шапка / Панель дій */}
      <header className="h-14 border-b border-gray-800 px-4 flex items-center justify-between bg-gray-900/80">
        <div className="flex items-center gap-3">
          {/* Кнопка згортання / розгортання структури */}
          <button
            onClick={toggleStructure}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
              isStructureOpen
                ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700'
                : 'bg-emerald-950 border-emerald-600 text-emerald-300 hover:bg-emerald-900'
            }`}
            title={isStructureOpen ? 'Приховати панель структури' : 'Показати панель структури'}
          >
            <span>{isStructureOpen ? '◀' : '▶'}</span>
            <span>Структура</span>
          </button>

          {/* Перемикач режимів */}
          <div className="flex bg-gray-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1 rounded-md transition ${
                activeTab === 'split' ? 'bg-emerald-600 text-white font-medium' : 'text-gray-400'
              }`}
            >
              Розділити
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1 rounded-md transition ${
                activeTab === 'edit' ? 'bg-emerald-600 text-white font-medium' : 'text-gray-400'
              }`}
            >
              Редактор
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-md transition ${
                activeTab === 'preview' ? 'bg-emerald-600 text-white font-medium' : 'text-gray-400'
              }`}
            >
              Прев'ю
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs font-semibold rounded-lg border border-gray-700 transition"
          >
            📋 Скопіювати
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold rounded-lg transition"
          >
            ⬇️ Завантажити README.md
          </button>
        </div>
      </header>

      {/* Основна робоча зона */}
      <div className="flex-1 flex overflow-hidden">
        {/* Вікно редактора */}
        {(activeTab === 'split' || activeTab === 'edit') && (
          <div className="flex-1 border-r border-gray-800 flex flex-col h-full bg-gray-900/30">
            {activeSection ? (
              <>
                <div className="px-4 py-2 border-b border-gray-800 text-xs text-gray-400 bg-gray-900/50 flex items-center justify-between">
                  <span>
                    Редагування секції:{' '}
                    <span className="text-emerald-400 font-semibold">{activeSection.customName}</span>
                  </span>

                  {/* Кнопка створення бейджа */}
                  <button
                    onClick={() => setIsBadgeModalOpen(true)}
                    className="py-1 px-2.5 bg-indigo-600/30 border border-indigo-500/50 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-semibold rounded transition flex items-center gap-1"
                  >
                    <span>🛡️</span> Створити бейдж
                  </button>
                </div>

                <textarea
                  value={activeSection.markdown}
                  onChange={(e) => updateMarkdown(activeInstanceId, e.target.value)}
                  className="flex-1 p-4 bg-transparent font-mono text-sm text-gray-200 outline-none resize-none leading-relaxed"
                  placeholder="Пишіть Markdown або HTML..."
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                Оберіть секцію зі списку ліворуч для редагування
              </div>
            )}
          </div>
        )}

        {/* Вікно Live Preview */}
        {(activeTab === 'split' || activeTab === 'preview') && (
          <div className="flex-1 p-6 overflow-y-auto bg-gray-950 text-gray-200">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-extrabold border-b border-gray-800 pb-2 mt-6 mb-4 text-white" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold border-b border-gray-800/60 pb-1.5 mt-6 mb-3 text-white" {...props} />
                ),
                h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-100" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-200" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-gray-300" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-300 pl-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-300 pl-2" {...props} />,
                li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 italic my-4 text-gray-400 bg-gray-900/40 rounded-r" {...props} />
                ),
                // Горизонтальне виведення картинок (зокрема бейджі в рядок)
                img: ({ node, ...props }) => <img className="inline-block mr-1.5 mb-1.5 align-middle" {...props} />,
                code: ({ node, inline, className, children, ...props }) => {
                  return inline ? (
                    <code className="bg-gray-800 text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className={`${className} block bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-800 my-4`} {...props}>
                      {children}
                    </code>
                  );
                },
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="w-full text-left border-collapse border border-gray-800" {...props} />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th className="bg-gray-900 border border-gray-800 p-2 font-bold text-gray-200 text-sm" {...props} />
                ),
                td: ({ node, ...props }) => <td className="border border-gray-800 p-2 text-sm text-gray-300" {...props} />
              }}
            >
              {fullMarkdown || '*Ваш README порожній. Додайте секції, щоб побачити результат.*'}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Модалка генератора бейджів */}
      <BadgeGeneratorModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
      />
    </div>
  );
};