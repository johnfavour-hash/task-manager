import { Dialog, Portal } from '@chakra-ui/react';
import { Button, Text } from '@chakra-ui/react';
import { AlertTriangle } from 'lucide-react';
import { Box } from '@chakra-ui/react';

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    todoTitle: string;
}

export const DeleteConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    todoTitle,
}: DeleteConfirmDialogProps) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(e: { open: boolean }) => !e.open && onClose()} size="md">
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
                            <Dialog.Title
                                fontSize="2xl"
                                fontWeight="700"
                                color="#EF4444"
                            >
                                Delete Task
                            </Dialog.Title>
                        </Dialog.Header>

                        <Dialog.CloseTrigger />

                        <Dialog.Body>
                            <Box textAlign="center" py={4}>
                                <Box
                                    display="inline-flex"
                                    p={4}
                                    borderRadius="full"
                                    bg={{ base: "#FEF2F2", _dark: "rgba(239, 68, 68, 0.1)" }}
                                    border="2px solid"
                                    borderColor={{ base: "#FEE2E2", _dark: "rgba(239, 68, 68, 0.2)" }}
                                    mb={4}
                                >
                                    <AlertTriangle size={32} color="#EF4444" />
                                </Box>
                                <Text fontSize="md" color={{ base: "#4B5563", _dark: "#D1D5DB" }} mb={2}>
                                    Are you sure you want to delete this task?
                                </Text>
                                <Text
                                    fontSize="lg"
                                    fontWeight="600"
                                    color={{ base: "#111827", _dark: "#F9FAFB" }}
                                    bg={{ base: "#F9FAFB", _dark: "#111827" }}
                                    p={3}
                                    borderRadius="lg"
                                    border="1px solid"
                                    borderColor={{ base: "#E5E7EB", _dark: "#374151" }}
                                >
                                    "{todoTitle}"
                                </Text>
                                <Text fontSize="sm" color={{ base: "#6B7280", _dark: "#9CA3AF" }} mt={3}>
                                    This action cannot be undone.
                                </Text>
                            </Box>
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
                                onClick={onConfirm}
                                bg="#EF4444"
                                color="white"
                                borderRadius="lg"
                                px={8}
                                _hover={{
                                    bg: '#DC2626',
                                    transform: 'translateY(-2px)',
                                    boxShadow: { base: '0 10px 20px rgba(239, 68, 68, 0.3)', _dark: '0 10px 20px rgba(239, 68, 68, 0.5)' },
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                                transition="all 0.2s"
                            >
                                Delete Task
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
