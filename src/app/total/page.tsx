'use client';

import React from 'react';
import Image from 'next/image';
import { useBill } from '../context/BillContext';
import { FriendConsume, itemConsume } from '../types/bill';
import { AiOutlineShareAlt } from "react-icons/ai";

export default function Total() {
  
  const { friendConsume } = useBill();

  return (
    <div className='flex flex-col items-center justify-center space-y-16 py-[5%] px-[10%]'>
      <div className='flex flex-row items-center justify-center space-x-8'>
        <h2 className='text-3xl text-primary font-bold'>Resumo da Conta</h2>
          <Image
            src='/coin.png'
            alt='Coin Image'
            width={48}
            height={48}
          />
      </div>
      <div className='flex flex-col items-start space-y-4'>
        {friendConsume.map((friend: FriendConsume) => (
          <div
            key={friend.friendName}
            className='p-4 border rounded-lg w-full bg-gray-50 shadow-sm'
          >
            <h2 className='text-xl font-semibold text-primary'>
              {friend.friendName}
            </h2>
            <ul className='list-disc ml-6'>
              {friend.consume.map((item: itemConsume) => (
                <li key={item.itemName}>
                  {item.itemName}: R$ {item.valueToPay.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className='font-bold mt-2'>
              Total: R$ {friend.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <div
        className='flex items-center justify-center bg-green hover:bg-greenhover text-white p-4 rounded-lg cursor-pointer text-2xl font-bold space-x-4'
        onClick={() => alert('Função será implementada em breve! <3<3<3')}>
        <p>Compartilhar</p>
        <AiOutlineShareAlt />
      </div>
    </div>
  );
}