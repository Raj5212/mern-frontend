import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated } from '../redux/userSlice';

const OtpPage = ({ user, setOtp }) => {
  const [otp, setLocalOtp] = useState(['', '', '', '']);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) { // Only allow numeric input
      const newOtp = [...otp];
      newOtp[index] = value;
      setLocalOtp(newOtp);

      // Focus the next input box
      if (value !== '' && index < 3) {
        otpRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Focus the previous input box on backspace
      if (index > 0) {
        otpRefs[index - 1].current.focus();
      }
    }
  };
 useEffect(()=>{
  alert("Your Otp is 1234")
 },[])


  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    // setOtp(enteredOtp);
    // Assuming OTP is always '1234' for demonstration
    if (enteredOtp === '1234') {
      dispatch(setIsAuthenticated(true))
      navigate('/details');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
      <Typography variant="h5" gutterBottom>
        Enter OTP
      </Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        {otp.map((_, index) => (
          <TextField
            key={index}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
            variant="outlined"
            type="text"
            inputRef={otpRefs[index]}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Verify OTP
      </Button>
    </Box>
  );
};

export default OtpPage;