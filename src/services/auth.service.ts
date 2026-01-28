import type { LoginData, LoginResponse, SignupFormData, SignupResponse } from "@type/auth.type"

export const AuthService = {
    login: async (payload: LoginData): Promise<LoginResponse> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Mock Login Payload:", payload);

        // Return mock success response
        return {
            token: "mock-jwt-token-" + Math.random().toString(36).substring(7),
            refreshToken: "mock-refresh-token",
            expireAt: new Date(Date.now() + 3600 * 1000).toISOString(),
        };
    },
    signup: async (payload: SignupFormData): Promise<SignupResponse> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Mock Signup Payload:", payload);

        // Return mock success response
        return {
            token: "mock-jwt-token-" + Math.random().toString(36).substring(7),
            refreshToken: "mock-refresh-token",
            expireAt: new Date(Date.now() + 3600 * 1000).toISOString(),
        };
    },
    logout: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Mock Logout");
    }
}