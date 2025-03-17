"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <div className="border border-b-2-gray-500 fixed z-50 top-0 left-0 hidden md:w-screen md:bg-inherit md:flex md:items-center md:justify-between md:py-4 md:px-16 md:bg-light-primary md:dark:bg-dark-primary">
      <p className="font-bold text-xl text-bluehover cursor-pointer">
        <Link href="/">Home</Link>
      </p>
      <ul className="flex items-center justify-center">
        <li className="pl-8">
          <Button
            className="bg-blue hover:bg-bluehover w-full text-sm"
            size={"lg"}
            onClick={() => {
              alert("Disponínel em breve! Estamos trabalhando nisso :)");
            }}
          >
            {" "}
            Login{" "}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
