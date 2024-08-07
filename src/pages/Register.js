import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from '../redux/userSlice';
import { Box, Button, TextField } from "@mui/material";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? '' : 'Name is required';
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '' : 'Email is not valid';
    tempErrors.phone = /^[0-9]{10}$/.test(formData.phone) ? '' : 'Phone must be a valid 10-digit number';
    tempErrors.password = formData.password.length >= 6 ? '' : 'Password must be at least 6 characters long';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(createUser(formData)).then(() => {
        navigate('/otp');
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
        disabled={loading}
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        margin="normal"
        disabled={loading}
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
        margin="normal"
        disabled={loading}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        margin="normal"
        disabled={loading}
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
};

export default RegisterForm;
