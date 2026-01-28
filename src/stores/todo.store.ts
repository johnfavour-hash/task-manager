import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo, CreateTodoDTO, UpdateTodoDTO, TodoFilter, TodoStats, Note, CreateNoteDTO, Collection } from '@/types/todo.type';

interface TodoStore {
    // State
    todos: Todo[];
    notes: Note[];
    collections: Collection[];
    activeCollectionId: string; // 'all' or collection ID
    filter: TodoFilter;

    // Actions
    addTodo: (data: CreateTodoDTO) => void;
    updateTodo: (id: string, data: UpdateTodoDTO) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    setFilter: (filter: TodoFilter) => void;
    clearCompleted: () => void;

    // Note Actions
    addNote: (data: CreateNoteDTO) => void;
    updateNote: (id: string, data: Partial<CreateNoteDTO>) => void;
    deleteNote: (id: string) => void;

    // Collection Actions
    addCollection: (title: string, type: 'daily' | 'project', id?: string) => string;
    deleteCollection: (id: string) => void;
    setActiveCollection: (id: string) => void;
    getOrCreateDailyCollection: (date?: Date) => string;

    // Selectors
    getFilteredTodos: () => Todo[];
    getFilteredNotes: () => Note[];
    getStats: () => TodoStats;
}

const getTodayId = (date = new Date()) => {
    return date.toISOString().split('T')[0];
};

export const useTodoStore = create<TodoStore>()(
    persist(
        (set, get) => ({
            // Initial state
            todos: [],
            notes: [],
            collections: [],
            activeCollectionId: getTodayId(),
            filter: 'all',

            // Helper to get or create daily collection
            getOrCreateDailyCollection: (date = new Date()) => {
                const id = getTodayId(date);
                const { collections } = get();
                const existing = collections.find(c => c.id === id);

                if (existing) return id;

                const newCollection: Collection = {
                    id,
                    title: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
                    type: 'daily',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                set((state) => ({
                    collections: [newCollection, ...state.collections],
                }));

                return id;
            },

            // Collection Actions
            addCollection: (title, type, id) => {
                const newId = id || crypto.randomUUID();
                const newCollection: Collection = {
                    id: newId,
                    title,
                    type,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                set((state) => ({
                    collections: [newCollection, ...state.collections],
                }));
                return newId;
            },

            deleteCollection: (id) => {
                set((state) => ({
                    collections: state.collections.filter(c => c.id !== id),
                    todos: state.todos.filter(t => t.collectionId !== id),
                    notes: state.notes.filter(n => n.collectionId !== id),
                    activeCollectionId: state.activeCollectionId === id ? getTodayId() : state.activeCollectionId
                }));
            },

            setActiveCollection: (id) => {
                set({ activeCollectionId: id });
            },

            // Note Actions
            addNote: (data: CreateNoteDTO) => {
                const collectionId = data.collectionId || get().getOrCreateDailyCollection();
                const newNote: Note = {
                    id: crypto.randomUUID(),
                    title: data.title,
                    content: data.content,
                    collectionId: collectionId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                set((state) => ({
                    notes: [newNote, ...state.notes],
                }));
            },

            updateNote: (id: string, data: Partial<CreateNoteDTO>) => {
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note.id === id
                            ? { ...note, ...data, updatedAt: new Date() }
                            : note
                    ),
                }));
            },

            deleteNote: (id: string) => {
                set((state) => ({
                    notes: state.notes.filter((note) => note.id !== id),
                }));
            },

            // Add a new todo
            addTodo: (data: CreateTodoDTO) => {
                const collectionId = data.collectionId || get().getOrCreateDailyCollection();
                const newTodo: Todo = {
                    id: crypto.randomUUID(),
                    title: data.title,
                    description: data.description,
                    priority: data.priority || 'medium',
                    completed: false,
                    collectionId: collectionId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                set((state) => ({
                    todos: [newTodo, ...state.todos],
                }));
            },

            // Update an existing todo
            updateTodo: (id: string, data: UpdateTodoDTO) => {
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id
                            ? { ...todo, ...data, updatedAt: new Date() }
                            : todo
                    ),
                }));
            },

            // Delete a todo
            deleteTodo: (id: string) => {
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                }));
            },

            // Toggle todo completion
            toggleTodo: (id: string) => {
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id
                            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
                            : todo
                    ),
                }));
            },

            // Set filter
            setFilter: (filter: TodoFilter) => {
                set({ filter });
            },

            // Clear all completed todos
            clearCompleted: () => {
                const { activeCollectionId } = get();
                set((state) => ({
                    todos: state.todos.filter((todo) => {
                        if (activeCollectionId !== 'all' && todo.collectionId !== activeCollectionId) return true;
                        return !todo.completed;
                    }),
                }));
            },

            // Get filtered todos based on current filter AND active collection
            getFilteredTodos: () => {
                const { todos, filter, activeCollectionId } = get();
                let filtered = todos;

                if (activeCollectionId !== 'all') {
                    filtered = filtered.filter(t => t.collectionId === activeCollectionId);
                }

                switch (filter) {
                    case 'active':
                        return filtered.filter((todo) => !todo.completed);
                    case 'completed':
                        return filtered.filter((todo) => todo.completed);
                    default:
                        return filtered;
                }
            },

            getFilteredNotes: () => {
                const { notes, activeCollectionId } = get();
                if (activeCollectionId === 'all') return notes;
                return notes.filter(n => n.collectionId === activeCollectionId);
            },

            // Get statistics for the active collection
            getStats: () => {
                const { todos, activeCollectionId } = get();
                const filtered = activeCollectionId === 'all'
                    ? todos
                    : todos.filter(t => t.collectionId === activeCollectionId);

                return {
                    total: filtered.length,
                    active: filtered.filter((todo) => !todo.completed).length,
                    completed: filtered.filter((todo) => todo.completed).length,
                };
            },
        }),
        {
            name: 'todo-storage',
            // Rehydrate dates
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.todos = state.todos.map(t => ({
                        ...t,
                        createdAt: new Date(t.createdAt),
                        updatedAt: new Date(t.updatedAt)
                    }));
                    state.notes = state.notes.map(n => ({
                        ...n,
                        createdAt: new Date(n.createdAt),
                        updatedAt: new Date(n.updatedAt)
                    }));
                    state.collections = state.collections.map(c => ({
                        ...c,
                        createdAt: new Date(c.createdAt),
                        updatedAt: new Date(c.updatedAt)
                    }));
                }
            }
        }
    )
);
