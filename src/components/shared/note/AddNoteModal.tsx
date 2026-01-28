import { useState } from 'react';
import { Dialog, Portal, VStack, HStack, Box, Text, Input, Textarea, Button, IconButton } from '@chakra-ui/react';
import { LuCalendar, LuPencil, LuX } from 'react-icons/lu';
import { useTodoStore } from '@stores/todo.store';
import { toaster } from '@/components/ui/toaster';
import type { Note } from '@/types/todo.type';

interface AddNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    note?: Note | null;
}

export const AddNoteModal = ({ isOpen, onClose, note }: AddNoteModalProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [prevNoteId, setPrevNoteId] = useState<string | null>(null);

    const addNote = useTodoStore((state) => state.addNote);
    const updateNote = useTodoStore((state) => state.updateNote);
    const activeCollectionId = useTodoStore((state) => state.activeCollectionId);
    const isEditMode = !!note;

    // Adjust state when note changes (using the recommended React pattern for syncing state from props)
    const currentNoteId = note?.id || null;
    if (currentNoteId !== prevNoteId) {
        setPrevNoteId(currentNoteId);
        setTitle(note?.title || '');
        setContent(note?.content || '');
    }

    const handleSave = () => {
        if (!title.trim() || !content.trim()) {
            toaster.create({
                title: 'Error',
                description: 'Please provide both title and content',
                type: 'error'
            });
            return;
        }

        if (isEditMode && note) {
            updateNote(note.id, { title, content });
            toaster.create({
                title: 'Note updated',
                description: 'Your changes have been saved',
                type: 'success'
            });
        } else {
            addNote({
                title,
                content,
                collectionId: activeCollectionId === 'all' ? undefined : activeCollectionId
            });
            toaster.create({
                title: 'Note created',
                description: 'Your note has been saved to your workspace',
                type: 'success'
            });
        }

        setTitle('');
        setContent('');
        onClose();
    };

    const handleClose = () => {
        setTitle('');
        setContent('');
        onClose();
    };

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={(e: { open: boolean }) => !e.open && handleClose()}
            size="full"
            motionPreset="slide-in-bottom"
        >
            <Portal>
                <Dialog.Backdrop bg="rgba(0,0,0,0.8)" />
                <Dialog.Positioner p={0}>
                    <Dialog.Content
                        h="100vh"
                        w="100vw"
                        maxW="full"
                        bg={{ base: "#FEFCE8", _dark: "#1C1917" }} // Paper-like yellow or dark stone
                        borderRadius="0"
                        boxShadow="none"
                        overflow="hidden"
                    >
                        {/* Header: Date */}
                        <HStack
                            bg={{ base: "white", _dark: "#292524" }}
                            p={4}
                            borderBottom="1px solid"
                            borderColor={{ base: "gray.200", _dark: "gray.700" }}
                            justify="space-between"
                        >
                            <HStack gap={3}>
                                <LuCalendar color="#D97706" />
                                <Text fontWeight="600" color={{ base: "gray.600", _dark: "gray.300" }}>{today}</Text>
                            </HStack>
                            <IconButton variant="ghost" onClick={handleClose} aria-label="Close">
                                <LuX />
                            </IconButton>
                        </HStack>

                        <VStack gap={0} flex={1} align="stretch" px={{ base: 6, md: 12 }} pt={6}>
                            {/* Title Field */}
                            <HStack gap={4} mb={6} borderBottom="1px solid" borderColor={{ base: "gray.300", _dark: "gray.600" }} pb={2}>
                                <LuPencil color="#D97706" />
                                <Input
                                    placeholder="Add title"
                                    variant="flushed"
                                    border="none"
                                    fontSize="2xl"
                                    fontWeight="700"
                                    color={{ base: "gray.800", _dark: "white" }}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    px={0}
                                    _focus={{ outline: 'none', border: 'none' }}
                                />
                            </HStack>

                            {/* Lined Paper Content */}
                            <Box
                                flex={1}
                                position="relative"
                                css={{
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '0',
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundImage: {
                                            base: 'linear-gradient(#E5E7EB 1px, transparent 1px)',
                                            _dark: 'linear-gradient(#444 1px, transparent 1px)'
                                        },
                                        backgroundSize: '100% 2.5rem',
                                        pointerEvents: 'none',
                                        zIndex: 0
                                    }
                                }}
                            >
                                <Textarea
                                    placeholder="Start typing here..."
                                    variant="flushed"
                                    border="none"
                                    fontSize="lg"
                                    lineHeight="2.5rem"
                                    h="full"
                                    w="full"
                                    p={0}
                                    color={{ base: "gray.700", _dark: "gray.200" }}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    position="relative"
                                    zIndex={1}
                                    resize="none"
                                    _focus={{ outline: 'none' }}
                                />
                            </Box>
                        </VStack>

                        {/* Footer Actions */}
                        <HStack
                            p={6}
                            justify="flex-end"
                            gap={4}
                            bg={{ base: "white", _dark: "#292524" }}
                        >
                            <Button variant="outline" onClick={handleClose} borderRadius="full" px={8}>Discard</Button>
                            <Button
                                bg="#D97706"
                                color="white"
                                onClick={handleSave}
                                borderRadius="full"
                                px={10}
                                _hover={{ bg: '#B45309' }}
                            >
                                {isEditMode ? 'Update Note' : 'Save Note'}
                            </Button>
                        </HStack>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
