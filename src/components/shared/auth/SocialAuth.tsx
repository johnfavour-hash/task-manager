import { HStack, IconButton } from "@chakra-ui/react";
import { Github, Mail, Twitter } from "lucide-react";

export const SocialAuth = () => {
    return (
        <HStack gap={4} justify="center">
            <IconButton
                aria-label="Sign in with GitHub"
                variant="ghost"
                color="#718096" // Muted Text
                borderRadius="full"
                border="1px solid"
                borderColor="#E2E8F0" // Border Color
                _hover={{ bg: "#F8F9FB", color: "#3B82F6", borderColor: "#3B82F6" }}
            >
                <Github size={20} />
            </IconButton>
            <IconButton
                aria-label="Sign in with Google"
                variant="ghost"
                color="#718096"
                borderRadius="full"
                border="1px solid"
                borderColor="#E2E8F0"
                _hover={{ bg: "#F8F9FB", color: "#3B82F6", borderColor: "#3B82F6" }}
            >
                <Mail size={20} />
            </IconButton>
            <IconButton
                aria-label="Sign in with Twitter"
                variant="ghost"
                color="#718096"
                borderRadius="full"
                border="1px solid"
                borderColor="#E2E8F0"
                _hover={{ bg: "#F8F9FB", color: "#3B82F6", borderColor: "#3B82F6" }}
            >
                <Twitter size={20} />
            </IconButton>
        </HStack>
    );
};
