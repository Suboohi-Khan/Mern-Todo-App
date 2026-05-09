import * as React from 'react';
import { User } from 'firebase/auth';
import { CheckCircle2, LogOut } from 'lucide-react';
import { logOut } from '../../services/firebase';

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <CheckCircle2 size={18} />
          </div>
          <span className="font-bold text-lg tracking-tight">TaskFlow</span>
        </div>
      </div>
    </header>
  );
}
