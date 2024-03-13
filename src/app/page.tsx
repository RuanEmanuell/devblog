"use client"

import Image from "next/image";
import MyIcon from "./images/icon.png";
import { useEffect } from "react";

function Home() {
  return (
    <div className="min-h-screen w-full">
      <nav className="bg-blue-500 h-14 flex items-center justify-start">
        <Image
          src={MyIcon}
          alt="Um sprite meu em 8 bits"
          className="w-10 p-1 h-auto mx-2 bg-white rounded-full border-2 border-solid border-gray-200"
        />
        <input 
        className="w-1/4 min-w-48 max-w-96 h-8 mx-2 border-2 border-solid border-gray-200" 
        placeholder="Pesquisar..."></input>
      </nav>
      <main className="flex justify-center bg-white">
        <div className="max-w-screen-2xl w-screen h-screen">
        </div>
      </main>
    </div>
  );
}

export default Home;