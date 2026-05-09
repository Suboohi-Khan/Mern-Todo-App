import * as React from 'react';
import { Todo, TodoCategory, TodoPriority } from '../../../types';
import { Plus, Tag, AlertCircle } from 'lucide-react';

interface TodoFormProps {
  newTodo: string;
  setNewTodo: (val: string) => void;
  category: TodoCategory;
  setCategory: (val: TodoCategory) => void;
  priority: TodoPriority;
  setPriority: (val: TodoPriority) => void;
  onAdd: (e: React.FormEvent) => void;
}

export function TodoForm({
  newTodo,
  setNewTodo,
  category,
  setCategory,
  priority,
  setPriority,
  onAdd
}: TodoFormProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 mb-8">
      <form onSubmit={onAdd} className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 transition-all outline-none text-slate-700 placeholder:text-slate-400"
          />
          <button 
            type="submit"
            disabled={!newTodo.trim()}
            className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Plus size={24} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Tag size={14} className="text-slate-400" />
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as TodoCategory)}
              className="text-xs font-medium bg-slate-100 border-none rounded-lg px-2 py-1 outline-none text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className="text-slate-400" />
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value as TodoPriority)}
              className="text-xs font-medium bg-slate-100 border-none rounded-lg px-2 py-1 outline-none text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
