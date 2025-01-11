'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import ButtonAdd from '../components/ButtonAdd'
import ButtonPrimarySm from '../components/ButtonPrimarySm'
import MyInput from '../components/MyInput'
import { FaRegTrashAlt } from "react-icons/fa";

export default function Bill() {

  const [items, setItems] = useState<String[]>([""]);
  const [friends, setFriends] = useState<string[]>([""]);

  const addItem = () => {
    setItems([...items, ""])
  }
  const removeItem = (indexToRemove: number) =>{
    setItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove))
  }

  const addFriend = () => {
    setFriends([...friends, ""])
  }
  const removeFriend = (indexToRemove: number) =>{
    setFriends((prevItems) => prevItems.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className='flex flex-col items-start justify-center px-[10%] w-screen py-16 space-y-16'>
        <div className='flex flex-row items-center justify-center space-x-8'>
            <h2 className='text-3xl text-primary font-bold'>Registrando</h2>
            <Image
            src={"/pen.png"}
            alt={"Pen Image"}
            width={32}
            height={32}
            />
        </div>

        <div className='flex flex-col items-start justify-between space-y-16'>
          <div className='flex flex-col items-start justify-center space-y-4 h-full'>
            <h3 className='text-2xl font-bold text-primary'>Cadastrar itens consumidos</h3>
            {items.map((item, index) => (
              <div key={index} className='flex flex-row items-end justify-center space-x-2'>
              <MyInput 
                name='Nome do item' 
                label='Nome do item' 
                value=''
                placeholder='Ex: Cerveja' 
              />
              <p className='font-bold text-primary'>X</p>
              <MyInput 
                name='Nome do item' 
                label='Quantidade' 
                value=''
                placeholder='Ex: 8' 
              />
              <p className='font-bold text-primary'>R$</p>
              <MyInput 
                name='Nome do item' 
                label='Valor unitário' 
                value=''
                placeholder='Ex: 10,00' 
              />
              <div onClick={() => removeItem(index)} className='flex items-center justify-center h-full pb-2'>
                {index == 0 ? null :  <FaRegTrashAlt className='text-red text-3xl cursor-pointer'/>}
              </div>
            </div>
            ))}
            <ButtonAdd onClick={addItem} text='Adicionar item'/>
          </div>

          <div className='flex flex-col items-start justify-center space-y-4'>
            <div className='flex flex-col items-start justify-center space-y-4'>
            <h3 className='text-2xl font-bold text-primary'>Cadastrar participantes</h3>
            {friends.map((friend, index) => (
              <div key={index} className="flex flex-row items-end justify-center space-x-2">
              <MyInput 
              name='Nome do item' 
              label='Nome do participante' 
              value=''
              placeholder='Ex: Rafael' 
              />

              <div onClick={() => removeFriend(index)} className='flex items-center justify-center h-full pb-2'>
                {index == 0 ? null :  <FaRegTrashAlt className='text-red text-3xl cursor-pointer'/>}
              </div>
              </div>
            ))}
            </div>
            <ButtonAdd onClick={addFriend} text='Adicionar participante'/>
          </div>
        </div>

        <ButtonPrimarySm text='Avançar'/>
    </div>
  )
}
