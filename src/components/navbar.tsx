import Image from "next/image";
import MyIcon from "../app/images/icon.png";
import "../app/globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Language = "Português" | "English";

export default function NavBar() {
  const [currentLanguage, setCurrentLanguage] = useState<string>("English");
  
  const options: Record<Language, string[]> = {
    "English": ["Home", "Portfolio"],
    "Português": ["Início", "Portfólio"]
  }

  const router = useRouter();

  function changeLanguage() {
    const newLanguage = currentLanguage === "English" ? "Português" : "English";
    setCurrentLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.dispatchEvent(new CustomEvent('languageChange', {detail: newLanguage}));
  }

  useEffect(() => {
    const storageLanguage = localStorage.getItem("language");
    if (storageLanguage) {
      setCurrentLanguage(storageLanguage);
    }
  }, []);

  return (
    <nav className="bg-blue-500 h-14 flex items-center justify-start">
      <Image
        src={MyIcon}
        alt="Um sprite meu em 8 bits"
        className="w-10 p-1 h-auto mx-2 bg-white rounded-full border-2 border-solid border-gray-200"
      />
      <Link href="/">
        <h3 className="mx-5 text-white hover:cursor-pointer hover:text-black">{options[currentLanguage as Language][0]}</h3>
      </Link>
      <a target="_blank" href="https://ruanemanuellportfolio.netlify.app/">
        <h3 className="mx-5 text-white hover:cursor-pointer hover:text-black">{options[currentLanguage as Language][1]}</h3>
      </a>
      <section className="w-full flex justify-end">
        <button className="mx-5 text-white" onClick={changeLanguage}>🌐{currentLanguage}</button>
      </section>
    </nav>
  );
}
