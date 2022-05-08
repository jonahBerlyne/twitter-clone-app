import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebaseConfig";

export default function AppRoute ({children}: {children: any}) {
 const [pending, setPending] = useState<boolean>(true);
 const [currentUser, setCurrentUser] = useState<any>(null);

 useEffect(() => {
  const unsub = onAuthStateChanged(
   auth,
   user => {
    user ? setCurrentUser(user) : setCurrentUser(null);
    setPending(false);
   },
   err => {
    alert(`Error: ${err}`);
    setPending(false);
   }
  );

  return unsub;
 }, []);

 if (pending) return null;

 if (currentUser) {
  return (
    <div>
      {children}
    </div>
  );
 } else {
   return <Navigate to="/login" />;
 }
}