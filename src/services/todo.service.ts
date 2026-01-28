import type { Todo, CreateTodoDTO, UpdateTodoDTO } from '@/types/todo.type';

/**
 * Todo Service
 * Handles all API interactions for todo operations
 * Currently using mock implementation - can be replaced with real API calls
 */

class TodoService {
    /**
     * Fetch all todos
     */
    async getTodos(): Promise<Todo[]> {
        // Mock implementation - replace with actual API call
        // return axios.get('/api/todos').then(res => res.data);
        return Promise.resolve([]);
    }

    /**
     * Create a new todo
     */
    async createTodo(data: CreateTodoDTO): Promise<Todo> {
        // Mock implementation
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: data.title,
            description: data.description,
            priority: data.priority || 'medium',
            completed: false,
            collectionId: data.collectionId || 'default',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // return axios.post('/api/todos', data).then(res => res.data);
        return Promise.resolve(newTodo);
    }

    /**
     * Update an existing todo
     */
    async updateTodo(id: string, data: UpdateTodoDTO): Promise<Todo> {
        // Mock implementation
        const updatedTodo: Todo = {
            id,
            title: data.title || '',
            description: data.description,
            priority: data.priority || 'medium',
            completed: data.completed || false,
            collectionId: data.collectionId || 'default',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // return axios.patch(`/api/todos/${id}`, data).then(res => res.data);
        return Promise.resolve(updatedTodo);
    }

    /**
     * Delete a todo
     */
    async deleteTodo(id: string): Promise<void> {
        // Mock implementation
        // return axios.delete(`/api/todos/${id}`);
        console.log("Delete todo", id);
        return Promise.resolve();
    }

    /**
   * Toggle todo completion status
   */
    async toggleTodo(todoId: string, completed: boolean): Promise<Todo> {
        return this.updateTodo(todoId, { completed });
    }
}

export default new TodoService();
