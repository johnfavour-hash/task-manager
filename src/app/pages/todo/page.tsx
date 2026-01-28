import { useState } from 'react';
import { Container, VStack, Box, Heading, Text, HStack, IconButton, Button, Tabs, Grid, GridItem } from '@chakra-ui/react';
import { Plus, Trash2 } from 'lucide-react';
import { useTodoStore } from '@stores/todo.store';
import { TodoList } from '@components/shared/todo/TodoList';
import { TodoFilters } from '@components/shared/todo/TodoFilters';
import { AddTodoModal } from '@components/shared/todo/AddTodoModal';
import { EditTodoModal } from '@components/shared/todo/EditTodoModal';
import { DeleteConfirmDialog } from '@components/shared/todo/DeleteConfirmDialog';
import { NoteList } from '@components/shared/note/NoteList';
import { toaster } from '@/components/ui/toaster';
import { ColorModeButton } from '@/components/ui/color-mode';
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from '@/components/ui/menu';
import { AddNoteModal } from '@components/shared/note/AddNoteModal';
import { LuFileText, LuSquareCheck } from 'react-icons/lu';
import type { Todo, Note } from '@/types/todo.type';
import { CollectionSidebar } from '@components/shared/layout/CollectionSidebar';

const TodoPage = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);
    const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'tasks' | 'notes'>('tasks');

    const {
        todos,
        notes,
        filter,
        setFilter,
        toggleTodo,
        deleteTodo,
        deleteNote,
        clearCompleted,
        getFilteredTodos,
        getFilteredNotes,
        getStats
    } = useTodoStore();

    const filteredTodos = getFilteredTodos();
    const filteredNotes = getFilteredNotes();
    const stats = getStats();

    const deletingTodo = todos.find((t) => t.id === deletingTodoId);
    const deletingNote = notes.find((n) => n.id === deletingNoteId);

    const handleDeleteConfirm = () => {
        if (deletingTodoId) {
            deleteTodo(deletingTodoId);
            toaster.create({
                title: 'Task deleted',
                description: 'Task has been removed from your list',
                type: 'success',
                duration: 3000,
            });
            setDeletingTodoId(null);
        }
        if (deletingNoteId) {
            deleteNote(deletingNoteId);
            toaster.create({
                title: 'Note deleted',
                description: 'Note has been removed from your workspace',
                type: 'success',
                duration: 3000,
            });
            setDeletingNoteId(null);
        }
    };

    const handleClearCompleted = () => {
        clearCompleted();
        toaster.create({
            title: 'Completed tasks cleared',
            description: `Removed ${stats.completed} completed task${stats.completed !== 1 ? 's' : ''} `,
            type: 'success',
            duration: 3000,
        });
    };

    const handleToggle = (id: string) => {
        toggleTodo(id);
        toaster.create({
            title: 'Task updated',
            description: 'Task completion status changed',
            type: 'info',
            duration: 2000,
        });
    };

    return (
        <Box
            minH="100vh"
            position="relative"
            overflow="hidden"
            bg={{ base: "#F9FAFB", _dark: "#0F172A" }}
            transition="background 0.3s ease"
        >
            {/* Subtle Brand Background Accents */}
            <Box
                position="absolute"
                top="-10%"
                right="-5%"
                w="600px"
                h="600px"
                borderRadius="full"
                bg={{ base: "#EFF6FF", _dark: "rgba(29, 78, 216, 0.1)" }}
                filter="blur(80px)"
                opacity={0.8}
                zIndex={0}
            />
            <Box
                position="absolute"
                bottom="-10%"
                left="-5%"
                w="500px"
                h="500px"
                borderRadius="full"
                bg={{ base: "#F3F4F6", _dark: "rgba(30, 58, 138, 0.1)" }}
                filter="blur(80px)"
                opacity={0.8}
                zIndex={0}
            />

            <Container maxW="container.xl" py={12} position="relative" zIndex={1}>
                {/* Theme Toggle */}
                <Box position="absolute" top={4} right={4}>
                    <ColorModeButton />
                </Box>

                <Grid templateColumns={{ base: "1fr", lg: "280px 1fr" }} gap={10} alignItems="start">
                    {/* Collection Sidebar */}
                    <GridItem display={{ base: "none", lg: "block" }}>
                        <Box
                            position="sticky"
                            top={12}
                            p={6}
                            bg={{ base: "white", _dark: "gray.800" }}
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor={{ base: "gray.100", _dark: "gray.700" }}
                            boxShadow="sm"
                        >
                            <CollectionSidebar />
                        </Box>
                    </GridItem>

                    <VStack gap={8} align="stretch" flex={1}>
                        {/* Header */}
                        <VStack gap={3} textAlign={{ base: "center", lg: "left" }} align={{ base: "center", lg: "start" }}>
                            <Heading
                                size="4xl"
                                fontWeight="800"
                                color={{ base: "#1D4ED8", _dark: "#60A5FA" }}
                                letterSpacing="tight"
                                animation="fadeIn 0.8s ease-out"
                            >
                                Task Manager
                            </Heading>
                            <Text
                                fontSize="lg"
                                color={{ base: "#4B5563", _dark: "#9CA3AF" }}
                                maxW="500px"
                                animation="fadeIn 1s ease-out 0.2s both"
                            >
                                Organize your work and life with clarity.
                            </Text>
                        </VStack>

                        {/* Stats & Actions Bar */}
                        <HStack
                            justify="space-between"
                            p={4}
                            bg={{ base: "#FFFFFF", _dark: "#1F2937" }}
                            borderRadius="xl"
                            border="1px solid"
                            borderColor={{ base: "#F3F4F6", _dark: "#374151" }}
                            boxShadow="sm"
                            flexWrap="wrap"
                            gap={3}
                            transition="all 0.3s ease"
                        >
                            <HStack gap={4} flexWrap="wrap">
                                <Text fontSize="sm" color={{ base: "#4B5563", _dark: "#D1D5DB" }}>
                                    <Text as="span" fontWeight="700" color={{ base: "#1D4ED8", _dark: "#60A5FA" }} fontSize="lg">
                                        {stats.total}
                                    </Text>{' '}
                                    Total
                                </Text>
                                <Text fontSize="sm" color={{ base: "#4B5563", _dark: "#D1D5DB" }}>
                                    <Text as="span" fontWeight="700" color={{ base: "#4B5563", _dark: "#9CA3AF" }} fontSize="lg">
                                        {stats.active}
                                    </Text>{' '}
                                    Active
                                </Text>
                            </HStack>
                            {stats.completed > 0 && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    color={{ base: "#4B5563", _dark: "#D1D5DB" }}
                                    onClick={handleClearCompleted}
                                    borderRadius="lg"
                                    _hover={{
                                        bg: { base: '#F3F4F6', _dark: '#374151' },
                                        color: '#EF4444',
                                    }}
                                >
                                    <Trash2 size={16} />
                                    Clear Completed
                                </Button>
                            )}
                        </HStack>

                        {/* Tab Navigation */}
                        <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value as 'tasks' | 'notes')}>
                            <Tabs.List
                                bg={{ base: "#FFFFFF", _dark: "#1F2937" }}
                                borderRadius="xl"
                                p={1}
                                border="1px solid"
                                borderColor={{ base: "#F3F4F6", _dark: "#374151" }}
                            >
                                <Tabs.Trigger value="tasks" flex={1} borderRadius="lg">
                                    <HStack gap={2}>
                                        <LuSquareCheck size={18} />
                                        <Text fontWeight="600">Tasks ({filteredTodos.length})</Text>
                                    </HStack>
                                </Tabs.Trigger>
                                <Tabs.Trigger value="notes" flex={1} borderRadius="lg">
                                    <HStack gap={2}>
                                        <LuFileText size={18} />
                                        <Text fontWeight="600">Notes ({filteredNotes.length})</Text>
                                    </HStack>
                                </Tabs.Trigger>
                            </Tabs.List>

                            <Tabs.Content value="tasks">
                                {/* Filters */}
                                <TodoFilters currentFilter={filter} stats={stats} onFilterChange={setFilter} />

                                {/* Todo List */}
                                <Box animation="fadeIn 1.2s ease-out 0.4s both">
                                    <TodoList
                                        todos={filteredTodos}
                                        onToggle={handleToggle}
                                        onEdit={(todo) => setEditingTodo(todo)}
                                        onDelete={(id) => setDeletingTodoId(id)}
                                    />
                                </Box>
                            </Tabs.Content>

                            <Tabs.Content value="notes">
                                {/* Note List */}
                                <Box animation="fadeIn 1.2s ease-out 0.4s both" mt={6}>
                                    <NoteList
                                        notes={filteredNotes}
                                        onEdit={(note) => setEditingNote(note)}
                                        onDelete={(id) => setDeletingNoteId(id)}
                                    />
                                </Box>
                            </Tabs.Content>
                        </Tabs.Root>

                        {/* Floating Quick Actions Menu */}
                        <MenuRoot positioning={{ placement: "top-end" }}>
                            <MenuTrigger asChild>
                                <IconButton
                                    aria-label="Quick actions"
                                    size="lg"
                                    position="fixed"
                                    bottom={8}
                                    right={8}
                                    borderRadius="full"
                                    w="64px"
                                    h="64px"
                                    bg="#1D4ED8"
                                    color="white"
                                    boxShadow="0 4px 12px rgba(29, 78, 216, 0.2)"
                                    _hover={{
                                        bg: '#1e40af',
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 8px 24px rgba(29, 78, 216, 0.3)',
                                    }}
                                    _active={{
                                        transform: 'scale(0.95)',
                                    }}
                                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                    zIndex={10}
                                >
                                    <Plus size={28} />
                                </IconButton>
                            </MenuTrigger>
                            <MenuContent minW="200px" borderRadius="xl" overflow="hidden">
                                <MenuItem
                                    value="new-note"
                                    onClick={() => setIsNoteModalOpen(true)}
                                    gap={3}
                                >
                                    <LuFileText color="#D97706" />
                                    <Text fontWeight="600">Create Note</Text>
                                </MenuItem>
                                <MenuItem
                                    value="new-task"
                                    onClick={() => setIsAddModalOpen(true)}
                                    gap={3}
                                >
                                    <LuSquareCheck color="#1D4ED8" />
                                    <Text fontWeight="600">Create Task</Text>
                                </MenuItem>
                            </MenuContent>
                        </MenuRoot>
                    </VStack>
                </Grid>
            </Container>

            {/* Modals */}
            <AddTodoModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <AddNoteModal
                isOpen={isNoteModalOpen || !!editingNote}
                onClose={() => {
                    setIsNoteModalOpen(false);
                    setEditingNote(null);
                }}
                note={editingNote}
            />

            {editingTodo && (
                <EditTodoModal
                    isOpen={!!editingTodo}
                    onClose={() => setEditingTodo(null)}
                    todo={editingTodo}
                />
            )}

            {deletingTodo && (
                <DeleteConfirmDialog
                    isOpen={!!deletingTodo}
                    onClose={() => setDeletingTodoId(null)}
                    onConfirm={handleDeleteConfirm}
                    todoTitle={deletingTodo.title}
                />
            )}

            {deletingNote && (
                <DeleteConfirmDialog
                    isOpen={!!deletingNote}
                    onClose={() => setDeletingNoteId(null)}
                    onConfirm={handleDeleteConfirm}
                    todoTitle={deletingNote.title}
                />
            )}
        </Box>
    );
};

export default TodoPage;
