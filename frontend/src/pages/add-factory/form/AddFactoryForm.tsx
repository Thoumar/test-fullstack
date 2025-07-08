import { useState } from 'react';

import { Navigate } from 'react-router-dom';

import { z } from 'zod';
import { Formik, Form, Field, FieldProps } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Button, TextField, Box, Typography } from '@mui/material';

import { useFactories } from 'hooks';

import styles from './AddFactoryForm.module.sass';

const factorySchema = z.object({
  name: z.string().min(1, 'Please give the factory a name.'),
  country: z.string().min(1, 'Please specify a country.'),
  address: z.string().min(1, 'Please enter an address.'),
  latitude: z.coerce
    .number({ invalid_type_error: 'Enter a valid number.' })
    .min(-90, 'Latitude must be >= -90.')
    .max(90, 'Latitude must be <= 90.'),
  longitude: z.coerce
    .number({ invalid_type_error: 'Enter a valid number.' })
    .min(-180, 'Longitude must be >= -180.')
    .max(180, 'Longitude must be <= 180.'),
  yearlyRevenue: z.coerce
    .number({ invalid_type_error: 'Enter a valid number.' })
    .positive('Revenue must be greater than 0.'),
});

type FactoryFormValues = z.infer<typeof factorySchema>;

const initialValues: FactoryFormValues = {
  name: '',
  country: '',
  address: '',
  latitude: 0,
  longitude: 0,
  yearlyRevenue: 0,
};

export function AddFactoryForm() {
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const { addFactory } = useFactories({});

  if (formSuccess) return <Navigate to="/factories" />;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(factorySchema)}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setFormError('');
          await addFactory.mutate(values);
          setFormSuccess(true);
        } catch (err) {
          setFormError(addFactory.error?.message || 'An error has occurred.');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, errors, touched }) => (
        <Form noValidate className={styles.form}>
          <Box display="flex" flexDirection="column" gap={2} width={400}>
            {formError && <Typography color="error">{formError}</Typography>}

            <Field name="name">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Factory Name"
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  fullWidth
                />
              )}
            </Field>

            <Field name="country">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Country"
                  error={touched.country && !!errors.country}
                  helperText={touched.country && errors.country}
                  fullWidth
                />
              )}
            </Field>

            <Field name="address">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Address"
                  error={touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  fullWidth
                />
              )}
            </Field>

            <Field name="latitude">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Latitude"
                  type="number"
                  error={touched.latitude && !!errors.latitude}
                  helperText={touched.latitude && errors.latitude}
                  fullWidth
                />
              )}
            </Field>

            <Field name="longitude">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Longitude"
                  type="number"
                  error={touched.longitude && !!errors.longitude}
                  helperText={touched.longitude && errors.longitude}
                  fullWidth
                />
              )}
            </Field>

            <Field name="yearlyRevenue">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Yearly Revenue"
                  type="number"
                  error={touched.yearlyRevenue && !!errors.yearlyRevenue}
                  helperText={touched.yearlyRevenue && errors.yearlyRevenue}
                  fullWidth
                />
              )}
            </Field>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid || isSubmitting || addFactory.isLoading}
            >
              {addFactory.isLoading ? 'Adding...' : 'Add'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
