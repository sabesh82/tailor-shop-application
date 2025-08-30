"use client";
import React from "react";
import OrderDetails from "./OrderDetails";

const page = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
        <OrderDetails />
      </div>
    </section>
  );
};

export default page;
