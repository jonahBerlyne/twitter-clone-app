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
        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
          <Form.Control type="text" placeholder="Username" className="auth-input" value={username} onChange={e => setUsername(e.target.value)} required />
        </FloatingLabel>
      </>
      <button className='btn btn-dark auth-btn' type="button" onClick={() => showSignUp()}>Go back</button>
    </div>
  );
}