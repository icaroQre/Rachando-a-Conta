import React from 'react'

interface MyInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
}

export default function MyInput({ label, type = 'text', name, value, placeholder }: MyInputProps) {
  return (
    <div className='flex flex-col items-start justify-center space-y-2'>
      <p className='text-base text-primary'> {label} </p>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        className="block w-full rounded-md border-secondary border p-2"
      />
    </div>
  )
}
