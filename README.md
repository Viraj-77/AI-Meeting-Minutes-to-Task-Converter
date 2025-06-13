# TaskFlow AI - Natural Language Task Manager

A modern, AI-powered task management application that converts natural language into structured tasks. Built with React, TypeScript, and Vite, featuring a clean and intuitive user interface.

## 🌟 Features

### Single Task Mode
- Convert natural language into structured tasks
- Automatic extraction of:
  - Task description
  - Assignee
  - Deadline
  - Priority (P1-P4)

### Meeting Transcript Mode
- Parse entire meeting transcripts into multiple tasks
- Smart sentence detection for multiple tasks
- Batch task creation
- Preview parsed tasks before adding

### Task Management
- Beautiful task cards with priority indicators
- Drag-and-drop task organization
- Filter tasks by status, priority, or assignee
- Search functionality
- Responsive design for all devices

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Date Parsing:** chrono-node
- **Icons:** Lucide React
- **State Management:** React Hooks
- **Storage:** Local Storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskflow-ai.git
   cd taskflow-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 💡 Usage Examples

### Single Task Mode
Input:
```
Finish landing page by tomorrow 5pm P2
```

Output:
- Task: "Finish landing page"
- Due Date: Tomorrow at 5:00 PM
- Priority: P2

### Meeting Transcript Mode
Input:
```
Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight.
```

Output:
1. Task: "Take the landing page"
   - Assignee: Aman
   - Due Date: Tomorrow at 10:00 PM
   - Priority: P3

2. Task: "Client follow-up"
   - Assignee: Rajeev
   - Due Date: Wednesday
   - Priority: P3

3. Task: "Review the marketing deck"
   - Assignee: Shreya
   - Due Date: Tonight
   - Priority: P3

## 🎨 UI Features

- **Task Cards:**
  - Color-coded priority badges
  - Clear assignee display
  - Due date with time
  - Edit and delete options
  - Completion status

- **Task Board:**
  - Grid/List view toggle
  - Filter by status (All/Pending/Completed/Overdue)
  - Search functionality
  - Task statistics

- **Input Modes:**
  - Single task input
  - Meeting transcript parser
  - Real-time task preview

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code linting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [chrono-node](https://github.com/wanasit/chrono) for natural language date parsing
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
 