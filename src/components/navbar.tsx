"use client"

import Image from "next/image";
import MyIcon from "../app/images/icon.png";
import "../app/globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "Português" | "English";

export default function NavBar() {
  const [language, setLanguage] = useState<string>("English");

  const options: Record<Language, string[]> = {
    "English": ["Home", "Portfolio"],
    "Português": ["Início", "Portfólio"]
  }

  function changeLanguage() {
    setLanguage(prev => prev === "English" ? "Português" : "English");
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <nav className="bg-blue-500 h-14 flex items-center justify-start">
      <Image
        src={MyIcon}
        alt="Um sprite meu em 8 bits"
        className="w-10 p-1 h-auto mx-2 bg-white rounded-full border-2 border-solid border-gray-200"
      />
      <Link href="/">
        <h3 className="mx-5 text-white hover:cursor-pointer hover:text-black">{options[language as Language][0]}</h3>
      </Link>
      <a target="_blank" href="https://ruanemanuellportfolio.netlify.app/">
        <h3 className="mx-5 text-white hover:cursor-pointer hover:text-black">{options[language as Language][1]}</h3>
      </a>
      <section className="w-full flex justify-end">
        <button className="mx-5 text-white" onClick={changeLanguage}>🌐 {language}</button>
      </section>
    </nav>
  );
}
