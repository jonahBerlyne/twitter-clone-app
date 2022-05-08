import React from 'react';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoute from './Routes/AppRoute';
import AuthRoute from './Routes/AuthRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthRoute><LoginPage/></AuthRoute>}/>
        <Route path="/register" element={<AuthRoute><RegisterPage/></AuthRoute>}/>
        <Route path="/" element={<AppRoute><HomePage/></AppRoute>}/>
      </Routes>
    </Router>
  );
}
