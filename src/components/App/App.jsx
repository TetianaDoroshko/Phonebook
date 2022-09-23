import { GlobalStyle } from 'components/GlobalStyle';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { persistor } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from 'components/Layout/Layout';
import { LoginPage } from 'pages/LoginPage';
import { RegisterPage } from 'pages/RegisterPage';
import { ContactsPage } from 'pages/ContactsPage';
import { refreshThunk } from 'redux/authThunk';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { PublicRoute } from 'components/PrivateRoute/PublicRoute';
import { GreetingPage } from 'pages/GreetingPage';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <BrowserRouter basename="/Phonebook">
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Toaster />

        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<GreetingPage />} />
            <Route
              path="register"
              element={
                <PublicRoute restricted>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute restricted>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </PersistGate>
    </BrowserRouter>
  );
};
