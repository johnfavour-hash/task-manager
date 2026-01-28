import { Dialog, Portal } from '@chakra-ui/react';
import { Button, Input, Textarea, VStack, NativeSelectRoot, NativeSelectField, Heading } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { useEditTodoForm } from '@forms/todo/edit-todo.form';
import { useTodoStore } from '@stores/todo.store';
import { toaster } from '@/components/ui/toaster';
import type { Todo, CreateTodoDTO } from '@/types/todo.type';

interface EditTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    todo: Todo;
}

export const EditTodoModal = ({ isOpen, onClose, todo }: EditTodoModalProps) => {
    const updateTodo = useTodoStore((state) => state.updateTodo);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useEditTodoForm(todo);

    const onSubmit = handleSubmit(async (data) => {
        try {
            updateTodo(todo.id, data as CreateTodoDTO);
            toaster.create({
                title: 'Success!',
                description: 'Task updated successfully',
                type: 'success',
                duration: 3000,
            });
            onClose();
        } catch {
            toaster.create({
                title: 'Error',
                description: 'Failed to update task',
                type: 'error',
                duration: 3000,
            });
        }
    });

    return (
        <Dialog.Root open={isOpen} onOpenChange={(e: { open: boolean }) => !e.open && onClose()} size="lg">
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
                                    Edit Task
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
                                    onClick={onClose}
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
                                    Save Changes
                                </Button>
                            </Dialog.Footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
