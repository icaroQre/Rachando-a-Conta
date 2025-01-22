import Image from "next/image";
import Link from 'next/link'
import ButtonPrimarySm from "./components/ButtonPrimarySm";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center mb-40">
        <Image
        src={"/note.png"}
        width={200}
        height={200}
        alt="Note Image"
        />
        <div className="flex flex-col items-center justify-center mt-8">
          <h1 className="text-4xl text-primary font-bold">Rachando</h1>
          <h1 className="text-4xl text-primary font-bold">a</h1>
          <h1 className="text-4xl text-primary font-bold">Conta</h1>
        </div>
      </div>
      <Link href={"/bill"}>
        <ButtonPrimarySm text="Registrar Comanda" type={"button"} />
      </Link>
    </div>
  );
}
