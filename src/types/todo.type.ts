/**
 * Todo Type Definitions
 * Defines the structure for todo items and related DTOs
 */

export interface Collection {
    id: string; // For daily, this can be the date string YYYY-MM-DD
    title: string;
    type: 'daily' | 'project';
    color?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    collectionId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTodoDTO {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    collectionId?: string;
}

export interface UpdateTodoDTO {
    title?: string;
    description?: string;
    completed?: boolean;
    priority?: 'low' | 'medium' | 'high';
    collectionId?: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoStats {
    total: number;
    active: number;
    completed: number;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    collectionId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateNoteDTO {
    title: string;
    content: string;
    collectionId?: string;
}


