import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import {Form, FloatingLabel} from "react-bootstrap";

export default function LoginPage() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="auth">
      <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter Icon" />
      <p className="auth-header">Sign in to Twitter</p>
      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 auth-input">
        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 auth-input">
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      </FloatingLabel>
      <button className='btn btn-dark auth-btn' type="submit">Login</button>
    </div>
  );
}