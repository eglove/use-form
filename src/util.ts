import { ZodError } from 'zod';

export const getZodFieldErrors = (
  error: unknown,
  errorMap: Record<string, unknown>,
): Record<string, string[]> => {
  let errors: Record<string, string[]> = {};

  if (error instanceof ZodError) {
    for (const key of Object.keys(errorMap)) {
      const errorArray = error.formErrors.fieldErrors[key];

      if (errorArray !== undefined) {
        errors = {
          ...errors,
          [key]: errorArray,
        };
      }
    }
  }

  return errors;
};
