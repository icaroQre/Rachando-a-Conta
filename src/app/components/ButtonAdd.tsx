import React from 'react'

interface ButtonAddProps {
  text: string;
  onClick: () => void;
}

export default function ButtonAdd({text, onClick}: ButtonAddProps) {
  return (
    <button onClick={onClick} className='flex items-center justify-center bg-green hover:bg-greenhover text-white p-2 rounded-lg cursor-pointer'>
        <p className='text-base font-bold'>{text} +</p>
    </button>
  )
}
