"use client";
import React from "react";
import OrdersList from "./OrdersList";

const page = () => {
  return (
    <section className="min-h-screen w-full bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <OrdersList />
      </div>
    </section>
  );
};

export default page;
