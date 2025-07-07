import { z } from 'zod';

export const addFactorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  country: z.string().min(1, 'Country is required'),
  address: z.string().min(1, 'Address is required'),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  yearlyRevenue: z.coerce.number().positive('Yearly revenue must be positive'),
});

export const getFactoriesSchema = z.object({
  q: z.string().optional(),
});

export const getReportSchema = z.object({
  id: z.string().min(1, 'Factory ID is required'),
});

export type AddFactoryRequest = z.infer<typeof addFactorySchema>;
export type GetFactoriesQuery = z.infer<typeof getFactoriesSchema>;
export type GetReportParams = z.infer<typeof getReportSchema>;
