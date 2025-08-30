import { z } from "zod";

//Allowed statuses for PATCH (tailor updating order)
export const OrderStatusEnum = z.enum(["ACCEPTED", "REJECTED", "DONE"]);

// Schema for PATCH /orders/[id]
export const OrderStatusUpdateSchema = z.object({
  status: OrderStatusEnum,
});

export type OrderStatusUpdateInput = z.infer<typeof OrderStatusUpdateSchema>;
