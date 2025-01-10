import React from 'react'

export default function ButtonAdd({text}: Readonly<{text: string}>) {
  return (
    <div className='flex items-center justify-center bg-green hover:bg-greenhover text-white p-2 rounded-lg cursor-pointer'>
        <p className='text-base font-bold'>{text} +</p>
    </div>
  )
}
