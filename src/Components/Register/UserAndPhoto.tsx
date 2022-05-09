import React from 'react';
import { Form, FloatingLabel } from "react-bootstrap";
import { Avatar } from "@mui/material";

interface UserAndPhotoForm {
 username: string;
 setUsername: (e: any) => void;
 choosePic: (e: any) => void;
 photoUrl: string;
 imgFile: any;
 imgFileErr: string | null;
 showSignUp: () => void;
 register: () => Promise<any>;
};

export default function UserAndPhoto({ username, setUsername, choosePic, photoUrl, imgFile, imgFileErr, showSignUp, register }: UserAndPhotoForm) {
  return (
    <div className="auth">
      <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter Icon" />
      <p className="auth-header">Get Started</p>

      <>

        <div className="img-container">
          <h4>Add an image (optional):</h4>

          <Avatar src={photoUrl} alt={photoUrl} />

          <Form.Control 
            type="file" 
            className="auth-img-input" 
            onChange={choosePic} 
          />

          {imgFileErr && <h6>{imgFileErr}</h6>} 

        </div>

        <div className="username-container">
          <p className="username-at">@</p>

          <FloatingLabel 
            controlId="floatingInput" label="username" 
            className="mb-3"
          >

            <Form.Control 
              type="text" 
              placeholder="username" className="auth-input" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
            />

          </FloatingLabel>
        </div>

      </>

      <button 
        className='btn btn-dark auth-btn' type="button" 
        onClick={() => showSignUp()}
      >Go back
      </button>

      <button
        className='btn btn-dark auth-btn'
        type="submit"
        onClick={register}
      >Register
      </button>

    </div>
  );
}