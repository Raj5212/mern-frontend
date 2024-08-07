import React from 'react';
import {  useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';


const DetailsPage = () => {
  const userDetails = useSelector((state) => state.user.user);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
      <Typography variant="h5">User Details</Typography>
      <Typography>Name: {userDetails?.name || "JOHN"}</Typography>
      <Typography>Email: {userDetails?.email || "john@yopmail.com"}</Typography>
    </Box>
  );
};

export default DetailsPage;
