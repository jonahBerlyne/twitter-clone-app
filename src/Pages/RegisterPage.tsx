import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import { Form, FloatingLabel } from "react-bootstrap";

export default function RegisterPage() {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  return (
    <div className="auth">
      <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter Icon" />
      <p className="auth-header">Sign in to Twitter</p>
      <>
        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
          <Form.Control type="text" placeholder="Name" className="auth-input" value={name} onChange={e => setName(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
          <Form.Control type="email" placeholder="Email" className="auth-input" value={email} onChange={e => setEmail(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
          <Form.Control type="password" placeholder="Password" className="auth-input" value={password} onChange={e => setPassword(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3">
          <Form.Control type="password" placeholder="Confirm Password" className="auth-input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        </FloatingLabel>
      </>
      <button className='btn btn-dark auth-btn' type="submit">Sign Up</button>
    </div>
  );
}