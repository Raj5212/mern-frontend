import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const RegisterForm = lazy(() => import('./pages/Register'));
const OtpPage = lazy(() => import('./pages/OtpScreen'));
const DetailsPage = lazy(() => import('./pages/Details'));

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/details" element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  </Provider>
  );
}

export default App;
