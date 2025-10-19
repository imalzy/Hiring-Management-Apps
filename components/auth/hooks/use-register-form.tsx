import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterType } from "../schema/register";

export const useRegisterForm = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    } as RegisterType,
  });

  return {
    control,
    handleSubmit,
    trigger,
    errors,
    reset,
  };
};
