import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import SignUp from '../Components/Register/SignUp';
import UserAndPhoto from '../Components/Register/UserAndPhoto';
import fireDB, { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, collection, setDoc } from 'firebase/firestore';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { store } from "../Redux/store";

export default function RegisterPage() {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  
  const [username, setUsername] = useState<string>("");
  const [imgFile, setImgFile] = useState<any>(null);
  const [imgFileErr, setImgFileErr] = useState<string | null>(null);
  const [imgPreview, setImgPreview] = useState<any>(null);
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
   if (imgFile) setImgPreview(URL.createObjectURL(imgFile));
   return () => {
     setImgPreview(null);
   }
  }, [imgFile]);

  const [signUpIsShown, setSignUpIsShown] = useState<boolean>(true);
  const [userAndPhotoIsShown, setUserAndPhotoIsShown] = useState<boolean>(false);

  const showUserAndPhoto = (): void => {
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      alert("Please fill in all fields before continuing.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Please confirm your password before continuing.");
      return;
    }
    setSignUpIsShown(false);
    setUserAndPhotoIsShown(true);
  }

  const showSignUp = (): void => {
    setUserAndPhotoIsShown(false);
    setSignUpIsShown(true);
  }

  const register = async (): Promise<any> => {
    if (username === "") {
      alert("Please type in a username");
      return;
    }
    try {
      let photoUrl: string = "";
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("checkpoint 1");
      if (imgFile) {
        const storage = getStorage();
        const uploadTask = ref(storage, `${userCredential.user.uid}/${imgFile.name}`);
        await uploadBytes(uploadTask, imgFile);
        photoUrl = await getDownloadURL(uploadTask);
      }
      console.log("checkpoint 2");
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoUrl
      });
      console.log("checkpoint 3");
      const docRef = doc(fireDB, "users", `${userCredential.user.uid}`);
      const userDoc = {
        name,
        email,
        password,
        username,
        photoUrl
      };
      await setDoc(docRef, userDoc);
      console.log("checkpoint 4");
    } catch (err) {
      alert(`Registration error: ${err}`);
    }
  }

  const signUpProps = { name, email, password, confirmPassword, setName, setEmail, setPassword, setConfirmPassword, showUserAndPhoto };
  
  const userAndPhotoProps = { username, setUsername, choosePic, imgFileErr, imgPreview, showSignUp, register };

  return (
    <>
      {signUpIsShown && <SignUp {...signUpProps} />}
      {userAndPhotoIsShown && <UserAndPhoto {...userAndPhotoProps} />}
    </>
  );
}