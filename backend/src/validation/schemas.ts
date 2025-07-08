import { z } from 'zod';

export const addFactorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  country: z.string().min(1, 'Country is required'),
  address: z.string().min(1, 'Address is required'),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  yearlyRevenue: z.coerce.number().positive('Yearly revenue must be positive'),
});

export const getFactoriesSchema = z
  .object({
    q: z.string().optional(),
    page: z
      .string()
      .optional()
      .refine((val) => val === undefined || (!isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0), {
        message: 'Page must be a positive integer',
      }),
    limit: z
      .string()
      .optional()
      .refine(
        (val) => val === undefined || (!isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0 && parseInt(val, 10) <= 100),
        { message: 'Limit must be a positive integer between 1 and 100' }
      ),
    country: z
      .string()
      .optional()
      .refine((val) => val === undefined || val.trim().length > 0, {
        message: 'Country cannot be empty if provided',
      }),
    minRevenue: z
      .string()
      .optional()
      .refine((val) => val === undefined || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
        message: 'MinRevenue must be a non-negative number',
      }),
    maxRevenue: z
      .string()
      .optional()
      .refine((val) => val === undefined || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
        message: 'MaxRevenue must be a non-negative number',
      }),
  })
  .refine(
    (data) => {
      if (data.minRevenue && data.maxRevenue) {
        const min = parseFloat(data.minRevenue);
        const max = parseFloat(data.maxRevenue);
        return min <= max;
      }
      return true;
    },
    {
      message: 'MinRevenue cannot be greater than MaxRevenue',
      path: ['minRevenue'],
    }
  );

export const getReportSchema = z.object({
  id: z.string().min(1, 'Factory ID is required'),
});

export type AddFactoryRequest = z.infer<typeof addFactorySchema>;
export type GetFactoriesQuery = z.infer<typeof getFactoriesSchema>;
export type GetReportParams = z.infer<typeof getReportSchema>;
