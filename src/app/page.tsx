"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import { BsGoogle } from "react-icons/bs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-row w-screen h-screen items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-16 w-min">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-6xl md:text-8xl text-blue font-nova">
              RACHANDO
            </h1>
            <h1 className="text-6xl md:text-8xl text-blue font-nova">
              A CONTA
            </h1>
            <p className="text-text-primary text-lg md:text-xl font-bold mt-4">
              Nunca mais saia no prejuízo! Divida a conta proporcionalmente ao
              consumo de cada amigo
            </p>
          </div>
          <div className="flex flex-col w-full">
            <Link href={"/bill"}>
              <Button
                className="bg-blue hover:bg-bluehover w-full text-lg"
                size={"lg"}
              >
                Registrar comanda!
              </Button>
            </Link>
            <div className="flex flex-row items-center justify-center gap-2 mt-2">
              <Button
                className="w-1/2 text-text-primary"
                variant={"outline"}
                onClick={() => {
                  alert("Disponínel em breve! Estamos trabalhando nisso :)");
                }}
              >
                Entrar com Google
                <BsGoogle />
              </Button>
              <Button
                className="w-1/2 text-text-primary"
                variant={"outline"}
                onClick={() => {
                  alert("Disponínel em breve! Estamos trabalhando nisso :)");
                }}
              >
                Baixar aplicativo
                <ArrowDownToLine />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-row w-full h-screen items-center justify-center">
        <Image
          src="/hero.jpg"
          alt="Rachando a Conta home"
          width={700}
          height={700}
          layout="intrinsic"
        />
      </div>
    </div>
  );
}
