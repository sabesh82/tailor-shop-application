"use client";

import React from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Welcome to Tailor Shop
        </h1>
        <p className="text-gray-600 text-lg">Choose your role to continue</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => router.push("/customer/order")}
          className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:bg-purple-700 transition"
        >
          I&apos;m Customer
        </button>

        <button
          onClick={() => router.push("/tailor/login")}
          className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold text-lg shadow-lg hover:bg-gray-800 transition"
        >
          I&apos;m Tailor
        </button>
      </div>
    </section>
  );
};

export default LandingPage;
