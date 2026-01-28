import { VStack, Text, Box } from '@chakra-ui/react';
import { LuFileText } from 'react-icons/lu';
import { NoteCard } from './NoteCard';
import type { Note } from '@/types/todo.type';

interface NoteListProps {
    notes: Note[];
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
}

export const NoteList = ({ notes, onEdit, onDelete }: NoteListProps) => {
    if (notes.length === 0) {
        return (
            <VStack
                py={12}
                gap={4}
                opacity={0.6}
                animation="fadeIn 0.5s ease-out"
            >
                <Box
                    p={6}
                    borderRadius="full"
                    bg={{ base: "rgba(217, 119, 6, 0.1)", _dark: "rgba(253, 230, 138, 0.1)" }}
                    border="2px dashed"
                    borderColor={{ base: "rgba(217, 119, 6, 0.3)", _dark: "rgba(253, 230, 138, 0.3)" }}
                >
                    <LuFileText size={48} color="#D97706" />
                </Box>
                <Text
                    fontSize="xl"
                    fontWeight="600"
                    color={{ base: "#D97706", _dark: "#FDE68A" }}
                >
                    No notes yet
                </Text>
                <Text fontSize="sm" color={{ base: "gray.500", _dark: "gray.400" }} textAlign="center" maxW="300px">
                    Create your first note to capture your thoughts and ideas
                </Text>
            </VStack>
        );
    }

    return (
        <VStack gap={4} align="stretch" w="full">
            {notes.map((note, index) => (
                <Box
                    key={note.id}
                    animation={`slideInUp 0.4s ease-out ${index * 0.1}s both`}
                >
                    <NoteCard
                        note={note}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Box>
            ))}
        </VStack>
    );
};
