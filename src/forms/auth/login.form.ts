import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema, { type LoginFormData } from "@schemas/auth/login.schema";

const useLoginForm = () => {
    return useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
}

export default useLoginForm;
export type { LoginFormData };

