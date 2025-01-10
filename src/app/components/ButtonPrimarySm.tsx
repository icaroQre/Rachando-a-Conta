import React from 'react'

export default function ButtonPrimarySm({text}: Readonly<{text: string}>) {
  return (
    <div className='flex items-center justify-center bg-blue hover:bg-bluehover text-white p-4 rounded-lg cursor-pointer'>
        <p className='text-2xl font-bold'>{text} →</p>
    </div>
  )
}
