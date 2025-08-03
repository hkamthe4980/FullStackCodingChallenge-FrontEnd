import * as Yup from 'yup';

export const signupSchema = Yup.object({
  name: Yup.string().min(3).max(60).required('Name is required'),
  role: Yup.string()
    .oneOf(['admin', 'normal', 'store'], 'Invalid role')
    .required('Role is required'), // ✅ Converted to Yup
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().max(400).required('Address is required'),
  password: Yup.string()
    .min(8, 'Min 8 characters')
    .max(16, 'Max 16 characters')
    .matches(/[A-Z]/, 'One uppercase required')
    .matches(/[@$!%*?&]/, 'One special character required')
    .required('Password is required'),
});
