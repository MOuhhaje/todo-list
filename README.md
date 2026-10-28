# Ma To-do List

A simple and responsive To-do List application built with React and a small Node.js backend. Manage your daily tasks through a clean interface with a purple and pink gradient design. Tasks are saved on the server, so they persist between sessions.

## Preview

![Ma To-do List screenshot](./public/preview.png)

> Add a screenshot at `public/preview.png` (or change the path above).

## Features

- **Add tasks**: create a new task by entering a title.
- **Display tasks**: view all your tasks in a list.
- **Search tasks**: find a task by its title.
- **Edit tasks**: modify an existing task.
- **Delete tasks**: remove tasks you no longer need.
- **Track completion**: mark tasks as completed with a checkbox.
- **Task statistics**: see the total, completed, and remaining tasks.
- **Persistent storage**: tasks are stored by the backend in `tasks.json`.
- **Responsive design**: a simple interface that works on desktop and mobile.

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- Node.js (backend API)
- HTML5 / CSS3

## Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm installed.

### 1. Clone the repository

```bash
git clone https://github.com/mouhhaje/todo-list.git
cd todo-list
```

### 2. Install dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 3. Start the backend

```bash
cd backend
node server.js
```

### 4. Start the frontend

In a second terminal, from the project root:

```bash
npm run dev
```

Open the local URL displayed in your terminal to use the application.

## Project Structure

```
todo-list/
├── backend/
│   ├── server.js        # API server
│   ├── tasks.json       # Task storage
│   └── package.json
├── public/
├── src/
│   ├── assets/
│   ├── api.js           # Frontend calls to the backend
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Future Improvements

- Drag-and-drop task reordering
- Task categories and priorities
- Due dates and deadlines
- Filtering by completion status
- Replace `tasks.json` with a real database

## Author

Oussama Mouhhaje

## License

This project is available for educational and personal use.