"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/providers/apiProvider";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { cookieKeys } from "@/config/cookie.config";
import { TailorRegisterInput } from "@/app/api/auth/register/types";
import { UserRegistrationSchema } from "@/app/api/auth/register/register.schema";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TailorRegisterInput>({
    mode: "onSubmit",
    resolver: zodResolver(UserRegistrationSchema),
    shouldFocusError: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { apiClient } = useApi();
  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          setIsLoading(true);
          const { data: tailor } = await apiClient.post("/auth/register", data);
          const token = tailor.token;

          Cookie.set(cookieKeys.USER_TOKEN, token);
          reset();

          router.push("/tailor/dashboard");
        } catch (error) {
          console.log({ error });
        } finally {
          setIsLoading(false);
        }
      })}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        Tailor Registration
      </h2>

      {/* firstName */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className={`p-2 border rounded-md outline-none ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* lastName */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className={`p-2 border rounded-md outline-none ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className={`p-2 border rounded-md outline-none ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className={`p-2 border rounded-md outline-none ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md transition duration-300 disabled:opacity-50"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
