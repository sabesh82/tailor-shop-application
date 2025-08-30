import { z } from "zod";

export const DesignTypeEnum = z.enum(["neck", "hand"]);

export const SelectedDesignSchema = z.object({
  type: DesignTypeEnum,
  name: z.string().min(1, "Design file name is required"),
});

export const MeasurementsSchema = z.object({
  neckSize: z.number().nonnegative(),
  chestSize: z.number().nonnegative(),
  hipSize: z.number().nonnegative(),
  shoulderSize: z.number().nonnegative(),
  otherMeasurements: z.string().optional(),
});

export const OrderCreateSchema = z
  .object({
    customerName: z.string().min(1, "Customer name is required"),
    email: z.string().email("Valid email required"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(3, "Phone is required"),
    dressDetails: z.string().min(1, "Dress details are required"),
    selectedDesign: SelectedDesignSchema,
  })
  .and(MeasurementsSchema);

export const OrderStatusSchema = z.enum(["ACCEPTED", "REJECTED", "DONE"]);

export const OrderStatusUpdateSchema = z.object({
  status: OrderStatusSchema,
});

export const OrdersListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  size: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
});

export type OrderCreateInput = z.infer<typeof OrderCreateSchema>;
export type OrderStatusUpdateInput = z.infer<typeof OrderStatusUpdateSchema>;
export type OrdersListQueryInput = z.infer<typeof OrdersListQuerySchema>;
