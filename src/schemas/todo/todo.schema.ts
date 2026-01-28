import { z } from 'zod';

/**
 * Zod Schema for creating a new todo
 */
export const createTodoSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title must be less than 100 characters')
        .trim(),
    description: z
        .string()
        .max(500, 'Description must be less than 500 characters')
        .trim()
        .optional(),
    priority: z.enum(['low', 'medium', 'high']).default('medium').optional(),
    collectionId: z.string().optional(),
});

/**
 * Zod Schema for updating an existing todo
 */
export const updateTodoSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title must be less than 100 characters')
        .trim()
        .optional(),
    description: z
        .string()
        .max(500, 'Description must be less than 500 characters')
        .trim()
        .optional(),
    completed: z.boolean().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
});

export type CreateTodoSchema = z.infer<typeof createTodoSchema>;
export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>;
