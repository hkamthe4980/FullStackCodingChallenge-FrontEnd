import React from 'react';
import { useFormik } from 'formik';
import { signupSchema } from '../utils/validators';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

function Signup() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      password: '',
      role: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        await API.post('/auth/register', values);
        alert('Signup successful');
        navigate('/');
      } catch {
        alert('Signup failed');
      }
    },
  });

  return (
    <div className="auth-container">
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <h2>Signup</h2>

        {['name', 'email', 'address', 'password'].map((field) => (
          <div key={field}>
            <input
              name={field}
              type={field === 'password' ? 'password' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[field] && formik.errors[field] && (
              <small className="text-danger">{formik.errors[field]}</small>
            )}
          </div>
        ))}

        {/* ✅ Role Dropdown */}
        <div>
          <select
            name="role"
            className="auth-form-input"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              marginBottom: '1rem',
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              background: 'white',
            }}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="normal">Normal User</option>
            <option value="store">Store Owner</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <small className="text-danger">{formik.errors.role}</small>
          )}
        </div>

        <button type="submit">Register</button>
        <p onClick={() => navigate('/')}>Already have an account? Login</p>
      </form>
    </div>
  );
}

export default Signup;
