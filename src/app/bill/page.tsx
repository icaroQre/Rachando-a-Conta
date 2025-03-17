"use client";
import { Plus, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import ButtonAdd from "../components/ButtonAdd";
import ButtonPrimarySm from "../components/ButtonPrimarySm";
import MyInput from "../components/MyInput";
import { FaRegTrashAlt } from "react-icons/fa";
import { useBill } from "../context/BillContext";
import Link from "next/link";
import { BillItem, Friend } from "../types/bill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Bill() {
  const { items, setItems, friends, setFriends } = useBill();

  const addItem = () => {
    setItems([
      ...items,
      {
        id:
          items.length > 0
            ? (parseInt(items[items.length - 1].id) + 1).toString()
            : "1",
        name: "",
        quantity: 0,
        price: 0,
      },
    ]);
  };
  const removeItem = (idToRemove: string) => {
    setItems((prevItems: BillItem[]) =>
      prevItems.filter((item) => item.id !== idToRemove.toString())
    );
  };
  const updateItemField = (id: string, field: string, newValue: string) => {
    setItems((prevItems: BillItem[]) => {
      // Encontra o índice do item com o ID fornecido
      const index = prevItems.findIndex((item) => item.id === id.toString());
      if (index === -1) {
        return prevItems;
      }

      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [field]: newValue };
      return updatedItems;
    });
  };

  const handleQuantityChange = (id: string, value: string) => {
    const numericValue = value.replace(/\D/g, "");
    updateItemField(
      id,
      "quantity",
      numericValue ? parseInt(numericValue).toString() : "0"
    );
  };
  const handlePriceChange = (id: string, value: string) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue) {
      const formattedValue = (parseInt(numericValue) / 100).toFixed(2);
      updateItemField(id, "price", formattedValue);
    } else {
      updateItemField(id, "price", "0.00");
    }
  };

  const addFriend = () => {
    setFriends([
      ...friends,
      {
        id: friends.length > 0 ? friends[friends.length - 1].id + 1 : 1,
        name: "",
      },
    ]);
  };
  const removeFriend = (idToRemove: number) => {
    setFriends((prevFriends: Friend[]) =>
      prevFriends.filter((friend) => friend.id !== idToRemove)
    );
  };
  const updateFriend = (id: number, newValue: string) => {
    setFriends((prevFriends: Friend[]) => {
      return prevFriends.map((friend) =>
        friend.id === id ? { ...friend, name: newValue } : friend
      );
    });
  };

  const saveBill = (items: BillItem[], friends: Friend[]) => {
    setItems(items);
    setFriends(friends);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-start justify-between space-y-16 my-[15vh] px-5">
        <div className="flex items-center justify-center flex-row gap-4 mb-8">
          <h1 className="text-text-primary font-bold text-2xl">
            Registrando Comanda
          </h1>
          <Image src="/pen.png" width={24} height={24} alt="Registrnado" />
        </div>
        <div className="flex flex-col items-start justify-center space-y-4 h-full">
          {items.map((item: BillItem) => (
            <div
              key={item.id}
              className="flex flex-row items-end justify-center space-x-2"
            >
              <div className="flex flex-col gap-y-4 items-start justify-start">
                <Label
                  className="text-text-primary fon-thin"
                  htmlFor="friendName"
                >
                  Nome do item:
                </Label>
                <Input
                  id="ItemName"
                  value={item.name}
                  placeholder="Ex: Cerveja"
                  onChange={(e) => {
                    updateItemField(item.id, "name", e.target.value);
                  }}
                />
              </div>
              <p className="font-bold text-primary">X</p>
              <div className="flex flex-col gap-y-4 items-start justify-start">
                <Label
                  className="text-text-primary fon-thin"
                  htmlFor="Quantity"
                >
                  {" "}
                  Quantidade:{" "}
                </Label>
                <Input
                  id="Quantity"
                  value={item.quantity?.toString() || ""}
                  placeholder="Ex: 8"
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                />
              </div>
              <p className="font-bold text-primary">R$</p>

              <div className="flex flex-col gap-y-4 items-start justify-start">
                <Label className="text-text-primary fon-thin" htmlFor="Price">
                  {" "}
                  Valor unitário:{" "}
                </Label>
                <Input
                  id="Price"
                  value={item.price?.toString() || ""}
                  placeholder="Ex: 10,00"
                  onChange={(e) => handlePriceChange(item.id, e.target.value)}
                />
              </div>
              <div
                onClick={() => removeItem(item.id)}
                className="flex items-center justify-center h-full pb-2"
              >
                {parseInt(item.id) === 0 ? null : (
                  <Trash2 className="text-red cursor-pointer" size={28} />
                )}
              </div>
            </div>
          ))}
          <Button onClick={addItem} className="bg-blue hover:bg-bluehover">
            Adicionar Item
            <Plus />
          </Button>
        </div>
        <div className="flex flex-col items-start justify-center space-y-4">
          {friends.map((friend: Friend) => (
            <div
              key={friend.id}
              className="flex flex-row items-end justify-center space-x-2"
            >
              <div className="flex flex-col gap-y-4 items-start justify-start">
                <Label
                  className="text-text-primary fon-thin"
                  htmlFor="FriendName"
                >
                  {" "}
                  Nome do participante:{" "}
                </Label>
                <Input
                  id="FriendName"
                  value={friend.name}
                  placeholder="Ex: Rafael"
                  onChange={(e) => {
                    updateFriend(friend.id, e.target.value);
                  }}
                />
              </div>

              <div
                onClick={() => removeFriend(friend.id)}
                className="flex items-center justify-center h-full pb-2"
              >
                {friend.id == 0 ? null : (
                  <Trash2 className="text-red cursor-pointer" size={28} />
                )}
              </div>
            </div>
          ))}
          <Button onClick={addFriend} className="bg-blue hover:bg-bluehover">
            Adicionar Participante
            <Plus />
          </Button>
        </div>
        <div className="flex flex-row items-center gap-4 w-full">
          <Link href="/">
            <Button variant={"destructive"} size={"lg"}>
              Voltar
            </Button>
          </Link>
          <Link href="/consumation">
            <Button
              onClick={() => saveBill(items, friends)}
              variant={"default"}
              size={"lg"}
              className="bg-green hover:bg-greenhover"
            >
              Avançar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
