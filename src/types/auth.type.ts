export interface AuthData {
    token: string;
    refreshToken: string;
    expireAt: string;
}

export interface AuthState extends AuthData {
    setAuth: (auth: AuthData) => void;
    clearAuth: () => void;
}


// login
export interface LoginData {
    email: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    refreshToken: string;
    expireAt: string;
}

// signup
export type { SignupFormData } from "@schemas/auth/signup.schema";
export interface SignupData {
    name: string;
    email: string;
    password: string;
}
export interface SignupResponse {
    token: string;
    refreshToken: string;
    expireAt: string;
}
