import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '20px' }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
