import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import SignUp from '../Components/Register/SignUp';
import UserAndPhoto from '../Components/Register/UserAndPhoto';

export default function RegisterPage() {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  
  const [username, setUsername] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [imgFile, setImgFile] = useState<any>(null);
  const [imgFileErr, setImgFileErr] = useState<string | null>(null);
  const types: string[] = ['image/png', 'image/jpeg'];

  const choosePic = (e: any): void => {
    const image = e.target.files[0];
    if (image && types.includes(image.type)) {
      setImgFile(image);
      setImgFileErr(null);
    } else {
      setImgFile(null);
      setImgFileErr("Please choose an image file (png or jpeg)");
    }
  }

  useEffect(() => {
   if (imgFile) setPhotoUrl(URL.createObjectURL(imgFile));
  }, [imgFile]);

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
  
  const userAndPhotoProps = { username, setUsername, choosePic, photoUrl, imgFile, imgFileErr, showSignUp };

  return (
    <>
      {signUpIsShown && <SignUp {...signUpProps} />}
      {userAndPhotoIsShown && <UserAndPhoto {...userAndPhotoProps} />}
    </>
  );
}