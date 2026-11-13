import * as Yup from 'yup';

// Stuff validation schemas
export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

// Contact interface
export interface Contact {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
}

// Add Contact validation schema
export const AddContactSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address: Yup.string().required('Address is required'),
  image: Yup.string().required('Image is required'),
  description: Yup.string().required('Description is required'),
});

// Edit Contact validation schema
export const EditContactSchema = Yup.object({
  id: Yup.number().required('Contact ID is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address: Yup.string().required('Address is required'),
  image: Yup.string().required('Image is required'),
  description: Yup.string().required('Description is required'),
});

// TypeScript types for the contact forms
export type AddContactFormValues = Yup.InferType<
  typeof AddContactSchema
>;

export type EditContactFormValues = Yup.InferType<
  typeof EditContactSchema
>;
