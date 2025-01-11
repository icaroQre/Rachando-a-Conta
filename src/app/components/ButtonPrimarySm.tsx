import React from 'react'

interface ButtonPrimarySmProps {
  text: string;
  type: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

export default function ButtonPrimarySm({text, type}: ButtonPrimarySmProps) {
  return (
    <button type={type} className='flex items-center justify-center bg-blue hover:bg-bluehover text-white p-4 rounded-lg cursor-pointer'>
        <p className='text-2xl font-bold'>{text} →</p>
    </button>
  )
}
