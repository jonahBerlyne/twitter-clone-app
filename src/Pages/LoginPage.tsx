import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import { Form, FloatingLabel } from "react-bootstrap";

export default function LoginPage() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="auth">
      <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter Icon" />
      <p className="auth-header">Sign in to Twitter</p>
      <>
        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
          <Form.Control type="email" placeholder="Email" className="auth-input" value={email} onChange={e => setEmail(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
          <Form.Control type="password" placeholder="Password" className="auth-input" value={password} onChange={e => setPassword(e.target.value)} required />
        </FloatingLabel>
      </>
      <button className='btn btn-dark auth-btn' type="submit">Login</button>
    </div>
  );
}