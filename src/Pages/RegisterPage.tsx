import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import SignUp from '../Components/Register/SignUp';
import UserAndPhoto from '../Components/Register/UserAndPhoto';

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

  const signUpProps = { name, email, password, confirmPassword, setName, setEmail, setPassword, setConfirmPassword, showUserAndPhoto };
  const userAndPhotoProps = { username, setUsername, showSignUp };

  return (
    <>
      {signUpIsShown && <SignUp {...signUpProps} />}
      {userAndPhotoIsShown && <UserAndPhoto {...userAndPhotoProps} />}
    </>
  );
}