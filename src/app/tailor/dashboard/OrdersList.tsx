"use client";
import React, { useEffect, useState } from "react";
import { useApi } from "@/providers/apiProvider";
import { toast } from "react-hot-toast";

type Order = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  dressDetails: string;
  neckSize: number;
  chestSize: number;
  hipSize: number;
  shoulderSize: number;
  otherMeasurements?: string;
  selectedDesign: { type: string; name: string };
  status: string;
  createdAt: string;
};

const OrdersList = () => {
  const { apiClient } = useApi();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get("/orders/tailor");
      setOrders(data.orders);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    try {
      setLoading(true);
      const { data } = await apiClient.patch(`/orders/${orderId}`, { status });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
      toast.success(`Order ${status.toLowerCase()} successfully`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Customer Orders</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-2xl shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{order.customerName}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "ACCEPTED"
                    ? "bg-green-100 text-green-800"
                    : order.status === "REJECTED"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Email: {order.email}</p>
            <p className="text-sm text-gray-600">Phone: {order.phone}</p>
            <p className="text-sm text-gray-600">Address: {order.address}</p>
            <p className="text-sm text-gray-600">Dress: {order.dressDetails}</p>
            <div className="flex gap-2 text-sm mt-2">
              <p>Neck: {order.neckSize} cm</p>
              <p>Chest: {order.chestSize} cm</p>
              <p>Hip: {order.hipSize} cm</p>
              <p>Shoulder: {order.shoulderSize} cm</p>
            </div>
            {order.otherMeasurements && (
              <p className="text-sm text-gray-600 mt-1">
                Other: {order.otherMeasurements}
              </p>
            )}
            <div className="mt-3 flex gap-2">
              <img
                src={`/designs/${order.selectedDesign.name}`}
                alt={order.selectedDesign.type}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => updateStatus(order.id, "ACCEPTED")}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Accept
              </button>
              <button
                onClick={() => updateStatus(order.id, "REJECTED")}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Reject
              </button>
              <button
                onClick={() => updateStatus(order.id, "DONE")}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrdersList;
