import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
        />
        <Route
          path="/user/dashboard"
          element={<ProtectedRoute role="normal"><UserDashboard /></ProtectedRoute>}
        />
        <Route
          path="/store-owner/dashboard"
          element={<ProtectedRoute role="store"><StoreOwnerDashboard /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
