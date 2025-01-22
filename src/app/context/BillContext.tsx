'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { BillItem, Friend, FriendConsume, itemConsume } from '../types/bill';

const BillContext = createContext<any>(undefined);

export const BillProvider = ({ children }: { children: ReactNode }) => {

  const [items, setItems] = useState<BillItem[]>([{id: 1, name: '', quantity: 0, price: 0 }]);
  const [friends, setFriends] = useState<Friend[]>([{id: 1, name: '' }]);
  const [friendConsume, setFriendConsume] = useState<FriendConsume[]>([]);
 
  return (
    <BillContext.Provider value={{ items, setItems, friends, setFriends, friendConsume, setFriendConsume }}>
      {children}
    </BillContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useBill = () => {
  const context = useContext(BillContext);
  if (!context) {
    throw new Error('useBill deve ser usado dentro de um BillProvider');
  }
  return context;
};