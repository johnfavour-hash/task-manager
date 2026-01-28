import useUserStore from "@stores/user.store";
import { Container, Flex, Heading, Text, VStack, Box } from "@chakra-ui/react";
import LinkButton from "@components/shared/buttons/LinkButton";
import { ColorModeButton } from "@/components/ui/color-mode";

const DashboardPage = () => {
    const { name } = useUserStore();

    return (
        <Box
            minH="100vh"
            bg={{ base: "#F9FAFB", _dark: "#0F172A" }}
            position="relative"
            overflow="hidden"
            transition="background 0.3s ease"
        >
            {/* Theme Toggle */}
            <Box position="absolute" top={4} right={4} zIndex={10}>
                <ColorModeButton />
            </Box>

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

            <Container maxW="container.md" py={20} position="relative" zIndex={1}>
                <VStack gap={8} align="center" textAlign="center">
                    <VStack gap={3}>
                        <Heading
                            size="4xl"
                            fontWeight="800"
                            color={{ base: "#1D4ED8", _dark: "#60A5FA" }}
                            letterSpacing="tight"
                        >
                            Hello, {name} 👋
                        </Heading>
                        <Text
                            fontSize="lg"
                            color={{ base: "#4B5563", _dark: "#9CA3AF" }}
                            maxW="500px"
                        >
                            Welcome back to your workspace. What would you like to focus on today?
                        </Text>
                    </VStack>

                    <Flex gap={4}>
                        <LinkButton
                            to="/todos"
                            variant="solid"
                            bg="#1D4ED8"
                            color="white"
                            size="xl"
                            borderRadius="xl"
                            px={8}
                            _hover={{
                                bg: '#1e40af',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 10px 20px rgba(29, 78, 216, 0.3)',
                            }}
                        >
                            Manage Tasks
                        </LinkButton>
                    </Flex>
                </VStack>
            </Container>
        </Box>
    )
}

export default DashboardPage;