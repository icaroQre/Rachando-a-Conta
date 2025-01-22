'use client'

import Image from 'next/image'
import ButtonAdd from '../components/ButtonAdd'
import ButtonPrimarySm from '../components/ButtonPrimarySm'
import MyInput from '../components/MyInput'
import { FaRegTrashAlt } from "react-icons/fa";
import { useBill } from '../context/BillContext'
import Link from 'next/link'
import { BillItem, Friend } from '../types/bill'

export default function Bill() {

  const {items, setItems, friends, setFriends} = useBill();
  
  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length > 0 ? (parseInt(items[items.length - 1].id) + 1).toString() : '1',
        name: "",
        quantity: 0,
        price: 0
      }
    ]);
  }
  const removeItem = (idToRemove: string) =>{
    setItems((prevItems: BillItem[]) => prevItems.filter((item) => item.id !== idToRemove.toString()))
  }
  const updateItemField = (id: string, field: string, newValue: string) => {
    setItems((prevItems: BillItem[]) => {
      // Encontra o índice do item com o ID fornecido
      const index = prevItems.findIndex(item => item.id === id.toString());
      if (index === -1) {
        return prevItems;
      }

      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [field]: newValue };
      return updatedItems;
    });
  };

  const handleQuantityChange = (id: string, value: string) => {
    const numericValue = value.replace(/\D/g, '');
    updateItemField(id, 'quantity', numericValue ? parseInt(numericValue).toString() : '0');
  };
  const handlePriceChange = (id: string, value: string) => {
    const numericValue = value.replace(/\D/g, '');

    if (numericValue) {
      const formattedValue = (parseInt(numericValue) / 100).toFixed(2);
      updateItemField(id, 'price', formattedValue);
    } else {
      updateItemField(id, 'price', '0.00');
    }
  };
    
  const addFriend = () => {
    setFriends([
      ...friends,
      { id: friends.length > 0 ? friends[friends.length - 1].id + 1 : 1, name: "" }
    ]);
  }
  const removeFriend = (idToRemove: number) => {
    setFriends((prevFriends: Friend[]) =>
      prevFriends.filter((friend) => friend.id !== idToRemove)
    );
  };
  const updateFriend = (id: number, newValue: string) => {
    setFriends((prevFriends: Friend[]) => {
      return prevFriends.map(friend =>
        friend.id === id ? { ...friend, name: newValue } : friend
      );
    });
  };

  const saveBill = (items: BillItem[], friends: Friend[]) => {
    setItems(items)
    setFriends(friends)
  }
    
  return (
    <div className='flex flex-col items-start justify-center px-[10%] w-screen py-[5%] space-y-16'>
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
            {items.map((item: BillItem) => (
              <div key={item.id} className='flex flex-row items-end justify-center space-x-2'>
              <MyInput 
                name='ItemName' 
                label='Nome do item' 
                value={item.name}
                placeholder='Ex: Cerveja'
                onChange={(e) => updateItemField(item.id, 'name', e.target.value)}
              />
              <p className='font-bold text-primary'>X</p>
              <MyInput 
                name='Quantity' 
                label='Quantidade' 
                value={item.quantity?.toString() || ''}
                placeholder="Ex: 8"
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />
              <p className='font-bold text-primary'>R$</p>
              <MyInput 
                name='Price' 
                label='Valor unitário' 
                value={item.price?.toString() || ''}
                placeholder="Ex: 10,00"
                onChange={(e) => handlePriceChange(item.id, e.target.value)}
              />
              <div onClick={() => removeItem(item.id)} className='flex items-center justify-center h-full pb-2'>
                {parseInt(item.id) === 0 ? null :  <FaRegTrashAlt className='text-red text-3xl cursor-pointer'/>}
              </div>
            </div>
            ))}
            <ButtonAdd onClick={addItem} text='Adicionar item'/>
          </div>
          <div className='flex flex-col items-start justify-center space-y-4'>
            <div className='flex flex-col items-start justify-center space-y-4'>
            <h3 className='text-2xl font-bold text-primary'>Cadastrar participantes</h3>
            {friends.map((friend: Friend) => (
              <div key={friend.id} className="flex flex-row items-end justify-center space-x-2">
              <MyInput 
              name='FriendName' 
              label='Nome do participante' 
              value={friend.name}
              placeholder='Ex: Rafael' 
              onChange={(e) => {updateFriend(friend.id, e.target.value)}}/>

              <div onClick={() => removeFriend(friend.id)} className='flex items-center justify-center h-full pb-2'>
                {friend.id == 0 ? null :  <FaRegTrashAlt className='text-red text-3xl cursor-pointer'/>}
              </div>
              </div>
            ))}
            </div>
            <ButtonAdd onClick={addFriend} text='Adicionar participante'/>
          </div>
        </div>
        <Link href='/consumation'>
          <ButtonPrimarySm onClick={() => saveBill(items, friends)} type='submit' text='Avançar'/>
        </Link>
    </div>
  )
}
