import React from 'react';
import { Form, FloatingLabel } from "react-bootstrap";
import { Avatar } from "@mui/material";

interface UserAndPhotoForm {
 username: string;
 setUsername: (e: any) => void;
 choosePic: (e: any) => void;
 imgFile: any;
 imgFileErr: string | null;
 imgPreview: any;
 showSignUp: () => void;
 register: () => Promise<any>;
};

export default function UserAndPhoto({ username, setUsername, choosePic, imgFile, imgFileErr, imgPreview, showSignUp, register }: UserAndPhotoForm) {
  return (
    <div className="auth">
      <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter Icon" />
      <p className="auth-header">Get Started</p>

      <>
        <div className="username-container">
          <p className="username-at">@</p>

          <FloatingLabel 
            controlId="floatingInput" label="username" 
            className="mb-3"
          >

            <Form.Control 
              type="text" 
              placeholder="username"
              data-testid="Username" className="auth-input" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              maxLength={23}
              required 
            />

          </FloatingLabel>
        </div>

        <p className='img-container-header'>Add an image (optional):</p>

        <div className="img-container">

          <Form.Control 
            type="file"
            data-testid="imgInput" 
            className="auth-img-input" 
            onChange={choosePic}
          />

          <Avatar src={imgPreview} alt={imgPreview} style={{ height: "65px", width: "65px" }} />

          {imgFileErr && <h6 data-testid="imgFileErr">{imgFileErr}</h6>} 

        </div>


      </>

      <div className="register-btns-container">

        <button 
          className='btn btn-dark auth-btn' type="button" 
          onClick={() => showSignUp()}
        >Go back
        </button>

        <button
          data-testid="registerBtn"
          className='btn btn-dark auth-btn'
          type="submit"
          onClick={register}
          disabled={username === ""}
        >Register
        </button>

      </div>

    </div>
  );
}