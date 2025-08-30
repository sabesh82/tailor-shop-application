"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/providers/apiProvider";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { TailorLoginInput } from "@/app/api/auth/login/types";
import { UserLoginSchema } from "@/app/api/auth/login/login.schema";
import { cookieKeys } from "@/config/cookie.config";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TailorLoginInput>({
    mode: "onSubmit",
    resolver: zodResolver(UserLoginSchema),
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
          const { data: user } = await apiClient.post("auth/login", data);
          const token = user.token;

          Cookie.set(cookieKeys.USER_TOKEN, token);
          reset();

          router.push("/tailor/dashboard");
        } catch (error) {
          console.log({ error });
        } finally {
          setIsLoading(false);
        }
      })}
      className="w-full max-w-xs mx-auto mt-10 space-y-4"
    >
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">
        Tailor Login
      </h1>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm text-gray-900 mb-1">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="Enter your email"
          className={`p-2 rounded-md border outline-none ${
            errors.email
              ? "border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-900"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm text-gray-900 mb-1">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="Enter your password"
          className={`p-2 rounded-md border outline-none ${
            errors.password
              ? "border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-900"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 mt-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <div className="flex gap-1 cursor-pointer text-sm">
        <p>Don't have an accout?</p>
        <button
          className="underline"
          onClick={() => router.push("/tailor/register")}
        >
          Register here
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
