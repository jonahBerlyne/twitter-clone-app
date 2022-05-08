import React from 'react';
import { Form, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  setName: (e: any) => void;
  setEmail: (e: any) => void;
  setPassword: (e: any) => void;
  setConfirmPassword: (e: any) => void;
};

export default function SignUp({ name, email, password, confirmPassword, setName, setEmail, setPassword, setConfirmPassword }: SignUpForm) {
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
      <div className="auth-link-container">
        <p className='account-question'>Have an account?</p>
        <Link to="/login" className="auth-link">Log in</Link>
      </div>
    </div>
  );
}