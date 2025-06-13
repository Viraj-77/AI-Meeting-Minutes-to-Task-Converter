import React, { useState, useEffect } from 'react';
import { TaskInput } from './components/TaskInput';
import { TranscriptParser } from './components/TranscriptParser';
import { TaskBoard } from './components/TaskBoard';
import { Task, ParsedTask } from './types/Task';
import { CheckSquare, Sparkles, FileText, Plus } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mode, setMode] = useState<'single' | 'transcript'>('single');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('naturalLanguageTasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => {
        let dueDate = null;
        if (task.dueDate) {
          const dateObj = new Date(task.dueDate);
          // Check if the date is valid
          if (!isNaN(dateObj.getTime())) {
            dueDate = dateObj;
          }
        }
        return {
          ...task,
          dueDate
        };
      });
      setTasks(parsedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('naturalLanguageTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (parsedTask: ParsedTask) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...parsedTask,
      completed: false,
      originalInput: `${parsedTask.taskName} ${parsedTask.assignee ? `by ${parsedTask.assignee}` : ''} ${parsedTask.dueDate ? parsedTask.dueDate.toLocaleDateString() : ''} ${parsedTask.priority}`.trim()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const addMultipleTasks = (parsedTasks: ParsedTask[]) => {
    const newTasks: Task[] = parsedTasks.map(parsedTask => ({
      id: crypto.randomUUID(),
      ...parsedTask,
      completed: false,
      originalInput: `${parsedTask.taskName} ${parsedTask.assignee ? `by ${parsedTask.assignee}` : ''} ${parsedTask.dueDate ? parsedTask.dueDate.toLocaleDateString() : ''} ${parsedTask.priority}`.trim()
    }));
    setTasks(prev => [...newTasks, ...prev]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TaskFlow AI
            </h1>
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-6">
            Transform natural language into organized tasks with AI-powered parsing.
            Just type like you think, and we'll handle the rest.
          </p>

          {/* Mode Switcher */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setMode('single')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                mode === 'single'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Plus className="w-5 h-5" />
              Single Task
            </button>
            <button
              onClick={() => setMode('transcript')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                mode === 'transcript'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5" />
              Meeting Transcript
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mode === 'single' ? (
          <TaskInput onAddTask={addTask} />
        ) : (
          <TranscriptParser onAddTasks={addMultipleTasks} />
        )}
        <TaskBoard 
          tasks={tasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;