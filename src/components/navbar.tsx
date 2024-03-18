import Image from "next/image";
import MyIcon from "../app/images/icon.png";
import MenuIcon from "../app/images/menu.png";
import "../app/globals.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Language = "Português" | "English";
type Theme = "Dark" | "Light";

export default function NavBar() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("English");
  const [currentTheme, setCurrentTheme] = useState<Theme>("Light");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const options: Record<Language, string[]> = {
    "English": ["Home", "Portfolio"],
    "Português": ["Início", "Portfólio"]
  }

  const theme: Record<Theme, string[]> = {
    "Light": ["bg-blue-500", "text-black"],
    "Dark": ["bg-black", "text-white"]
  }

  function changeLanguage() {
    const newLanguage = currentLanguage === "English" ? "Português" : "English";
    setCurrentLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.dispatchEvent(new Event("languageChange"));
  }

  function changeTheme() {
    const newTheme = currentTheme === "Light" ? "Dark" : "Light";
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.dispatchEvent(new Event("themeChange"));
  }

  function openLateralMenu() {
    dialogRef.current?.showModal();
  }

  function closeLateralMenu() {
    dialogRef.current?.close();
  }

  function pickOption(option: string) {
    if (option === "theme") {
      changeTheme();
    } else if (option === "language") {
      changeLanguage();
    }

    closeLateralMenu();
  }


  useEffect(() => {
    const storageLanguage = localStorage.getItem("language") ? localStorage.getItem("language") as Language : "English";
    const storageTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") as Theme : "Light";

    if (storageLanguage) {
      setCurrentLanguage(storageLanguage);
    }

    if (storageTheme) {
      setCurrentTheme(storageTheme);
    }
  }, []);

  return (
    <nav className={`${theme[currentTheme][0]} h-14 flex items-center justify-start`}>
      <Image
        src={MyIcon}
        alt="Um sprite meu em 8 bits"
        className="w-10 p-1 h-auto mx-2 bg-white rounded-full border-2 border-solid border-gray-200"
      />
      <Link href="/">
        <h3 className={`mx-5 text-white hover:cursor-pointer hover:${theme[currentTheme][1]}`}>{options[currentLanguage][0]}</h3>
      </Link>
      <a target="_blank" href="https://ruanemanuellportfolio.netlify.app/">
        <h3 className={`mx-5 text-white hover:cursor-pointer hover:${theme[currentTheme][1]}`}>{options[currentLanguage][1]}</h3>
      </a>
      <section className="w-full flex justify-end navOptions">
        <Image
          src={MenuIcon}
          alt="Abrir menu lateral no mobile"
          className="hamburguerMenu"
          onClick={openLateralMenu}
        />
        <button className="mx-5 text-white" onClick={changeLanguage}>🌐 {currentLanguage}</button>
        <button className="mx-5 text-white" onClick={changeTheme}>👁️‍🗨️ {currentTheme}</button>
      </section>
      <dialog ref={dialogRef} className={`${theme[currentTheme][0]}`}>
        <section className={`lateralMenuOptions ${theme[currentTheme][0]}`}>
          <button className="mx-5 text-white" onClick={() => pickOption("language")}>🌐 {currentLanguage}</button>
          <button className="mx-5 text-white" onClick={() => pickOption("theme")}>👁️‍🗨️ {currentTheme}</button>
        </section>
      </dialog>
    </nav>
  );
}
