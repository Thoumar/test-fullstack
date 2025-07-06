import { ZodIssue, ZodSchema } from 'zod';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: ZodIssue[];
}

export const validateRequest = <T>(
  schema: ZodSchema<T>,
  data: T
): ValidationResult<T> => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, errors: result.error.errors };
};
