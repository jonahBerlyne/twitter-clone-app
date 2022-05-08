import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import Input from '../Components/Input';

export default function LoginPage() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="login">
      <h1>Sign in to Twitter</h1>
      <Input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className='btn' type="submit">Login</button>
    </div>
  );
}