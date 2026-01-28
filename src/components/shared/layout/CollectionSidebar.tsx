import { useState } from 'react';
import { VStack, HStack, Text, IconButton, Button } from '@chakra-ui/react';
import { LuCalendar, LuFolder, LuPlus, LuNotebook } from 'react-icons/lu';
import { useTodoStore } from '@stores/todo.store';
import { AddCollectionModal } from './AddCollectionModal';

export const CollectionSidebar = () => {
    const {
        collections,
        activeCollectionId,
        setActiveCollection,
    } = useTodoStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const dailyCollections = collections.filter(c => c.type === 'daily');
    const projectCollections = collections.filter(c => c.type === 'project');

    const handleAddProject = () => {
        setIsAddModalOpen(true);
    };

    return (
        <VStack gap={6} align="stretch" w="full">
            {/* Quick Navigation */}
            <VStack gap={2} align="stretch">
                <Text fontSize="xs" fontWeight="700" color="gray.500" letterSpacing="wider" textTransform="uppercase">
                    Navigation
                </Text>
                <Button
                    variant={activeCollectionId === 'all' ? 'solid' : 'ghost'}
                    justifyContent="flex-start"
                    bg={activeCollectionId === 'all' ? 'blue.500' : 'transparent'}
                    color={activeCollectionId === 'all' ? 'white' : 'gray.600'}
                    onClick={() => setActiveCollection('all')}
                    borderRadius="lg"
                    _hover={{ bg: activeCollectionId === 'all' ? 'blue.600' : 'gray.100' }}
                >
                    <LuNotebook size={18} />
                    <Text ml={2}>All Items</Text>
                </Button>
            </VStack>

            {/* Daily Collections */}
            <VStack gap={2} align="stretch">
                <Text fontSize="xs" fontWeight="700" color="gray.500" letterSpacing="wider" textTransform="uppercase">
                    Journal
                </Text>
                {dailyCollections.length === 0 ? (
                    <Text fontSize="sm" color="gray.400" fontStyle="italic" px={4}>
                        No daily entries yet
                    </Text>
                ) : (
                    dailyCollections.slice(0, 5).map(c => (
                        <Button
                            key={c.id}
                            variant={activeCollectionId === c.id ? 'surface' : 'ghost'}
                            justifyContent="flex-start"
                            onClick={() => setActiveCollection(c.id)}
                            bg={activeCollectionId === c.id ? 'orange.50' : 'transparent'}
                            color={activeCollectionId === c.id ? 'orange.700' : 'gray.600'}
                            borderColor={activeCollectionId === c.id ? 'orange.200' : 'transparent'}
                            borderWidth="1px"
                            borderRadius="lg"
                            _hover={{ bg: activeCollectionId === c.id ? 'orange.100' : 'gray.50' }}
                        >
                            <LuCalendar size={18} />
                            <Text ml={2} truncate flex={1} textAlign="left">{c.title}</Text>
                        </Button>
                    ))
                )}
            </VStack>

            {/* Project Collections */}
            <VStack gap={2} align="stretch">
                <HStack justify="space-between">
                    <Text fontSize="xs" fontWeight="700" color="gray.500" letterSpacing="wider" textTransform="uppercase">
                        Projects
                    </Text>
                    <IconButton
                        size="xs"
                        variant="ghost"
                        onClick={handleAddProject}
                        aria-label="Add project"
                    >
                        <LuPlus />
                    </IconButton>
                </HStack>
                {projectCollections.length === 0 ? (
                    <VStack py={4} px={4} border="1px dashed" borderColor="gray.200" borderRadius="xl" gap={2}>
                        <Text fontSize="xs" color="gray.400" textAlign="center">
                            Organize your tasks into project lists
                        </Text>
                        <Button size="xs" variant="outline" onClick={handleAddProject}>Create First List</Button>
                    </VStack>
                ) : (
                    projectCollections.map(c => (
                        <Button
                            key={c.id}
                            variant={activeCollectionId === c.id ? 'solid' : 'ghost'}
                            justifyContent="flex-start"
                            onClick={() => setActiveCollection(c.id)}
                            bg={activeCollectionId === c.id ? 'blue.500' : 'transparent'}
                            color={activeCollectionId === c.id ? 'white' : 'gray.600'}
                            borderRadius="lg"
                        >
                            <LuFolder size={18} />
                            <Text ml={2} truncate flex={1} textAlign="left">{c.title}</Text>
                        </Button>
                    ))
                )}
            </VStack>

            <AddCollectionModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </VStack>
    );
};
