# 📊 Sheets

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-State_Management-purple)
![Sass](https://img.shields.io/badge/Sass-Styling-pink)

🌐 **Live Demo:** https://sheet-zeta.vercel.app/

Spreadsheet-style web application built with React, TypeScript, Redux Toolkit, and Sass.

The project combines interaction patterns commonly found in modern spreadsheet editors such as Google Sheets and Microsoft Excel. It focuses on implementing complex table interactions, scalable state management, reusable UI components, and maintainable frontend architecture.

The application supports cell selection, multi-cell selection, range selection, drag selection, synchronized scrolling, and spreadsheet-like navigation while maintaining a clean and modular codebase.

---

## ✨ Features

### 🖱️ Spreadsheet Interactions

- Single cell selection
- Active cell tracking
- Multi-cell selection using Ctrl
- Range selection using Shift
- Drag-to-select cell ranges
- Spreadsheet-like selection behavior

### 🎨 User Interface

- Spreadsheet grid layout
- Column and row headers
- Toolbar actions
- Dropdown components
- Color selector component
- Selection border visualization
- Synchronized table scrolling

### 🏗️ Architecture

- React functional components
- TypeScript
- Redux Toolkit
- React Redux
- Custom React hooks
- Modular project structure
- Reusable UI components
- Sass styling

---

## 🚀 Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Redux
- Sass
- Create React App

---

## 📂 Project Structure

```text
src
├── assets
├── components
│   ├── button
│   ├── cell
│   ├── color-selector
│   ├── dropdown
│   ├── header
│   ├── menu
│   ├── selection-border
│   ├── sheet
│   ├── sheet-menu
│   ├── sheets
│   └── tools
├── constants
├── features
│   ├── selectCell
│   └── table
├── hooks
├── pages
├── store
├── styles
└── App.tsx
```

### Folder Responsibilities

| Folder     | Purpose                    |
| ---------- | -------------------------- |
| components | Reusable UI components     |
| features   | Redux Toolkit slices       |
| hooks      | Custom React hooks         |
| store      | Global state configuration |
| styles     | Global styling             |
| assets     | Icons and static resources |
| pages      | Page-level components      |

---

## 🧠 State Management

The application uses Redux Toolkit to manage spreadsheet state in a predictable and scalable way.

### 📑 Table Slice

Stores spreadsheet-related data:

```ts
{
  cells: {},
  columns: {},
  rows: {}
}
```

### 🎯 Selection Slice

Stores active and selected cells:

```ts
{
  activeCell: string,
  selectedCells: string[]
}
```

This separation allows spreadsheet interactions and table data to evolve independently.

---

## 🪝 Custom Hooks

The project uses custom React hooks to isolate spreadsheet interaction logic from presentation components.

Examples include:

- Cell selection handling
- Range selection calculations
- Mouse interaction processing
- Spreadsheet behavior management

This approach improves maintainability, readability, and reusability.

---

## ⚡ Getting Started

### 📥 Clone Repository

```bash
git clone https://github.com/nikitaKor98/sheet.git
cd sheet
```

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Run Development Server

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🛠️ Available Scripts

### ▶️ Start Development Server

```bash
npm start
```

### 📦 Create Production Build

```bash
npm run build
```

### 🧪 Run Tests

```bash
npm test
```

---

## 📚 What I Practiced

- Building spreadsheet-like interfaces
- Designing complex UI interactions
- Redux Toolkit architecture
- TypeScript in React applications
- Custom React hooks
- Component decomposition
- Global state management
- Event-driven UI development
- Scalable frontend architecture

---

## 🔮 Future Improvements

- Cell editing
- Formula support
- Copy / Paste
- Keyboard navigation
- Undo / Redo
- CSV import/export
- Local storage persistence
- Row and column resizing
- Unit and integration tests

---

## 👨‍💻 Author

Nikita Korytnikov

GitHub: https://github.com/nikitaKor98
