"use client";
import React, { useEffect, useState } from "react";
import { useApi } from "@/providers/apiProvider";
import { useParams } from "next/navigation";
import { OrderStatusUpdateInput } from "@/app/api/orders/customer/order.schema";

type Order = {
  id: string;
  customerName: string;
  email: string;
  address: string;
  phone: string;
  dressDetails: string;
  neckSize: number;
  chestSize: number;
  hipSize: number;
  shoulderSize: number;
  otherMeasurements?: string;
  selectedDesign: { type: "neck" | "hand"; name: string };
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "DONE";
  createdAt: string;
};

const OrderDetails = () => {
  const { apiClient } = useApi();
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await apiClient.get(`/orders/${id}`);
        setOrder(data.order);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, apiClient]);

  const handleStatusUpdate = async (
    status: OrderStatusUpdateInput["status"]
  ) => {
    if (!order) return;
    try {
      setUpdatingStatus(true);
      const { data } = await apiClient.patch(`/orders/${order.id}`, { status });
      setOrder(data.order);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading order details...</p>;
  if (!order)
    return <p className="text-center mt-10 text-red-500">Order not found.</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <p>
        <strong>Customer Name:</strong> {order.customerName}
      </p>
      <p>
        <strong>Email:</strong> {order.email}
      </p>
      <p>
        <strong>Phone:</strong> {order.phone}
      </p>
      <p>
        <strong>Address:</strong> {order.address}
      </p>
      <p>
        <strong>Dress Details:</strong> {order.dressDetails}
      </p>
      <p>
        <strong>Neck Size:</strong> {order.neckSize}
      </p>
      <p>
        <strong>Chest Size:</strong> {order.chestSize}
      </p>
      <p>
        <strong>Hip Size:</strong> {order.hipSize}
      </p>
      <p>
        <strong>Shoulder Size:</strong> {order.shoulderSize}
      </p>
      {order.otherMeasurements && (
        <p>
          <strong>Other Measurements:</strong> {order.otherMeasurements}
        </p>
      )}
      <div className="mt-4">
        <strong>Selected Design:</strong>
        <img
          src={`/designs/${order.selectedDesign.name}`}
          alt={order.selectedDesign.type}
          className="w-40 h-40 object-cover rounded-md mt-2"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          disabled={updatingStatus || order.status === "ACCEPTED"}
          onClick={() => handleStatusUpdate("ACCEPTED")}
        >
          Accept
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          disabled={updatingStatus || order.status === "REJECTED"}
          onClick={() => handleStatusUpdate("REJECTED")}
        >
          Reject
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={updatingStatus || order.status === "DONE"}
          onClick={() => handleStatusUpdate("DONE")}
        >
          Done
        </button>
      </div>
      <p className="mt-4 text-gray-500">Status: {order.status}</p>
    </div>
  );
};

export default OrderDetails;
