import type { AuthState } from "@type/auth.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: "",
            refreshToken: "",
            expireAt: "",
            setAuth: (auth) => set({
                token: auth.token,
                refreshToken: auth.refreshToken,
                expireAt: auth.expireAt,
            }),
            clearAuth: () => set({
                token: "",
                refreshToken: "",
                expireAt: ""
            }),
        }),
        {
            name: "taskmaster-auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;