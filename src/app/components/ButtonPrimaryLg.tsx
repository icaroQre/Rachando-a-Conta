import React from 'react'

export default function ButtonPrimaryLg({text}: Readonly<{text: string}>) {
  return (
    <div className='flex items-center justify-center bg-blue hover:bg-bluehover text-white p-6 rounded-2xl cursor-pointer'>
        <p className='text-3xl font-bold'>{text} →</p>
    </div>
  )
}
