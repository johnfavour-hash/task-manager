import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthBackground } from "./AuthBackground";

const MotionBox = motion.create(Box);

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    welcomeText?: string;
}

export const AuthLayout = ({ children, title, subtitle, welcomeText = "Welcome!" }: AuthLayoutProps) => {
    return (
        <Box minH="100vh" position="relative" display="flex" alignItems="center" justifyContent="center" bg="#F8F9FB">
            <AuthBackground />

            <Container maxW="container.xl" py={10} position="relative" zIndex={1}>
                <Flex direction={{ base: "column", lg: "row" }} align="center" justify="center" gap={{ base: 12, lg: 20 }}>

                    {/* Welcome Section */}
                    <MotionBox
                        flex={1}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        textAlign={{ base: "center", lg: "left" }}
                    >
                        <Heading
                            as="h1"
                            fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                            fontWeight="800"
                            color="#1A202C" // Main Text
                            mb={6}
                            lineHeight="shorter"
                        >
                            {welcomeText}
                        </Heading>
                        <Box w="60px" h="4px" bg="#3B82F6" mb={8} display={{ base: "none", lg: "block" }} /> {/* Brand Blue */}
                        <Text
                            fontSize={{ base: "md", md: "xl" }}
                            color="#718096" // Muted Text
                            maxW="xl"
                            lineHeight="tall"
                            fontWeight="500"
                        >
                            {subtitle || "Building the next generation of digital solutions with speed, clarity, and precision."}
                        </Text>
                    </MotionBox>

                    {/* Auth Form Container */}
                    <MotionBox
                        flex={1}
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        w="full"
                        maxW="lg"
                    >
                        <Box
                            position="relative"
                            bg="#FFFFFF" // White Card
                            borderRadius="3xl"
                            p={{ base: 8, md: 12 }}
                            border="1px solid"
                            borderColor="#E2E8F0" // Border Color
                            boxShadow="0 20px 50px rgba(0, 0, 0, 0.05)" // Softer shadow for light mode
                        >
                            <VStack gap={10} align="stretch">
                                <Box textAlign="center" mb={2}>
                                    <Heading size="2xl" color="#1A202C" fontWeight="800" letterSpacing="tight">
                                        {title}
                                    </Heading>
                                </Box>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={title}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {children}
                                    </motion.div>
                                </AnimatePresence>
                            </VStack>
                        </Box>
                    </MotionBox>
                </Flex>
            </Container>
        </Box>
    );
};
