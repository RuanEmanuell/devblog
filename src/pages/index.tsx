import Link from "next/link";
import PostData, { getPostData } from "../services/getposts";
import "../app/globals.css";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import Loading from "@/components/loading";
import {Language, Theme, captions, colors} from "../services/utils";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("English");
  const [currentTheme, setCurrentTheme] = useState<Theme>("Light");
  const [postData, setPostData] = useState<PostData[] | undefined>(undefined);

  async function fetchData(language: Language) {
    const response = await fetch(`/api/returnposts?language=${language}`);
    const data = await response.json();
    if (data.length > 0) {
      setPostData(data);
    }
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

    function handleNavbarLanguageChange(event: CustomEventInit) {
      const storageLanguage = localStorage.getItem("language") ? localStorage.getItem("language") as Language : "English";
      setCurrentLanguage(storageLanguage);
      setPostData(undefined);
      fetchData(storageLanguage);
  }

    function handleNavbarThemeChange(event: CustomEventInit) {
      const storageTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") as Theme : "Light";
      setCurrentTheme(storageTheme);
    }

    fetchData(storageLanguage);

    document.addEventListener('languageChange', handleNavbarLanguageChange);
    document.addEventListener('themeChange', handleNavbarThemeChange);

    return () => {
      document.removeEventListener('languageChange', handleNavbarLanguageChange);
      document.removeEventListener('themeChange', handleNavbarThemeChange);
    }
  }, []);

  return (
    <>
      <NavBar />
      <main className={`flex justify-center ${colors[currentTheme][1]}`}>
        {!postData ? <Loading></Loading> :
          <div className="max-w-screen-md m-auto">
            <h2 className={`my-5 ${colors[currentTheme][3]} mx-5`}>{captions[currentLanguage][4]}</h2>
            {postData.map(post =>
              <Link key={post.id} href={`/post/${post.id}?language=${currentLanguage}`}>
                <div className="mx-5 my-7">
                  <div>
                    <h1 className={`${colors[currentTheme][3]} text-5xl font-bold`}>{post.title}</h1>
                    <h2 className={`my-3 ${colors[currentTheme][3]}`}>{post.date}</h2>
                    <h3 className={`my-2 ${colors[currentTheme][2]}`}>{post.preview}</h3>
                    <img src={post.image} className="w-full max-h-48 object-cover" alt={post.title}></img>
                    <h3 className={`text-end ${colors[currentTheme][3]} my-7`}>{captions[currentLanguage][5]}</h3>
                  </div>
                </div>
              </Link>
            )}
          </div>
        }
      </main>
    </>
  );
}
