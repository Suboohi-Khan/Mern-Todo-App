export type TodoCategory = 'personal' | 'work' | 'shopping' | 'health' | 'other';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  createdAt: any; // Firestore Timestamp
  category?: TodoCategory;
  priority?: TodoPriority;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: any;
}
