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
  showUserAndPhoto: () => void;
};

export default function SignUp({ name, email, password, confirmPassword, setName, setEmail, setPassword, setConfirmPassword, showUserAndPhoto }: SignUpForm) {
  return (
    <div className="auth">
      <img src="/Images/Twitter/twitterIcon.png" alt="Twitter Icon" />
      <p className="auth-header">Sign Up</p>
      <>
        <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
          <Form.Control type="text" placeholder="Name" data-testid="Name" className="auth-input" value={name} onChange={e => setName(e.target.value)} maxLength={23} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingEmailSignUp" label="Email" className="mb-3">
          <Form.Control type="email" placeholder="Email" data-testid="Email" className="auth-input" value={email} onChange={e => setEmail(e.target.value)} maxLength={30} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPasswordSignUp" label="Password" className="mb-3">
          <Form.Control type="password" placeholder="Password" data-testid="Password" className="auth-input" value={password} onChange={e => setPassword(e.target.value)} maxLength={25} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
          <Form.Control type="password" placeholder="Confirm Password" data-testid="confirmPassword" className="auth-input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} maxLength={25} required />
        </FloatingLabel>
      </>
      <button data-testid="userAndPhotoBtn" className='btn btn-dark auth-btn' type="button" onClick={() => showUserAndPhoto()} disabled={name === "" || email === "" || password === "" || confirmPassword === "" || password !== confirmPassword}>Next</button>
      <div className="auth-link-container">
        <p className='account-question'>Have an account?</p>
        <Link to="/login" data-testid="login-link" className="auth-link">Log in</Link>
      </div>
    </div>
  );
}