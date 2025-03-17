"use client";
import { useState } from "react";

const HamburgerMenu = () => {
  const [visible, setVisible] = useState<Boolean>(false);
  const toogleMenu = () => {
    setVisible(!visible);
  };

  return (
    <>
      <p className="font-bold text-xl text-bluehover cursor-pointer fixed top-10 left-8 md:hidden z-50">
        RaC
      </p>
      {visible ? (
        <div
          onClick={toogleMenu}
          className="fixed flex items-center justify-center w-screen h-screen bg-[#000000]/85 md:hidden z-40 backdrop-blur-[2px]"
        >
          <div className="flex flex-col items-center justify-center">
            <ul className="bg-light-secondary dark:bg-dark-secondary rounded-2xl py-2 md:hidden mb-12 z-50">
              <li className="px-16 py-4 text-[#FFFFFF] flex items-center justify-center">
                {" "}
                Home{" "}
              </li>
              <li
                className="px-16 py-4 text-[#FFFFFF] flex items-center justify-center"
                onClick={() => {
                  alert("Disponínel em breve! Estamos trabalhando nisso :)");
                }}
              >
                {" "}
                Login{" "}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          onClick={toogleMenu}
          className="md:hidden fixed top-8 right-8 text-bold z-50 text-2xl"
        >
          |||
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
