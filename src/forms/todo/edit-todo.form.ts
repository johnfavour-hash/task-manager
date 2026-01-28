import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateTodoSchema, type UpdateTodoSchema } from '@schemas/todo/todo.schema';
import type { Todo } from '@/types/todo.type';

/**
 * Custom hook for Edit Todo form
 */
export const useEditTodoForm = (todo: Todo) => {
    return useForm<UpdateTodoSchema>({
        resolver: zodResolver(updateTodoSchema),
        defaultValues: {
            title: todo.title,
            description: todo.description || '',
            priority: todo.priority,
        },
    });
};
