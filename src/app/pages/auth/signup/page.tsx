import { useCallback } from "react";
import { Field, Input, Stack, Text, Link } from "@chakra-ui/react";
import { PasswordInput } from "@components/ui/password-input";
import { useNavigate, Link as RouterLink } from "react-router";
import useSignupForm from "@forms/auth/signup.form";
import type { AuthData, SignupFormData } from "@type/auth.type";
import { AuthHook } from "@hooks/auth.hook";
import useAuthStore from "@stores/auth.store";
import SubmitButton from "@components/shared/buttons/SubmitButton";
import { AuthLayout } from "@components/shared/auth/AuthLayout";
import { SocialAuth } from "@components/shared/auth/SocialAuth";
import { toaster } from "@components/ui/toaster";

const SignupPage = () => {
    const { register, handleSubmit, formState: { errors } } = useSignupForm();
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const { mutateAsync: signup, isPending } = AuthHook.useSignup({
        onSuccess: (data) => {
            setAuth(data as AuthData);
            toaster.create({
                title: "Account created!",
                description: "Welcome to Taskmaster. Your journey starts here.",
                type: "success",
            });
            navigate("/dashboard");
        }
    });

    const onSubmit = useCallback((data: SignupFormData) => {
        signup(data);
    }, [signup]);

    return (
        <AuthLayout title="Create account" welcomeText="Step into Taskmaster">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="6">
                    <Field.Root invalid={!!errors.name?.message}>
                        <Field.Label color="#718096">Full Name</Field.Label>
                        <Input
                            {...register("name")}
                            placeholder="John Doe"
                            bg="#FFFFFF"
                            border="1px solid"
                            borderColor="#E2E8F0"
                            _focus={{ borderColor: "#3B82F6", boxShadow: "0 0 0 1px #3B82F6" }}
                            px={4}
                            h="50px"
                            borderRadius="xl"
                            color="#1A202C"
                        />
                        <Field.ErrorText color="red.500">{errors.name?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.email?.message}>
                        <Field.Label color="#718096">Email Address</Field.Label>
                        <Input
                            type="email"
                            {...register("email")}
                            placeholder="email@example.com"
                            bg="#FFFFFF"
                            border="1px solid"
                            borderColor="#E2E8F0"
                            _focus={{ borderColor: "#3B82F6", boxShadow: "0 0 0 1px #3B82F6" }}
                            px={4}
                            h="50px"
                            borderRadius="xl"
                            color="#1A202C"
                        />
                        <Field.ErrorText color="red.500">{errors.email?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.password?.message}>
                        <Field.Label color="#718096">Password</Field.Label>
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
                        loadingText="Creating account"
                        type="submit"
                        h="55px"
                        borderRadius="xl"
                        bg="#3B82F6"
                        color="white"
                        fontSize="md"
                        fontWeight="700"
                        _hover={{ transform: "scale(1.02)", boxShadow: "0 10px 20px rgba(59, 130, 246, 0.2)" }}
                        _active={{ transform: "scale(0.98)" }}
                        transition="all 0.2s"
                    >
                        Sign Up
                    </SubmitButton>

                    <Stack gap={4}>
                        <Text textAlign="center" color="#718096" fontSize="xs" textTransform="uppercase" letterSpacing="widest">
                            Or sign up with
                        </Text>
                        <SocialAuth />
                    </Stack>

                    <Text textAlign="center" color="#1A202C" fontSize="sm">
                        Already have an account?{" "}
                        <Link
                            asChild
                            color="#3B82F6"
                            fontWeight="600"
                            _hover={{ textDecoration: "underline" }}
                        >
                            <RouterLink to="/auth/login">Sign in instead</RouterLink>
                        </Link>
                    </Text>
                </Stack>
            </form>
        </AuthLayout>
    );
};

export default SignupPage;
