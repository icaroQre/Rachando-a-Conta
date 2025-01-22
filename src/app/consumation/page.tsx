'use client';

import Image from 'next/image';
import { useBill } from '../context/BillContext';
import { BillItem, Friend, itemConsume, FriendConsume } from '../types/bill';
import { useRouter } from 'next/navigation';

export default function Consumation() {
  
  const router = useRouter();
  const { items, friends, setFriendConsume } = useBill();

  const expandedItems = items.flatMap((item: BillItem) =>
    Array.from({ length: item.quantity }, (_, index) => ({
      ...item,
      id: `${item.id}-${index + 1}`, // Novo ID único
      name: item.quantity > 1 ? `${item.name} ${index + 1}` : item.name, // Nome enumerado
    }))
  );

  const calculateItemConsume = (): Promise<itemConsume[]> => {
    return new Promise((resolve) => {
      const updatedConsumption: itemConsume[] = expandedItems.map((item: BillItem) => {
        const consumedBy: string[] = [];
        const checkboxes = document.querySelectorAll(`.checkbox-${item.id}`);

        checkboxes.forEach((checkbox: any, index) => {
          if (checkbox.checked) {
            consumedBy.push(friends[index].name);
          }
        });

        const perPersonValue =
          consumedBy.length > 0
            ? parseFloat((item.price / consumedBy.length).toFixed(2))
            : 0;

        return {
          itemName: item.name,
          itemPrice: item.price,
          consumedBy,
          valueToPay: perPersonValue,
        };
      });

      console.log('Items Calculados: ', updatedConsumption);
      resolve(updatedConsumption);
    });
  };

  const calculateFriendConsume = (updatedConsumption: itemConsume[]): Promise<void> => {
    return new Promise((resolve) => {
      const friendConsumptionMap: { [key: string]: FriendConsume } = {};

      updatedConsumption.forEach((item) => {
        item.consumedBy.forEach((friendName) => {
          if (!friendConsumptionMap[friendName]) {
            friendConsumptionMap[friendName] = {
              friendName,
              consume: [],
              total: 0,
            };
          }
          friendConsumptionMap[friendName].consume.push(item);
          friendConsumptionMap[friendName].total += item.valueToPay;
        });
      });

      const updatedFriendConsume = friends.map((friend: Friend) => {
        const friendData = friendConsumptionMap[friend.name] || {
          friendName: friend.name,
          consume: [],
          total: 0,
        };
        return {
          ...friendData,
        };
      });

      setFriendConsume(updatedFriendConsume);
      console.log('FriendConsume atualizado:', updatedFriendConsume);
      resolve();
    });
  };

  const handleNext = async () => {
    console.log('Iniciando cálculo...');
    const updatedConsumption = await calculateItemConsume();
    await calculateFriendConsume(updatedConsumption);
    router.push('/total');
  };

  return (
    <div className='flex flex-col items-start justify-start space-y-16 py-[5%] px-[10%] w-screen'>
      <div className='flex flex-row items-center justify-center space-x-8'>
        <h2 className='text-3xl text-primary font-bold'>Dividindo</h2>
        <Image
          src={'/calculator.png'}
          alt={'Calculator Image'}
          width={32}
          height={32}
        />
      </div>
      <div className='flex flex-col items-start justify-center space-y-8'>
        <h2 className='text-2xl font-bold text-primary'>Quem consumiu?</h2>
        {expandedItems.map((item: BillItem) => (
          <div
            key={item.id}
            className='flex flex-col items-start justify-center space-y-8'
          >
            <div className='flex items-center justify-center flex-row space-x-2 bg-primary text-lg text-white p-2 rounded-lg cursor-pointer'>
              <div className='font-bold'> {item.name} </div>
              <div className='font-light'> R${item.price} </div>
            </div>
            <div className='grid grid-cols-4 auto-rows-auto gap-8 items-start justify-start'>
              {friends.map((friend: Friend) => (
                <div
                  key={`${item.id}-${friend.id}`}
                  className='flex flex-row items-center justify-start space-x-2'
                >
                  <label
                    htmlFor={`checkbox-${item.id}-${friend.id}`}
                    className='font-bold text-primary text-base'
                  >
                    {friend.name}
                  </label>
                  <input
                    type='checkbox'
                    id={`checkbox-${item.id}-${friend.id}`}
                    className={`checkbox-${item.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          className='flex items-center justify-center bg-blue hover:bg-bluehover text-white p-4 rounded-lg cursor-pointer text-2xl font-bold'
          onClick={handleNext}>
          Avançar →
        </button>
      </div>
    </div>
  );
}
