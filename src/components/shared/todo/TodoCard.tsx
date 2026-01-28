import { Box, Checkbox, IconButton, Text, HStack, VStack, Badge } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Todo } from '@/types/todo.type';

interface TodoCardProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (id: string) => void;
}

export const TodoCard = ({ todo, onToggle, onEdit, onDelete }: TodoCardProps) => {
    const [isChecked, setIsChecked] = useState(todo.completed);

    // Sync local state with prop when it changes externally
    useEffect(() => {
        // eslint-disable-next-line
        setIsChecked(todo.completed);
    }, [todo.completed]);

    const handleToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState); // Instant UI update
        onToggle(todo.id); // Trigger actual store update
    };

    const priorityColors = {
        low: 'green',
        medium: 'yellow',
        high: 'red',
    };

    return (
        <Box
            position="relative"
            bg={{ base: "#FFFFFF", _dark: "#1F2937" }}
            borderRadius="xl"
            p={5}
            border="1px solid"
            borderColor={{ base: "#F3F4F6", _dark: "#374151" }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
                transform: 'translateY(-2px)',
                boxShadow: { base: '0 4px 12px rgba(0, 0, 0, 0.05)', _dark: '0 4px 12px rgba(0, 0, 0, 0.3)' },
                borderColor: '#1D4ED8',
            }}
            css={{
                '&:hover::before': {
                    opacity: 1,
                },
            }}
        >
            <HStack gap={4} align="flex-start">
                {/* Checkbox */}
                <Checkbox.Root
                    size="lg"
                    checked={isChecked}
                    onCheckedChange={handleToggle}
                    mt={1}
                    css={{
                        '& .chakra-checkbox__control': {
                            borderRadius: '6px',
                            borderWidth: '2px',
                            borderColor: { base: '#e5e7eb', _dark: '#4B5563' },
                            transition: 'all 0.2s',
                        },
                        '& .chakra-checkbox__control[data-checked]': {
                            background: '#1D4ED8',
                            borderColor: '#1D4ED8',
                            transform: 'scale(1.1)',
                        },
                    }}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                </Checkbox.Root>
                {/* Content */}
                <VStack flex={1} align="stretch" gap={2}>
                    <HStack justify="space-between">
                        <Text
                            fontSize="lg"
                            fontWeight="600"
                            color={isChecked
                                ? { base: '#9CA3AF', _dark: '#6B7280' }
                                : { base: '#111827', _dark: '#F9FAFB' }
                            }
                            textDecoration={isChecked ? 'line-through' : 'none'}
                            transition="all 0.3s"
                        >
                            {todo.title}
                        </Text>
                        <Badge
                            colorScheme={priorityColors[todo.priority]}
                            borderRadius="full"
                            px={3}
                            py={1}
                            fontSize="xs"
                            textTransform="capitalize"
                        >
                            {todo.priority}
                        </Badge>
                    </HStack>

                    {todo.description && (
                        <Text
                            fontSize="sm"
                            color={isChecked
                                ? { base: '#9CA3AF', _dark: '#6B7280' }
                                : { base: '#4B5563', _dark: '#D1D5DB' }
                            }
                            transition="all 0.3s"
                        >
                            {todo.description}
                        </Text>
                    )}

                    <Text fontSize="xs" color={{ base: "#6B7280", _dark: "#9CA3AF" }} mt={1}>
                        {new Date(todo.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </Text>
                </VStack>

                {/* Actions */}
                <HStack gap={1}>
                    <IconButton
                        aria-label="Edit todo"
                        size="sm"
                        variant="ghost"
                        color={{ base: "#4B5563", _dark: "#D1D5DB" }}
                        borderRadius="lg"
                        onClick={() => onEdit(todo)}
                        transition="all 0.2s"
                        _hover={{
                            bg: { base: '#EFF6FF', _dark: 'rgba(29, 78, 216, 0.2)' },
                            color: '#1D4ED8',
                        }}
                    >
                        <Edit size={18} />
                    </IconButton>
                    <IconButton
                        aria-label="Delete todo"
                        size="sm"
                        variant="ghost"
                        color={{ base: "#4B5563", _dark: "#D1D5DB" }}
                        borderRadius="lg"
                        onClick={() => onDelete(todo.id)}
                        transition="all 0.2s"
                        _hover={{
                            bg: { base: '#FEF2F2', _dark: 'rgba(239, 68, 68, 0.2)' },
                            color: '#EF4444',
                        }}
                    >
                        <Trash2 size={18} />
                    </IconButton>
                </HStack>
            </HStack>
        </Box >
    );
};
