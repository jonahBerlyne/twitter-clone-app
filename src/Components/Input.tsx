import React from 'react';
import "../Styles/Input.css";

interface InputInterface {
  onChange: (e: any) => void;
  placeholder: string;
  type: string;
  value: string;
};

export default function Input({ onChange, placeholder, type, value }: InputInterface) {
  return (
    <div className='input'>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}