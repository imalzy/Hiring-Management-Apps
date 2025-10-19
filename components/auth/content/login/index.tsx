"use client";

import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";

import toast from "react-hot-toast";

import { LoginType } from "../../schema/login";
import { useLoginForm } from "../../hooks/use-login-form";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const { control, handleSubmit, trigger, errors, reset } = useLoginForm();

  const onSubmitHandler = handleSubmit(
    async (formData: LoginType) => {
      trigger();
      await axios.post("/api/login", formData);
      toast.success("Login successful!");
      reset();
      // onClose();
    },
    (err) => {
      console.error("Form submission error:", err);
    },
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-[var(--primary-color)] mb-6 text-center">
          Welcome back!
        </h1>
        <p className="text-sm text-[var(--natural-60)] mb-6 text-center">
          Login to your account.
        </p>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                label="Email"
                required
                placeholder="Ex. john.doe@example.com"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                label="Password"
                required
                placeholder="Ex. ********"
                error={errors.password?.message}
              />
            )}
          />

          <Button type="submit" label="Login" />
        </form>

        <p className="text-center text-sm text-[var(--natural-70)] mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-[var(--primary-color)] font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
