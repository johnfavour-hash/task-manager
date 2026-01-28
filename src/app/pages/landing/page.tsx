import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Stack,
    Text,
    VStack,
    Link as ChakraLink,
    Image,
    HStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router";
import {
    LuArrowRight,
    LuCloud,
    LuZap,
    LuSettings,
    LuPhone,
    LuMail,
    LuMapPin,
    LuFacebook,
    LuTwitter,
    LuInstagram,
    LuLinkedin
} from "react-icons/lu";

const MotionBox = motion.create(Box);

const Nav = () => (
    <Box
        as="nav"
        position="fixed"
        top="0"
        w="full"
        zIndex="100"
        bg="rgba(255, 255, 255, 0.8)"
        backdropFilter="blur(10px)"
        borderBottom="1px solid"
        borderColor="#E2E8F0"
    >
        <Container maxW="container.xl" py={4}>
            <Flex align="center" justify="space-between">
                <HStack gap={2}>
                    <Box
                        bg="#3B82F6"
                        w="40px"
                        h="40px"
                        borderRadius="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <LuZap color="white" size={24} />
                    </Box>
                    <Text fontSize="2xl" fontWeight="800" color="#1A202C" letterSpacing="tight">
                        Taskmaster
                    </Text>
                </HStack>

                <HStack gap={8} display={{ base: "none", md: "flex" }}>
                    <ChakraLink asChild color="#718096" _hover={{ color: "#3B82F6" }} fontWeight="500">
                        <RouterLink to="/">Home</RouterLink>
                    </ChakraLink>
                    <ChakraLink asChild color="#718096" _hover={{ color: "#3B82F6" }} fontWeight="500">
                        <RouterLink to="#">Features</RouterLink>
                    </ChakraLink>
                    <ChakraLink asChild color="#718096" _hover={{ color: "#3B82F6" }} fontWeight="500">
                        <RouterLink to="#">Solutions</RouterLink>
                    </ChakraLink>
                    <ChakraLink asChild color="#718096" _hover={{ color: "#3B82F6" }} fontWeight="500">
                        <RouterLink to="#">Pricing</RouterLink>
                    </ChakraLink>
                </HStack>

                <HStack gap={4}>
                    <Button asChild variant="ghost" color="#1A202C" _hover={{ bg: "#F8F9FB" }}>
                        <RouterLink to="/auth/login">Login</RouterLink>
                    </Button>
                    <Button asChild bg="#3B82F6" color="white" _hover={{ bg: "#2563EB" }} borderRadius="full" px={6}>
                        <RouterLink to="/auth/signup">Get Started</RouterLink>
                    </Button>
                </HStack>
            </Flex>
        </Container>
    </Box>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <VStack
        bg="white"
        p={10}
        borderRadius="3xl"
        border="1px solid"
        borderColor="#E2E8F0"
        align="center"
        textAlign="center"
        gap={6}
        transition="all 0.3s"
        _hover={{
            transform: "translateY(-10px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            borderColor: "#3B82F6"
        }}
    >
        <Box
            p={4}
            bg="rgba(59, 130, 246, 0.1)"
            borderRadius="2xl"
            color="#3B82F6"
        >
            <Icon as={icon} boxSize={8} />
        </Box>
        <Heading size="md" color="#1A202C">{title}</Heading>
        <Text color="#718096" fontSize="sm" lineHeight="tall">{description}</Text>
    </VStack>
);

const LandingPage = () => {
    return (
        <Box bg="#F8F9FB" color="#1A202C">
            <Nav />

            {/* Hero Section */}
            <Box pt={40} pb={20} position="relative" overflow="hidden">
                <Box
                    position="absolute"
                    top="-20%"
                    right="-10%"
                    w="800px"
                    h="800px"
                    borderRadius="full"
                    bg="rgba(59, 130, 246, 0.05)"
                    filter="blur(100px)"
                    zIndex={0}
                />

                <Container maxW="container.xl" position="relative" zIndex={1}>
                    <Flex direction={{ base: "column", lg: "row" }} align="center" gap={12}>
                        <VStack align={{ base: "center", lg: "flex-start" }} flex={1} gap={8} textAlign={{ base: "center", lg: "left" }}>
                            <Stack gap={4}>
                                <Text color="#3B82F6" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" fontSize="xs">
                                    Next Gen Task Management
                                </Text>
                                <Heading as="h1" fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }} fontWeight="800" lineHeight="1.1" letterSpacing="tight">
                                    Organize Your <Box as="span" color="#3B82F6">Business</Box> with Taskmaster
                                </Heading>
                            </Stack>
                            <Text fontSize={{ base: "lg", md: "xl" }} color="#718096" maxW="2xl">
                                Taskmaster provides robust solutions for modern teams to track notes, tasks, and progress with a beautiful, lightning-fast interface.
                            </Text>
                            <HStack gap={4}>
                                <Button asChild size="lg" bg="#3B82F6" color="white" _hover={{ bg: "#2563EB" }} borderRadius="full" px={8} h="60px" fontSize="md">
                                    <RouterLink to="/auth/signup">Get Started Now <Box as="span" ml={2}><LuArrowRight /></Box></RouterLink>
                                </Button>
                                <Button size="lg" variant="outline" borderColor="#E2E8F0" color="#1A202C" _hover={{ bg: "white" }} borderRadius="full" px={8} h="60px" fontSize="md">
                                    Learn More
                                </Button>
                            </HStack>
                        </VStack>

                        <Flex flex={1} justify="center">
                            <MotionBox
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                position="relative"
                            >
                                <Box
                                    bg="white"
                                    p={2}
                                    borderRadius="3xl"
                                    boxShadow="2xl"
                                    border="8px solid"
                                    borderColor="#1A202C"
                                >
                                    <Box borderRadius="2xl" overflow="hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                                            alt="Dashboard Preview"
                                            maxW="500px"
                                        />
                                    </Box>
                                </Box>
                            </MotionBox>
                        </Flex>
                    </Flex>
                </Container>
            </Box>

            {/* Features Section */}
            <Box py={24} bg="white">
                <Container maxW="container.xl">
                    <VStack gap={16}>
                        <VStack gap={4} textAlign="center" maxW="3xl">
                            <Text color="#3B82F6" fontWeight="bold" textTransform="uppercase" fontSize="xs" letterSpacing="widest">
                                Areas What We Serve
                            </Text>
                            <Heading size="2xl" fontWeight="800">Our Services</Heading>
                        </VStack>

                        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
                            <FeatureCard
                                icon={LuSettings}
                                title="Task Management"
                                description="Comprehensive task tracking with priority levels, deadlines, and status updates designed for maximum efficiency."
                            />
                            <FeatureCard
                                icon={LuPhone}
                                title="Quick Support"
                                description="Our dedicated support team is available 24/7 to help you resolve any issues or answer questions about your workspace."
                            />
                            <FeatureCard
                                icon={LuCloud}
                                title="Cloud Sync"
                                description="Access your notes and tasks from anywhere in the world. Your data is encrypted and synced across all your devices."
                            />
                        </SimpleGrid>

                        <Button variant="plain" color="#3B82F6" fontSize="md" rightIcon={<LuArrowRight />}>
                            See All Services
                        </Button>
                    </VStack>
                </Container>
            </Box>

            {/* Why Choose Us */}
            <Box py={24}>
                <Container maxW="container.xl">
                    <VStack gap={16}>
                        <VStack gap={4} textAlign="center">
                            <Text color="#3B82F6" fontWeight="bold" textTransform="uppercase" fontSize="xs" letterSpacing="widest">
                                Some Reasons
                            </Text>
                            <Heading size="2xl" fontWeight="800">Why Choose Us</Heading>
                        </VStack>

                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={12} w="full">
                            {[
                                { title: "High Quality Performance", desc: "Built with the latest technology for a smooth experience." },
                                { title: "Dedicated 24/7 Support", desc: "We're here to help you around the clock." },
                                { title: "Privacy Guaranteed", desc: "Your data is encrypted and secure with us." },
                                { title: "Agile Working Style", desc: "Iterate and organize at the speed of thought." },
                                { title: "Free for Individuals", desc: "Start organizing your life today for free." },
                                { title: "High Level Usability", desc: "Clean interface focused on productivity." },
                            ].map((item, i) => (
                                <HStack key={i} align="flex-start" gap={4}>
                                    <Text color="#3B82F6" fontWeight="800" fontSize="xl">{`0${i + 1}`}</Text>
                                    <VStack align="flex-start" gap={2}>
                                        <Heading size="sm" fontWeight="800">{item.title}</Heading>
                                        <Text color="#718096" fontSize="sm">{item.desc}</Text>
                                    </VStack>
                                </HStack>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box py={24} bg="#1A202C" color="white" borderRadius={{ md: "50px" }} mx={{ md: 10 }} mb={20}>
                <Container maxW="container.xl">
                    <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={12}>
                        <VStack gap={2} align={{ base: "center", md: "flex-start" }}>
                            <Box display="flex" alignItems="center" bg="white" color="#1A202C" px={6} py={8} borderRadius="full" mb={4}>
                                <Text fontSize="6xl" fontWeight="800">10</Text>
                                <VStack align="flex-start" ml={4} gap={0}>
                                    <Text fontWeight="bold">Years of</Text>
                                    <Text fontWeight="bold">Experience</Text>
                                </VStack>
                            </Box>
                        </VStack>

                        <SimpleGrid columns={{ base: 1, sm: 3 }} gap={12} flex={1}>
                            <VStack align={{ base: "center", md: "flex-start" }}>
                                <Heading size="3xl">2K</Heading>
                                <Text color="whiteAlpha.700">Apps Developed</Text>
                            </VStack>
                            <VStack align={{ base: "center", md: "flex-start" }}>
                                <Heading size="3xl">40</Heading>
                                <Text color="whiteAlpha.700">Consultants</Text>
                            </VStack>
                            <VStack align={{ base: "center", md: "flex-start" }}>
                                <Heading size="3xl">160</Heading>
                                <Text color="whiteAlpha.700">Employers</Text>
                            </VStack>
                        </SimpleGrid>
                    </Flex>
                </Container>
            </Box>

            {/* Footer */}
            <Box bg="white" pt={20} pb={10} borderTop="1px solid" borderColor="#E2E8F0">
                <Container maxW="container.xl">
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={12} mb={16}>
                        <VStack align="flex-start" gap={6}>
                            <HStack gap={2}>
                                <Box bg="#3B82F6" w="32px" h="32px" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
                                    <LuZap color="white" size={20} />
                                </Box>
                                <Text fontSize="xl" fontWeight="800" color="#1A202C" letterSpacing="tight">
                                    Taskmaster
                                </Text>
                            </HStack>
                            <Text color="#718096" fontSize="sm" lineHeight="tall">
                                Building the next generation of digital solutions with speed, clarity, and precision. Master your day with Taskmaster.
                            </Text>
                            <HStack gap={4}>
                                {[LuFacebook, LuTwitter, LuInstagram, LuLinkedin].map((SocialIcon, i) => (
                                    <Box key={i} color="#718096" cursor="pointer" _hover={{ color: "#3B82F6" }} transition="all 0.2s">
                                        <SocialIcon size={20} />
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>

                        <VStack align="flex-start" gap={4}>
                            <Text fontWeight="800" fontSize="md">Solutions</Text>
                            {["Task Management", "Cloud Sync", "Team Collaboration", "Global Support"].map((item) => (
                                <ChakraLink key={item} fontSize="sm" color="#718096" _hover={{ color: "#3B82F6", textDecoration: "none" }}>
                                    {item}
                                </ChakraLink>
                            ))}
                        </VStack>

                        <VStack align="flex-start" gap={4}>
                            <Text fontWeight="800" fontSize="md">Quick Links</Text>
                            {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                                <ChakraLink key={item} fontSize="sm" color="#718096" _hover={{ color: "#3B82F6", textDecoration: "none" }}>
                                    {item}
                                </ChakraLink>
                            ))}
                        </VStack>

                        <VStack align="flex-start" gap={4}>
                            <Text fontWeight="800" fontSize="md">Contact Us</Text>
                            <HStack gap={3} color="#718096" fontSize="sm">
                                <LuMail size={18} />
                                <Text>support@taskmaster.com</Text>
                            </HStack>
                            <HStack gap={3} color="#718096" fontSize="sm">
                                <LuPhone size={18} />
                                <Text>+1 (888) 123-4567</Text>
                            </HStack>
                            <HStack gap={3} color="#718096" fontSize="sm">
                                <LuMapPin size={18} />
                                <Text>Silicon Valley, CA</Text>
                            </HStack>
                        </VStack>
                    </SimpleGrid>

                    <Box pt={8} borderTop="1px solid" borderColor="#E2E8F0">
                        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={4}>
                            <Text color="#718096" fontSize="xs">
                                © 2026 Taskmaster Solutions. All rights reserved.
                            </Text>
                            <HStack gap={6}>
                                <Text color="#718096" fontSize="xs" cursor="pointer" _hover={{ color: "#3B82F6" }}>Privacy</Text>
                                <Text color="#718096" fontSize="xs" cursor="pointer" _hover={{ color: "#3B82F6" }}>Terms</Text>
                                <Text color="#718096" fontSize="xs" cursor="pointer" _hover={{ color: "#3B82F6" }}>Cookies</Text>
                            </HStack>
                        </Flex>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
