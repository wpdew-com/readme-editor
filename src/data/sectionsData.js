export const AVAILABLE_SECTIONS = [
  {
    id: 'title-description',
    name: 'Заголовок та опис',
    category: 'Основне',
    markdown: `# 🚀 Назва проєкту\n\nКороткий та влучний опис того, що робить цей проєкт, яку проблему він вирішує і для кого створений.\n`
  },
  {
    id: 'html-banner',
    name: 'HTML Центрування / Баннер',
    category: 'Медіа',
    markdown: `<div align="center">\n  <img src="https://via.placeholder.com/600x150" alt="Banner" />\n  <br>\n  <h3>Ласкаво просимо до мого профілю!</h3>\n</div>\n`
  },
  {
    id: 'code-examples',
    name: 'Приклад коду / API',
    category: 'Розробка',
    markdown: `## 💻 Приклад використання коду\n\nНижче наведено приклад швидкої ініціалізації та використання:\n\n\`\`\`javascript\nimport { createServer } from 'http';\n\nconst server = createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({ status: 'success', message: 'Hello World!' }));\n});\n\nserver.listen(3000, () => {\n  console.log('Server running on http://localhost:3000');\n});\n\`\`\`\n`
  },
  {
    id: 'badges',
    name: 'Бейджі (Badges)',
    category: 'Основне',
    markdown: `![License](https://img.shields.io/badge/license-MIT-blue.svg)\n![Version](https://img.shields.io/badge/version-1.0.0-green.svg)\n![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)\n`
  },
  {
    id: 'tech-stack',
    name: 'Стек технологій',
    category: 'Розробка',
    markdown: `## 🛠 Стек технологій\n\n- **Frontend:** React, Tailwind CSS, Vite\n- **Backend:** Node.js, Express / Laravel (PHP)\n- **Database:** PostgreSQL / Redis\n- **Tools:** Docker, Git, n8n\n`
  },
  {
    id: 'features',
    name: 'Можливості та фічі',
    category: 'Основне',
    markdown: `## ✨ Основні можливості\n\n- ⚡ **Швидке завантаження:** Оптимізований код та мінімальний розмір ресурсів.\n- 🎨 **Кастомні теми:** Підтримка темної та світлої теми UI.\n- 📱 **Адаптивність:** Ідеальний вигляд на мобільних пристроях та десктопі.\n- 🔒 **Безпека:** Надійне оброблення даних та валідація.\n`
  },
  {
    id: 'installation',
    name: 'Установка та запуск',
    category: 'Розробка',
    markdown: `## 🚀 Установка та запуск\n\n1. Клонуйте репозиторій:\n\`\`\`bash\ngit clone https://github.com/username/project-name.git\ncd project-name\n\`\`\`\n\n2. Встановіть залежності:\n\`\`\`bash\nnpm install\n\`\`\`\n\n3. Запустіть проєкт у режимі розробки:\n\`\`\`bash\nnpm run dev\n\`\`\`\n`
  },
  {
    id: 'environment-variables',
    name: 'Змінні оточення (.env)',
    category: 'Розробка',
    markdown: `## 🔑 Змінні оточення\n\nДля роботи проєкту створіть файл \`.env\` у корені та додайте наступні параметри:\n\n\`\`\`env\nPORT=3000\nDATABASE_URL=postgres://user:password@localhost:5432/dbname\nAPI_KEY=your_api_key_here\n\`\`\`\n`
  },
  {
    id: 'demo-screenshots',
    name: 'Скріншоти та Демо',
    category: 'Медіа',
    markdown: `## 📷 Скріншоти\n\n![Скріншот головного екрана](https://via.placeholder.com/800x400 "Головний екран")\n`
  },
  {
    id: 'faq',
    name: 'Часті запитання (FAQ)',
    category: 'Документація',
    markdown: `## ❓ Часті запитання (FAQ)\n\n#### Як змінити конфігурацію?\nВідредагуйте файл \`config.json\` у кореневій папці проєкту.\n\n#### Чи є підтримка Docker?\nТак, у корені проєкту є готові \`Dockerfile\` та \`docker-compose.yml\`.\n`
  },
  {
    id: 'license',
    name: 'Ліцензія',
    category: 'Документація',
    markdown: `## 📄 Ліцензія\n\nЦей проєкт розповсюджується під ліцензією [MIT](LICENSE).\n`
  }
];