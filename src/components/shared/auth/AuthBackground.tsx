import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

export const AuthBackground = () => {
    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="#F8F9FB" // Light background
            overflow="hidden"
            zIndex={0}
        >
            {/* Animated Abstract Shapes - Light Mode */}

            {/* Top Right Circle */}
            <MotionBox
                position="absolute"
                top="-10%"
                right="-5%"
                w="400px"
                h="400px"
                borderRadius="full"
                bg="linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)" // Brand Blue subtle
                filter="blur(80px)"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Bottom Left Circle */}
            <MotionBox
                position="absolute"
                bottom="-15%"
                left="-10%"
                w="600px"
                h="600px"
                borderRadius="full"
                bg="linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.03) 100%)"
                filter="blur(100px)"
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -30, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Accent Line 1 */}
            <MotionBox
                position="absolute"
                top="20%"
                left="15%"
                w="200px"
                h="4px"
                bg="rgba(59, 130, 246, 0.1)"
                borderRadius="full"
                animate={{
                    x: [-20, 20],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Accent Line 2 */}
            <MotionBox
                position="absolute"
                bottom="30%"
                right="10%"
                w="300px"
                h="4px"
                bg="rgba(59, 130, 246, 0.05)"
                borderRadius="full"
                animate={{
                    x: [20, -20],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </Box>
    );
};
