import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { db, auth, signInWithGoogle } from './services/firebase';
import { Todo, TodoCategory, TodoPriority } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Search
} from 'lucide-react';
import { Header } from './components/layout/Header';
import { TodoForm } from './features/todos/components/TodoForm';
import { TodoItem } from './features/todos/components/TodoItem';
import { FilterBar } from './features/todos/components/FilterBar';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const [priority, setPriority] = useState<TodoPriority>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const PUBLIC_USER_ID = 'guest_user';

  useEffect(() => {
    const q = query(
      collection(db, 'todos'),
      where('userId', '==', PUBLIC_USER_ID),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTodos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Todo[];
      setTodos(fetchedTodos);
    }, (error) => {
      console.error("Firestore error:", error);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await addDoc(collection(db, 'todos'), {
        text: newTodo,
        completed: false,
        userId: PUBLIC_USER_ID,
        createdAt: serverTimestamp(),
        category,
        priority
      });
      setNewTodo('');
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || (filter === 'completed' ? todo.completed : !todo.completed);
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <TodoForm 
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          category={category}
          setCategory={setCategory}
          priority={priority}
          setPriority={setPriority}
          onAdd={handleAddTodo}
        />

        <FilterBar 
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="space-y-3">
          <AnimatePresence mode='popLayout'>
            {filteredTodos.map((todo) => (
              <TodoItem 
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </AnimatePresence>

          {filteredTodos.length === 0 && (
            <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={20} />
              </div>
              <p className="text-slate-500 font-medium">No tasks found</p>
              <p className="text-slate-400 text-xs">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </main>

      {/* Status Indicators */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none">
        <div className="max-w-2xl mx-auto flex justify-center">
          <div className="bg-slate-900/90 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-xl flex items-center gap-6 pointer-events-auto">
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /> Firebase</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Express</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> React</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Node</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
