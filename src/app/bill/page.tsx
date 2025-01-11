'use client'

import { useEffect } from 'react';
import React, { useState } from 'react'
import Image from 'next/image'
import ButtonAdd from '../components/ButtonAdd'
import ButtonPrimarySm from '../components/ButtonPrimarySm'
import MyInput from '../components/MyInput'
import { FaRegTrashAlt } from "react-icons/fa";

export default function Bill() {

  
  interface ItemType {
    name: string;
    quantity: number;
    price: number;
  }
  
  const [items, setItems] = useState<ItemType[]>([{name: "", quantity: 0, price: 0}]);
  const [friends, setFriends] = useState<string[]>([""]);
  
  const addItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0 }])
  }
  const removeItem = (indexToRemove: number) =>{
    setItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove))
  }
  const updateItemField = (index: number, field: string, newValue: string) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [field]: newValue };
      return updatedItems;
    });
  };
  
  const addFriend = () => {
    setFriends([...friends, ""])
  }
  const removeFriend = (indexToRemove: number) =>{
    setFriends((prevItems) => prevItems.filter((_, index) => index !== indexToRemove))
  }
  const updateFriend = (index: number, newValue: string) => {
    setFriends((prevFriends) => {
      const updatedFriends = [...prevFriends];
      updatedFriends[index] = newValue;
      return updatedFriends;
    });
  };  

    // Função para garantir que a quantidade seja numérica
    const handleQuantityChange = (index: number, value: string) => {
      const numericValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
      updateItemField(index, 'quantity', numericValue ? parseInt(numericValue).toString() : '0');
    };
  
    const handlePriceChange = (index: number, value: string) => {
      // Remove caracteres não numéricos
      let numericValue = value.replace(/\D/g, '');
  
      // Converte para número com duas casas decimais
      if (numericValue) {
        let formattedValue = (parseInt(numericValue) / 100).toFixed(2); // Exemplo: '100' vira '1.00'
        updateItemField(index, 'price', formattedValue);
      } else {
        updateItemField(index, 'price', '0.00');
      }
    };
  
  
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
                name='ItemName' 
                label='Nome do item' 
                value={item.name}
                placeholder='Ex: Cerveja'
                onChange={(e) => updateItemField(index, 'name', e.target.value)}
              />
              <p className='font-bold text-primary'>X</p>
              <MyInput 
                name='Quantity' 
                label='Quantidade' 
                value={item.quantity.toString()}
                placeholder="Ex: 8"
                onChange={(e) => handleQuantityChange(index, e.target.value)}
              />
              <p className='font-bold text-primary'>R$</p>
              <MyInput 
                name='Price' 
                label='Valor unitário' 
                value={item.price.toString()}
                placeholder="Ex: 10,00"
                onChange={(e) => handlePriceChange(index, e.target.value)}
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
              name='FriendName' 
              label='Nome do participante' 
              value={friend}
              placeholder='Ex: Rafael' 
              onChange={(e) => {updateFriend(index, e.target.value)}}/>

              <div onClick={() => removeFriend(index)} className='flex items-center justify-center h-full pb-2'>
                {index == 0 ? null :  <FaRegTrashAlt className='text-red text-3xl cursor-pointer'/>}
              </div>
              </div>
            ))}
            </div>
            <ButtonAdd onClick={addFriend} text='Adicionar participante'/>
          </div>
        </div>
        <ButtonPrimarySm type='submit' text='Avançar'/>
    </div>
  )
}
