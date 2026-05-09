import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface FilterBarProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (val: 'all' | 'active' | 'completed') => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

export function FilterBar({ filter, setFilter, searchTerm, setSearchTerm }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex bg-white rounded-xl p-1 border border-slate-200 w-full sm:w-auto">
        {(['all', 'active', 'completed'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              "flex-1 px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all",
              filter === t ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:w-64">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-slate-400 transition-all"
        />
      </div>
    </div>
  );
}
