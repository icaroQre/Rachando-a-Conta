"use client";

import Image from "next/image";
import { useBill } from "../context/BillContext";
import { BillItem, Friend, itemConsume, FriendConsume } from "../types/bill";
import { useRouter } from "next/navigation";
import Link from "next/dist/client/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      const updatedConsumption: itemConsume[] = expandedItems.map(
        (item: BillItem) => {
          const consumedBy: string[] = [];
          const checkboxes = document.querySelectorAll(`.checkbox-${item.id}`);

          checkboxes.forEach((checkbox, index) => {
            if ((checkbox as HTMLInputElement).checked) {
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
        }
      );

      console.log("Items Calculados: ", updatedConsumption);
      resolve(updatedConsumption);
    });
  };

  const calculateFriendConsume = (
    updatedConsumption: itemConsume[]
  ): Promise<void> => {
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
      console.log("FriendConsume atualizado:", updatedFriendConsume);
      resolve();
    });
  };

  const handleNext = async () => {
    console.log("Iniciando cálculo...");
    const updatedConsumption = await calculateItemConsume();
    await calculateFriendConsume(updatedConsumption);
    router.push("/total");
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-start justify-between space-y-16 my-[15vh] px-5">
        <div className="flex items-center justify-center flex-row gap-4 mb-4 md:mb-8">
          <h1 className="text-text-primary font-bold text-2xl">
            Quam Consumiu?
          </h1>
          <Image
            src="/calculator.png"
            width={24}
            height={24}
            alt="Registrnado"
          />
        </div>
        <div className="flex flex-col items-start justify-center space-y-8 h-full">
          {expandedItems.map((item: BillItem) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-start justify-center gap-8"
            >
              <Badge>
                <p className="mr-4 text-lg cursor-pointer">{item.name}</p>
                <p className="font-light text-lg cursor-pointer">
                  R$: {item.price}
                </p>
              </Badge>
              <div className="grid grid-cols-4 auto-rows-auto gap-8 items-start justify-start">
                {friends.map((friend: Friend) => (
                  <div
                    key={`${item.id}-${friend.id}`}
                    className="flex flex-row items-center justify-start space-x-2"
                  >
                    <label
                      htmlFor={`checkbox-${item.id}-${friend.id}`}
                      className="text-text-primary font-medium text-base"
                    >
                      {friend.name}
                    </label>
                    <input
                      type="checkbox"
                      id={`checkbox-${item.id}-${friend.id}`}
                      className={`checkbox-${item.id} cursor-pointer`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center gap-4 w-full">
          <Link href="/bill">
            <Button variant={"destructive"} size={"lg"}>
              Voltar
            </Button>
          </Link>
          <Button
            onClick={handleNext}
            variant={"default"}
            size={"lg"}
            className="bg-green hover:bg-greenhover"
          >
            Avançar
          </Button>
        </div>
      </div>
    </div>
  );
}
