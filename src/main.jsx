import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage.jsx';
import Dashboard from './Dashboard.jsx';
import CreateRide from './pages/CreateRide.jsx';
import SearchRide from './pages/SearchRide.jsx';
import Notifications from './pages/Notifications.jsx';
import Profile from './pages/Profile.jsx';
import Analytics from "./pages/Analytics.jsx";
import RideInfo from './pages/RideInfo.jsx';

import Register from './components/authentication/Register.jsx';
import Login from './components/authentication/Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Route with Nested Pages */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="create-ride" element={<CreateRide />} />
          <Route path="search-ride" element={<SearchRide />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ride-info" element={<RideInfo />} />
          <Route index element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);