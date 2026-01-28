import { useCallback } from "react";
import { Box, Field, Input, Stack, Text, Link } from "@chakra-ui/react";
import { PasswordInput } from "@components/ui/password-input";
import { useNavigate, Link as RouterLink } from "react-router";
import useLoginForm, { type LoginFormData } from "@forms/auth/login.form";
import { AuthHook } from "@hooks/auth.hook";
import useAuthStore from "@stores/auth.store";
import SubmitButton from "@components/shared/buttons/SubmitButton";
import { AuthLayout } from "@components/shared/auth/AuthLayout";
import { SocialAuth } from "@components/shared/auth/SocialAuth";
import { toaster } from "@components/ui/toaster";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useLoginForm();
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const { mutateAsync: login, isPending } = AuthHook.useLogin({
        onSuccess: (data) => {
            setAuth(data);
            toaster.create({
                title: "Welcome back!",
                description: "Successfully signed in to Taskmaster.",
                type: "success",
            });
            navigate("/dashboard");
        }
    });

    const onSubmit = useCallback((data: LoginFormData) => {
        login(data);
    }, [login]);

    return (
        <AuthLayout title="Sign in" welcomeText="Welcome Back!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="6">
                    <Field.Root invalid={!!errors.email?.message}>
                        <Field.Label color="#718096">Email Address</Field.Label> {/* Muted Text */}
                        <Input
                            type="email"
                            {...register("email")}
                            placeholder="email@example.com"
                            bg="#FFFFFF" // White background
                            border="1px solid"
                            borderColor="#E2E8F0" // Border Color
                            _focus={{ borderColor: "#3B82F6", boxShadow: "0 0 0 1px #3B82F6" }} // Brand Blue
                            px={4}
                            h="50px"
                            borderRadius="xl"
                            color="#1A202C" // Main Text
                        />
                        <Field.ErrorText color="red.500">{errors.email?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.password?.message}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Field.Label color="#718096">Password</Field.Label>
                            <Link asChild fontSize="xs" color="#718096" _hover={{ color: "#3B82F6" }}>
                                <RouterLink to="/auth/forgot-password">Forgot password?</RouterLink>
                            </Link>
                        </Box>
                        <PasswordInput
                            {...register("password")}
                            bg="#FFFFFF"
                            border="1px solid"
                            borderColor="#E2E8F0"
                            _groupFocus={{ borderColor: "#3B82F6" }}
                            h="50px"
                            borderRadius="xl"
                            color="#1A202C"
                        />
                        <Field.ErrorText color="red.500">{errors.password?.message}</Field.ErrorText>
                    </Field.Root>

                    <SubmitButton
                        loading={isPending}
                        loadingText="Signing in"
                        type="submit"
                        h="55px"
                        borderRadius="xl"
                        bg="#3B82F6" // Brand Blue
                        color="white"
                        fontSize="md"
                        fontWeight="700"
                        _hover={{ transform: "scale(1.02)", boxShadow: "0 10px 20px rgba(59, 130, 246, 0.2)" }}
                        _active={{ transform: "scale(0.98)" }}
                        transition="all 0.2s"
                    >
                        Sign In
                    </SubmitButton>

                    <Stack gap={4}>
                        <Text textAlign="center" color="#718096" fontSize="xs" textTransform="uppercase" letterSpacing="widest">
                            Or continue with
                        </Text>
                        <SocialAuth />
                    </Stack>

                    <Text textAlign="center" color="#1A202C" fontSize="sm">
                        Don't have an account?{" "}
                        <Link
                            asChild
                            color="#3B82F6"
                            fontWeight="600"
                            _hover={{ textDecoration: "underline" }}
                        >
                            <RouterLink to="/auth/signup">Create one free</RouterLink>
                        </Link>
                    </Text>
                </Stack>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
