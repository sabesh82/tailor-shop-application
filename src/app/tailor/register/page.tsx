"use client";
import React from "react";
import RegisterForm from "./RegisterForm";

const page = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-purple-200">
        <RegisterForm />
      </div>
    </section>
  );
};

export default page;
