import * as React from 'react';
import { Todo } from '../../../types';
import { motion } from 'motion/react';
import { Trash2, Tag, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { format } from 'date-fns';

interface TodoItemProps {
  key?: string | number;
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "group bg-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 transition-all hover:border-slate-200",
        todo.completed && "opacity-60 grayscale-[0.5]"
      )}
    >
      <button 
        onClick={() => onToggle(todo)}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
          todo.completed ? "bg-slate-900 border-slate-900 text-white" : "border-slate-200 hover:border-slate-400"
        )}
      >
        {todo.completed && <Check size={14} strokeWidth={4} />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-slate-700 font-medium truncate leading-snug",
          todo.completed && "line-through text-slate-400"
        )}>
          {todo.text}
        </p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className={cn(
            "text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-md",
            todo.priority === 'high' ? "bg-red-50 text-red-600" :
            todo.priority === 'medium' ? "bg-amber-50 text-amber-600" :
            "bg-blue-50 text-blue-600"
          )}>
            {todo.priority || 'medium'}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1">
            <Tag size={10} />
            {todo.category || 'personal'}
          </span>
          <span className="text-[10px] text-slate-300 font-medium">
            {todo.createdAt ? format(todo.createdAt.toDate(), 'MMM d, h:mm a') : 'Just now'}
          </span>
        </div>
      </div>

      <button 
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 hover:text-red-500 text-slate-400 rounded-lg transition-all"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
}
