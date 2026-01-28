import { useState } from 'react';
import { Dialog, Portal, VStack, Box, Text, Input, Button, IconButton, HStack } from '@chakra-ui/react';
import { LuX, LuFolderPlus } from 'react-icons/lu';
import { useTodoStore } from '@stores/todo.store';
import { toaster } from '@/components/ui/toaster';

interface AddCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddCollectionModal = ({ isOpen, onClose }: AddCollectionModalProps) => {
    const [title, setTitle] = useState('');
    const addCollection = useTodoStore((state) => state.addCollection);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = () => {
        if (!title.trim()) {
            toaster.create({
                title: 'Error',
                description: 'Please provide a name for the list',
                type: 'error'
            });
            return;
        }

        setIsSubmitting(true);
        try {
            addCollection(title, 'project');
            toaster.create({
                title: 'List created',
                description: `"${title}" has been added to your projects`,
                type: 'success'
            });
            setTitle('');
            onClose();
        } catch {
            toaster.create({
                title: 'Error',
                description: 'Failed to create list',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size={{ base: "xs", sm: "sm", md: "md" }}>
            <Portal>
                <Dialog.Backdrop backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.4)" />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg={{ base: "#FFFFFF", _dark: "#1F2937" }}
                        borderRadius="2xl"
                        boxShadow="0 12px 32px rgba(0, 0, 0, 0.1)"
                        border="1px solid"
                        borderColor={{ base: "gray.100", _dark: "gray.700" }}
                        overflow="hidden"
                    >
                        <Box p={6}>
                            <VStack gap={6} align="stretch">
                                <HStack justify="space-between" align="center">
                                    <HStack gap={3}>
                                        <Box p={2} bg="blue.50" color="blue.600" borderRadius="lg">
                                            <LuFolderPlus size={24} />
                                        </Box>
                                        <VStack align="start" gap={0}>
                                            <Text fontWeight="800" fontSize="xl" color={{ base: "gray.800", _dark: "white" }}>
                                                New Project List
                                            </Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Organize your tasks into a new folder
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <IconButton
                                        variant="ghost"
                                        onClick={onClose}
                                        borderRadius="full"
                                        size="sm"
                                        aria-label="Close"
                                    >
                                        <LuX />
                                    </IconButton>
                                </HStack>

                                <Box>
                                    <Text fontSize="sm" fontWeight="600" mb={2} color="gray.600">
                                        List Name
                                    </Text>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Work, Groceries, Big Goals..."
                                        size="lg"
                                        bg={{ base: "gray.50", _dark: "gray.900" }}
                                        border="1px solid"
                                        borderColor={{ base: "gray.200", _dark: "gray.700" }}
                                        borderRadius="xl"
                                        _focus={{
                                            borderColor: 'blue.500',
                                            boxShadow: '0 0 0 1px blue.500'
                                        }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                                        autoFocus
                                    />
                                </Box>

                                <HStack justify="flex-end" gap={3}>
                                    <Button
                                        variant="ghost"
                                        onClick={onClose}
                                        borderRadius="xl"
                                        fontWeight="600"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        bg="blue.600"
                                        color="white"
                                        borderRadius="xl"
                                        px={8}
                                        fontWeight="700"
                                        loading={isSubmitting}
                                        _hover={{ bg: 'blue.700', transform: 'translateY(-1px)' }}
                                        _active={{ transform: 'translateY(0)' }}
                                        transition="all 0.2s"
                                    >
                                        Create List
                                    </Button>
                                </HStack>
                            </VStack>
                        </Box>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
