import React from 'react';
import { Form, FloatingLabel } from "react-bootstrap";

interface UserAndPhotoForm {
 username: string;
 setUsername: (e: any) => void;
 showSignUp: () => void;
};

export default function UserAndPhoto({ username, setUsername, showSignUp }: UserAndPhotoForm) {
  return (
    <div className="auth">
      <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter Icon" />
      <p className="auth-header">Get Started</p>
      <>
        <div className="username-container">
          <p className="username-at">@</p>
          <FloatingLabel controlId="floatingInput" label="username" className="mb-3">
            <Form.Control type="text" placeholder="username" className="auth-input" value={username} onChange={e => setUsername(e.target.value)} required />
          </FloatingLabel>
        </div>
      </>
      <button className='btn btn-dark auth-btn' type="button" onClick={() => showSignUp()}>Go back</button>
    </div>
  );
}