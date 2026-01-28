import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTodoSchema, type CreateTodoSchema } from '@schemas/todo/todo.schema';

/**
 * Custom hook for Add Todo form
 */
export const useAddTodoForm = () => {
    return useForm<CreateTodoSchema>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(createTodoSchema) as any,
        defaultValues: {
            title: '',
            description: '',
            priority: 'medium',
        },
    });
};
