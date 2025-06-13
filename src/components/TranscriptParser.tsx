import { useState } from 'react';
import { FileText, Lightbulb } from 'lucide-react';
import { parseNaturalLanguageTask } from '../utils/taskParser';
import { ParsedTask } from '../types/Task';

interface TranscriptParserProps {
  onAddTasks: (tasks: ParsedTask[]) => void;
}

export function TranscriptParser({ onAddTasks }: TranscriptParserProps) {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState<ParsedTask[]>([]);

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim()) {
      // Split input into sentences and parse each one
      const sentences = value.split(/[.!?]+/).filter(s => s.trim());
      const parsedTasks = sentences.map(sentence => parseNaturalLanguageTask(sentence.trim()));
      setPreview(parsedTasks);
    } else {
      setPreview([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const sentences = input.split(/[.!?]+/).filter(s => s.trim());
      const parsedTasks = sentences.map(sentence => parseNaturalLanguageTask(sentence.trim()));
      onAddTasks(parsedTasks);
      setInput('');
      setPreview([]);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'No due date';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'text-red-600 bg-red-50 border-red-200';
      case 'P2': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'P3': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'P4': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Parse Meeting Transcript</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Paste your meeting transcript here... Each sentence will be parsed as a separate task."
            className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 resize-none h-48"
            rows={6}
          />
          {input && (
            <button
              type="submit"
              className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Parse Tasks
            </button>
          )}
        </div>

        {preview.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-800">Preview ({preview.length} tasks)</h3>
            </div>
            
            <div className="space-y-4">
              {preview.map((task, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Task</label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-800">{task.taskName || 'Untitled task'}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Assignee</label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-800">{task.assignee || 'Unassigned'}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Due Date</label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-800">{formatDate(task.dueDate)}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Priority</label>
                      <div className={`p-3 rounded-lg ${getPriorityColor(task.priority)}`}>
                        <p className="font-medium">{task.priority}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 