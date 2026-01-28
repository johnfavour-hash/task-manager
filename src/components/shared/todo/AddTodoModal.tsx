import { Dialog, Portal } from '@chakra-ui/react';
import { Button, Input, Textarea, VStack, NativeSelectRoot, NativeSelectField, Heading } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { useAddTodoForm } from '@forms/todo/add-todo.form';
import { useTodoStore } from '@stores/todo.store';
import { toaster } from '@/components/ui/toaster';
import type { CreateTodoDTO } from '@/types/todo.type';

interface AddTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddTodoModal = ({ isOpen, onClose }: AddTodoModalProps) => {
    const addTodo = useTodoStore((state) => state.addTodo);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useAddTodoForm();

    const activeCollectionId = useTodoStore((state) => state.activeCollectionId);
    const onSubmit = handleSubmit(async (data: CreateTodoDTO) => {
        try {
            const todoData = {
                ...data,
                collectionId: activeCollectionId === 'all' ? undefined : activeCollectionId
            };
            addTodo(todoData);
            toaster.create({
                title: 'Success!',
                description: 'Task created successfully',
                type: 'success',
                duration: 3000,
            });
            reset();
            onClose();
        } catch {
            toaster.create({
                title: 'Error',
                description: 'Failed to create task',
                type: 'error',
                duration: 3000,
            });
        }
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(e: { open: boolean }) => !e.open && handleClose()} size="lg">
            <Portal>
                <Dialog.Backdrop backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.6)" />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg={{ base: "#FFFFFF", _dark: "#1F2937" }}
                        backdropFilter="blur(20px)"
                        border="1px solid"
                        borderColor={{ base: "#F3F4F6", _dark: "#374151" }}
                        borderRadius="2xl"
                        boxShadow="0 12px 32px rgba(0, 0, 0, 0.1)"
                    >
                        <Dialog.Header>
                            <Dialog.Title asChild>
                                <Heading size="xl" fontWeight="700" color={{ base: "#1D4ED8", _dark: "#60A5FA" }}>
                                    Create New Task
                                </Heading>
                            </Dialog.Title>
                        </Dialog.Header>

                        <Dialog.CloseTrigger />

                        <form onSubmit={onSubmit}>
                            <Dialog.Body>
                                <VStack gap={5} align="stretch">
                                    <Field label="Title" invalid={!!errors.title} errorText={errors.title?.message}>
                                        <Input
                                            {...register('title')}
                                            placeholder="Enter task title..."
                                            size="lg"
                                            bg={{ base: "#F9FAFB", _dark: "#111827" }}
                                            border="1px solid"
                                            borderColor={{ base: "#E5E7EB", _dark: "#374151" }}
                                            borderRadius="lg"
                                            color={{ base: "#111827", _dark: "#F9FAFB" }}
                                            _hover={{
                                                borderColor: '#1D4ED8',
                                                bg: { base: '#EFF6FF', _dark: 'rgba(29, 78, 216, 0.1)' },
                                            }}
                                            _focus={{
                                                borderColor: '#1D4ED8',
                                                boxShadow: '0 0 0 1px #1D4ED8',
                                                bg: { base: '#FFFFFF', _dark: '#1F2937' },
                                            }}
                                        />
                                    </Field>

                                    <Field
                                        label="Description (optional)"
                                        invalid={!!errors.description}
                                        errorText={errors.description?.message}
                                    >
                                        <Textarea
                                            {...register('description')}
                                            placeholder="Add more details..."
                                            rows={4}
                                            size="lg"
                                            bg={{ base: "#F9FAFB", _dark: "#111827" }}
                                            border="1px solid"
                                            borderColor={{ base: "#E5E7EB", _dark: "#374151" }}
                                            borderRadius="lg"
                                            color={{ base: "#111827", _dark: "#F9FAFB" }}
                                            _hover={{
                                                borderColor: '#1D4ED8',
                                                bg: { base: '#EFF6FF', _dark: 'rgba(29, 78, 216, 0.1)' },
                                            }}
                                            _focus={{
                                                borderColor: '#1D4ED8',
                                                boxShadow: '0 0 0 1px #1D4ED8',
                                                bg: { base: '#FFFFFF', _dark: '#1F2937' },
                                            }}
                                        />
                                    </Field>

                                    <Field label="Priority" invalid={!!errors.priority} errorText={errors.priority?.message}>
                                        <NativeSelectRoot size="lg">
                                            <NativeSelectField
                                                {...register('priority')}
                                                bg={{ base: "#F9FAFB", _dark: "#111827" }}
                                                border="1px solid"
                                                borderColor={{ base: "#E5E7EB", _dark: "#374151" }}
                                                borderRadius="lg"
                                                color={{ base: "#111827", _dark: "#F9FAFB" }}
                                                _hover={{
                                                    borderColor: '#1D4ED8',
                                                    bg: { base: '#EFF6FF', _dark: 'rgba(29, 78, 216, 0.1)' },
                                                }}
                                                _focus={{
                                                    borderColor: '#1D4ED8',
                                                    boxShadow: '0 0 0 1px #1D4ED8',
                                                    bg: { base: '#FFFFFF', _dark: '#1F2937' },
                                                }}
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </NativeSelectField>
                                        </NativeSelectRoot>
                                    </Field>
                                </VStack>
                            </Dialog.Body>

                            <Dialog.Footer gap={3}>
                                <Button
                                    variant="ghost"
                                    onClick={handleClose}
                                    borderRadius="lg"
                                    color={{ base: "#4B5563", _dark: "#9CA3AF" }}
                                    _hover={{ bg: { base: '#F3F4F6', _dark: '#374151' } }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    loading={isSubmitting}
                                    bg="#1D4ED8"
                                    color="white"
                                    borderRadius="lg"
                                    px={8}
                                    _hover={{
                                        bg: '#1e40af',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 10px 20px rgba(29, 78, 216, 0.3)',
                                    }}
                                    _active={{
                                        transform: 'translateY(0)',
                                    }}
                                    transition="all 0.2s"
                                >
                                    Create Task
                                </Button>
                            </Dialog.Footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
