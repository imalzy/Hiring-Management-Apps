"use client";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { RegisterType } from "../../schema/register";
import { useRegisterForm } from "../../hooks/use-register-form";
import { Controller } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import axios from "axios";

const Register = () => {
  const router = useRouter();
  const { control, handleSubmit, trigger, errors, reset } = useRegisterForm();

  const onSubmitHandler = handleSubmit(
    async (formData: RegisterType) => {
      trigger();
      console.log("formData", formData);
      await axios.post("/api/register", formData);
      toast.success("Registration successful!");
      reset();
      router.replace("/login");
    },
    (err) => {
      console.error("Form submission error:", err);
    },
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-[var(--primary-color)] mb-6 text-center">
          {`Let's create your profile.`}
        </h1>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Full Name"
                required
                placeholder="Ex. John Doe"
                error={errors.fullname?.message}
              />
            )}
          />

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

          <Button type="submit" label="Register" />
        </form>

        <p className="text-center text-sm text-[var(--natural-70)] mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-[var(--primary-color)] font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
