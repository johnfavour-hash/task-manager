import { Box, HStack, VStack, Text, IconButton, Badge } from '@chakra-ui/react';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import type { Note } from '@/types/todo.type';

interface NoteCardProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
}

export const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
    return (
        <Box
            position="relative"
            bg={{ base: "#FEFCE8", _dark: "#1C1917" }}
            borderRadius="xl"
            p={5}
            border="1px solid"
            borderColor={{ base: "#FDE68A", _dark: "#78716C" }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
                transform: 'translateY(-2px)',
                boxShadow: { base: '0 4px 12px rgba(217, 119, 6, 0.1)', _dark: '0 4px 12px rgba(0, 0, 0, 0.4)' },
                borderColor: '#D97706',
            }}
        >
            <VStack align="stretch" gap={3}>
                <HStack justify="space-between" align="flex-start">
                    <VStack align="stretch" flex={1} gap={2}>
                        <HStack justify="space-between">
                            <Text
                                fontSize="lg"
                                fontWeight="700"
                                color={{ base: '#78350F', _dark: '#FDE68A' }}
                            >
                                {note.title}
                            </Text>
                            <Badge
                                colorScheme="orange"
                                borderRadius="full"
                                px={3}
                                py={1}
                                fontSize="xs"
                            >
                                Note
                            </Badge>
                        </HStack>

                        <Text
                            fontSize="sm"
                            color={{ base: '#92400E', _dark: '#D1D5DB' }}
                            lineClamp={3}
                            whiteSpace="pre-wrap"
                        >
                            {note.content}
                        </Text>

                        <Text fontSize="xs" color={{ base: "#A16207", _dark: "#9CA3AF" }} mt={1}>
                            {new Date(note.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </Text>
                    </VStack>

                    {/* Actions */}
                    <HStack gap={1}>
                        <IconButton
                            aria-label="Edit note"
                            size="sm"
                            variant="ghost"
                            color={{ base: "#92400E", _dark: "#D1D5DB" }}
                            borderRadius="lg"
                            onClick={() => onEdit(note)}
                            transition="all 0.2s"
                            _hover={{
                                bg: { base: '#FEF3C7', _dark: 'rgba(217, 119, 6, 0.2)' },
                                color: '#D97706',
                            }}
                        >
                            <LuPencil size={18} />
                        </IconButton>
                        <IconButton
                            aria-label="Delete note"
                            size="sm"
                            variant="ghost"
                            color={{ base: "#92400E", _dark: "#D1D5DB" }}
                            borderRadius="lg"
                            onClick={() => onDelete(note.id)}
                            transition="all 0.2s"
                            _hover={{
                                bg: { base: '#FEF2F2', _dark: 'rgba(239, 68, 68, 0.2)' },
                                color: '#EF4444',
                            }}
                        >
                            <LuTrash2 size={18} />
                        </IconButton>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    );
};
