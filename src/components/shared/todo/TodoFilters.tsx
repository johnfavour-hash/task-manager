import { HStack, Button, Badge, Text } from '@chakra-ui/react';
import type { TodoFilter, TodoStats } from '@/types/todo.type';

interface TodoFiltersProps {
    currentFilter: TodoFilter;
    stats: TodoStats;
    onFilterChange: (filter: TodoFilter) => void;
}

const filters: { value: TodoFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
];

export const TodoFilters = ({ currentFilter, stats, onFilterChange }: TodoFiltersProps) => {
    const getCount = (filter: TodoFilter) => {
        switch (filter) {
            case 'all':
                return stats.total;
            case 'active':
                return stats.active;
            case 'completed':
                return stats.completed;
        }
    };

    return (
        <HStack
            gap={3}
            p={2}
            bg={{ base: "#FFFFFF", _dark: "#1F2937" }}
            borderRadius="xl"
            border="1px solid"
            borderColor={{ base: "#F3F4F6", _dark: "#374151" }}
            flexWrap="wrap"
            justify="center"
            transition="all 0.3s ease"
        >
            {filters.map((filter) => {
                const isActive = currentFilter === filter.value;
                const count = getCount(filter.value);

                return (
                    <Button
                        key={filter.value}
                        size="md"
                        variant={isActive ? 'solid' : 'ghost'}
                        onClick={() => onFilterChange(filter.value)}
                        position="relative"
                        borderRadius="lg"
                        px={6}
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        bg={isActive ? '#1D4ED8' : 'transparent'}
                        color={isActive ? '#FFFFFF' : { base: '#4B5563', _dark: '#9CA3AF' }}
                        _hover={{
                            bg: isActive ? '#1e40af' : { base: '#EFF6FF', _dark: '#374151' },
                            color: isActive ? 'white' : '#1D4ED8',
                        }}
                        _active={{
                            transform: 'translateY(0)',
                        }}
                    >
                        <HStack gap={2}>
                            <Text fontWeight="600">{filter.label}</Text>
                            <Badge
                                borderRadius="full"
                                px={2}
                                py={0.5}
                                fontSize="xs"
                                bg={isActive ? 'rgba(255, 255, 255, 0.2)' : { base: '#EFF6FF', _dark: 'rgba(29, 78, 216, 0.2)' }}
                                color={isActive ? 'white' : '#1D4ED8'}
                            >
                                {count}
                            </Badge>
                        </HStack>
                    </Button>
                );
            })}
        </HStack>
    );
};
