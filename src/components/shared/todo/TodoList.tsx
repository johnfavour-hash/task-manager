import { VStack, Text, Box } from '@chakra-ui/react';
import { CheckCircle2 } from 'lucide-react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { TodoCard } from './TodoCard';
import type { Todo } from '@/types/todo.type';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (id: string) => void;
}

export const TodoList = ({ todos, onToggle, onEdit, onDelete }: TodoListProps) => {
    const iconColor = useColorModeValue("#1D4ED8", "#60A5FA");

    if (todos.length === 0) {
        return (
            <VStack
                py={20}
                gap={4}
                opacity={0.6}
                animation="fadeIn 0.5s ease-out"
            >
                <Box
                    p={6}
                    borderRadius="full"
                    bg={{ base: "rgba(29, 78, 216, 0.1)", _dark: "rgba(96, 165, 250, 0.1)" }}
                    border="2px dashed"
                    borderColor={{ base: "rgba(29, 78, 216, 0.3)", _dark: "rgba(96, 165, 250, 0.3)" }}
                >
                    <CheckCircle2 size={48} color={iconColor} />
                </Box>
                <Text
                    fontSize="xl"
                    fontWeight="600"
                    color={{ base: "#1D4ED8", _dark: "#60A5FA" }}
                >
                    No tasks yet
                </Text>
                <Text fontSize="sm" color={{ base: "gray.500", _dark: "gray.400" }} textAlign="center" maxW="300px">
                    Create your first task to get started on your journey to productivity
                </Text>
            </VStack>
        );
    }

    return (
        <VStack gap={4} align="stretch" w="full">
            {todos.map((todo, index) => (
                <Box
                    key={todo.id}
                    animation={`slideInUp 0.4s ease-out ${index * 0.1}s both`}
                >
                    <TodoCard
                        todo={todo}
                        onToggle={onToggle}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Box>
            ))}
        </VStack>
    );
};
