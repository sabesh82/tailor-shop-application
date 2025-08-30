"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/providers/apiProvider";
import {
  OrderCreateInput,
  OrderCreateSchema,
} from "@/app/api/orders/customer/order.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const designFiles = ["frock.jpg", "kurta.jpg", "shirt.jpg"];

const OrderForm = () => {
  const router = useRouter();
  const { apiClient } = useApi();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OrderCreateInput>({
    mode: "onChange",
    resolver: zodResolver(OrderCreateSchema),
    shouldFocusError: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<"neck" | "hand">("neck");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // when an image is clicked, update the react-hook-form value for selectedDesign
  const onSelectImage = (name: string) => {
    setSelectedImage(name);
    setValue(
      "selectedDesign",
      { type: selectedType, name },
      { shouldValidate: true, shouldTouch: true }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          setIsLoading(true);

          // ensure selectedDesign is present
          if (!data.selectedDesign || !data.selectedDesign.name) {
            // if not selected, try to use local selectedImage
            if (selectedImage) {
              data.selectedDesign = { type: selectedType, name: selectedImage };
            } else {
              alert("Please select a design image.");
              setIsLoading(false);
              return;
            }
          }

          const { data: res } = await apiClient.post("orders/customer", data);

          reset();
          alert("Order submitted successfully");
          router.push("/");
        } catch (err) {
          console.error("Order submit error:", err);
          alert("Failed to submit order. Please try again.");
        } finally {
          setIsLoading(false);
        }
      })}
      className="space-y-6 w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col gap-5 bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">
          Place Tailoring Order
        </h2>

        {/* Customer Name */}
        <div className="flex flex-col">
          <label
            className={`mb-1 text-sm font-medium ${
              errors.customerName ? "text-red-600" : "text-gray-700"
            }`}
          >
            Name
          </label>
          <input
            {...register("customerName")}
            type="text"
            placeholder="Full name"
            className={`p-3 rounded-xl border outline-none transition duration-300 ${
              errors.customerName
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            }`}
          />
          {errors.customerName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.customerName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            className={`mb-1 text-sm font-medium ${
              errors.email ? "text-red-600" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={`p-3 rounded-xl border outline-none transition duration-300 ${
              errors.email
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label
            className={`mb-1 text-sm font-medium ${
              errors.phone ? "text-red-600" : "text-gray-700"
            }`}
          >
            Phone
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+94XXXXXXXXX"
            className={`p-3 rounded-xl border outline-none transition duration-300 ${
              errors.phone
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            }`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label
            className={`mb-1 text-sm font-medium ${
              errors.address ? "text-red-600" : "text-gray-700"
            }`}
          >
            Address
          </label>
          <input
            {...register("address")}
            type="text"
            placeholder="Street, City, ZIP"
            className={`p-3 rounded-xl border outline-none transition duration-300 ${
              errors.address
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            }`}
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Dress Details */}
        <div className="flex flex-col">
          <label
            className={`mb-1 text-sm font-medium ${
              errors.dressDetails ? "text-red-600" : "text-gray-700"
            }`}
          >
            Dress details
          </label>
          <input
            {...register("dressDetails")}
            type="text"
            placeholder="e.g., kurta, frock, shirt - color, style notes"
            className={`p-3 rounded-xl border outline-none transition duration-300 ${
              errors.dressDetails
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            }`}
          />
          {errors.dressDetails && (
            <p className="text-sm text-red-500 mt-1">
              {errors.dressDetails.message}
            </p>
          )}
        </div>

        {/* Measurements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className={`mb-1 text-sm font-medium ${
                errors.neckSize ? "text-red-600" : "text-gray-700"
              }`}
            >
              Neck Size(cm)
            </label>
            <input
              {...register("neckSize", { valueAsNumber: true })}
              type="number"
              step="0.1"
              placeholder="e.g., 14.5"
              className={`p-3 rounded-xl border outline-none transition duration-300 w-full ${
                errors.neckSize
                  ? "border-red-500 focus:ring-1 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.neckSize && (
              <p className="text-sm text-red-500 mt-1">
                {errors.neckSize.message}
              </p>
            )}
          </div>

          <div>
            <label
              className={`mb-1 text-sm font-medium ${
                errors.chestSize ? "text-red-600" : "text-gray-700"
              }`}
            >
              Chest Size(cm)
            </label>
            <input
              {...register("chestSize", { valueAsNumber: true })}
              type="number"
              step="0.1"
              placeholder="e.g., 36"
              className={`p-3 rounded-xl border outline-none transition duration-300 w-full ${
                errors.chestSize
                  ? "border-red-500 focus:ring-1 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.chestSize && (
              <p className="text-sm text-red-500 mt-1">
                {errors.chestSize.message}
              </p>
            )}
          </div>

          <div>
            <label
              className={`mb-1 text-sm font-medium ${
                errors.hipSize ? "text-red-600" : "text-gray-700"
              }`}
            >
              Hip Size(cm)
            </label>
            <input
              {...register("hipSize", { valueAsNumber: true })}
              type="number"
              step="0.1"
              placeholder="e.g., 38"
              className={`p-3 rounded-xl border outline-none transition duration-300 w-full ${
                errors.hipSize
                  ? "border-red-500 focus:ring-1 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.hipSize && (
              <p className="text-sm text-red-500 mt-1">
                {errors.hipSize.message}
              </p>
            )}
          </div>

          <div>
            <label
              className={`mb-1 text-sm font-medium ${
                errors.shoulderSize ? "text-red-600" : "text-gray-700"
              }`}
            >
              Shoulder Size(cm)
            </label>
            <input
              {...register("shoulderSize", { valueAsNumber: true })}
              type="number"
              step="0.1"
              placeholder="e.g., 15"
              className={`p-3 rounded-xl border outline-none transition duration-300 w-full ${
                errors.shoulderSize
                  ? "border-red-500 focus:ring-1 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-purple-500"
              }`}
            />
            {errors.shoulderSize && (
              <p className="text-sm text-red-500 mt-1">
                {errors.shoulderSize.message}
              </p>
            )}
          </div>
        </div>

        {/* Other measurements */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Other measurements (optional)
          </label>
          <textarea
            {...register("otherMeasurements")}
            rows={3}
            placeholder="Any additional details"
            className="p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
        </div>

        {/* Design type selector */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Design area
          </label>
          <div className="flex items-center gap-3">
            <label
              className={`px-3 py-2 rounded-lg cursor-pointer ${
                selectedType === "neck"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="designType"
                value="neck"
                checked={selectedType === "neck"}
                onChange={() => {
                  setSelectedType("neck");
                  if (selectedImage)
                    setValue(
                      "selectedDesign",
                      { type: "neck", name: selectedImage },
                      { shouldValidate: true }
                    );
                }}
                className="hidden"
              />
              Neck
            </label>

            <label
              className={`px-3 py-2 rounded-lg cursor-pointer ${
                selectedType === "hand"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="designType"
                value="hand"
                checked={selectedType === "hand"}
                onChange={() => {
                  setSelectedType("hand");
                  if (selectedImage)
                    setValue(
                      "selectedDesign",
                      { type: "hand", name: selectedImage },
                      { shouldValidate: true }
                    );
                }}
                className="hidden"
              />
              Hand
            </label>
          </div>
        </div>

        {/* Design images */}
        <div>
          <p className="mb-2 text-sm text-gray-700">Select a sample design</p>
          <div className="flex gap-4">
            {designFiles.map((file) => {
              const isSelected = selectedImage === file;
              return (
                <button
                  key={file}
                  type="button"
                  onClick={() => onSelectImage(file)}
                  className={`border rounded-xl overflow-hidden p-1 ${
                    isSelected
                      ? "border-purple-600 ring-2 ring-purple-200"
                      : "border-gray-200"
                  } transition`}
                >
                  <img
                    src={`/designs/${file}`}
                    alt={file}
                    className="w-32 h-24 object-cover"
                  />
                </button>
              );
            })}
          </div>
          {errors.selectedDesign && (
            <p className="text-sm text-red-500 mt-1">
              {(errors.selectedDesign as any)?.name?.message ||
                "Please select a design"}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg py-3 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Place Order"}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
