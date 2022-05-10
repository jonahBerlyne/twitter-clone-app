import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import { Form, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async (): Promise<any> => {
    if (email === "" || password === "") {
      alert("Please fill in all fields to log in.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(`Login error: ${err}`);
    }
  }

  return (
    <div className="auth">
      <img src="/Images/Twitter/twitterIcon.png" alt="Twitter Icon" />
      <p className="auth-header">Sign in to Twitter</p>
      <>
        <FloatingLabel controlId="floatingEmailLogin" label="Email" className="mb-3">
          <Form.Control type="email" placeholder="Email" className="auth-input" value={email} onChange={e => setEmail(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPasswordLogin" label="Password" className="mb-3">
          <Form.Control type="password" placeholder="Password" className="auth-input" value={password} onChange={e => setPassword(e.target.value)} required />
        </FloatingLabel>
      </>
      <button className='btn btn-dark auth-btn' type="submit" onClick={login} disabled={email === "" || password === ""}>Login</button>
      <div className="auth-link-container">
        <p className='account-question'>Don't have an account?</p>
        <Link to="/register" className="auth-link">Sign up</Link>
      </div>
    </div>
  );
}