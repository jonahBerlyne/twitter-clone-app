import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import { Form, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RegisterPage() {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [signUpIsShown, setSignUpIsShown] = useState<boolean>(true);
  const [userAndPhotoIsShown, setUserAndPhotoIsShown] = useState<boolean>(false);

  const showUserAndPhoto = (): void => {
    setSignUpIsShown(false);
    setUserAndPhotoIsShown(true);
  }

  const showSignUp = (): void => {
    setUserAndPhotoIsShown(false);
    setSignUpIsShown(true);
  }

  
}