"use client";

import React from "react";
import Image from "next/image";
import { useBill } from "../context/BillContext";
import { FriendConsume, itemConsume } from "../types/bill";
import { AiOutlineShareAlt } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";

export default function Total() {
  const { friendConsume } = useBill();

  return (
    // <div className='flex flex-col items-center justify-center space-y-16 py-[5%] px-[10%]'>
    //   <div className='flex flex-row items-center justify-center space-x-8'>
    //     <h2 className='text-3xl text-primary font-bold'>Resumo da Conta</h2>
    //       <Image
    //         src='/coin.png'
    //         alt='Coin Image'
    //         width={48}
    //         height={48}
    //       />
    //   </div>
    //   <div className='flex flex-col items-start space-y-4'>
    //     {friendConsume.map((friend: FriendConsume) => (
    //       <div
    //         key={friend.friendName}
    //         className='p-4 border rounded-lg w-full bg-white shadow-sm'
    //       >
    //         <h2 className='text-xl font-semibold text-primary'>
    //           {friend.friendName}
    //         </h2>
    //         <ul className='list-disc ml-6 text-primary'>
    //           {friend.consume.map((item: itemConsume) => (
    //             <li key={item.itemName}>
    //               {item.itemName}: R$ {item.valueToPay.toFixed(2)}
    //             </li>
    //           ))}
    //         </ul>
    //         <p className='font-bold mt-2 text-rose-600'>
    //           Total: R$ {friend.total.toFixed(2)}
    //         </p>
    //       </div>
    //     ))}
    //   </div>
    //   <div
    //     className='flex items-center justify-center bg-green hover:bg-greenhover text-white p-4 rounded-lg cursor-pointer text-2xl font-bold space-x-4'
    //     onClick={() => alert('Função será implementada em breve! <3<3<3')}>
    //     <p>Compartilhar</p>
    //     <AiOutlineShareAlt />
    //   </div>
    // </div>
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-between space-y-16 my-[15vh] px-5">
        <div className="flex items-center justify-center flex-row gap-4 mb-4 md:mb-8">
          <h1 className="text-text-primary font-bold text-2xl">
            Resumo da Conta
          </h1>
          <Image
            src="/calculator.png"
            width={24}
            height={24}
            alt="Registrnado"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-8 h-full">
          <div className="flex flex-col md:flex-row items-stretch justify-center h-full md:max-w-[750px] flex-wrap">
            {friendConsume.map((friend: FriendConsume) => (
              <div
                key={friend.friendName}
                className="p-4 border rounded-lg w-full flex-1 bg-white shadow-sm m-2"
              >
                <h2 className="text-xl font-semibold text-text-primary">
                  {friend.friendName}
                </h2>
                <div className="flex flex-col justify-between items-start h-[100%]">
                  <ul className="list-disc ml-6 text-primary">
                    {friend.consume.map((item: itemConsume) => (
                      <li key={item.itemName}>
                        {item.itemName}: R$ {item.valueToPay.toFixed(2)}
                      </li>
                    ))}
                  </ul>

                  <p className="font-bold mb-8 text-rose-600">
                    Total: R$ {friend.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-center bg-green hover:bg-greenhover text-white p-4 rounded-lg cursor-pointer text-2xl font-bold space-x-4"
            onClick={() => alert("Função será implementada em breve! <3<3<3")}
          >
            <p>Compartilhar</p>
            <AiOutlineShareAlt />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 w-full">
          <Link href="/bill">
            <Button variant={"destructive"} size={"lg"}>
              Voltar
            </Button>
          </Link>
          <Button
            variant={"default"}
            size={"lg"}
            className="bg-green hover:bg-greenhover"
          >
            Início
          </Button>
        </div>
      </div>
    </div>
  );
}
