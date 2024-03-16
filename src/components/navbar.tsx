import Image from "next/image";
import MyIcon from "../app/images/icon.png";
import "../app/globals.css";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-blue-500 h-14 flex items-center justify-start">
      <Image
        src={MyIcon}
        alt="Um sprite meu em 8 bits"
        className="w-10 p-1 h-auto mx-2 bg-white rounded-full border-2 border-solid border-gray-200"
      />
      <Link href="/">
        <h3 className="mx-5 text-white hover:cursor-pointer hover:text-black">Início</h3>
      </Link>
      <a target="_blank" href="https://ruanemanuellportfolio.netlify.app/">
        <h3 className="mx-5 text-white hover:cursor-pointer hover:text-black">Portfólio</h3>
      </a>
    </nav>
  );
}
