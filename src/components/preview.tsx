import Link from "next/link";
import PostData from "../services/getposts";
import "../app/globals.css";
import { useEffect, useState } from "react";


type Language = "Português" | "English";

export default function Preview({ postData }: { postData: PostData[] }) {
  const [currentLanguage, setCurrentLanguage] = useState<string>("English");

  const captions: Record<Language, string[]> = {
    "English": ["Latest posts", "Read more"],
    "Português": ["Últimos posts", "Ler mais"]
  }

  useEffect(() => {
    const storageLanguage = localStorage.getItem("language");

    if (storageLanguage) {
      setCurrentLanguage(storageLanguage);
    }

    function handleNavbarLanguageChange(event: CustomEventInit) {
      setCurrentLanguage(event.detail);
    }

    document.addEventListener('languageChange', handleNavbarLanguageChange)

    return () => {
      document.removeEventListener('languageChange', handleNavbarLanguageChange);
    }
  }, []);

  return (
    <div className="max-w-screen-md m-auto">
      <h2 className="my-5 text-blue-500 mx-5">{captions[currentLanguage as Language][0]}</h2>
      {postData.map(post =>
        <Link href={`/post/${post.id}`}>
          <div key={post.id} className="mx-5 my-7">
            <div>
              <h1 className="text-blue-500 text-5xl font-bold">{post.title}</h1>
              <h2 className="my-3 text-blue-500">{post.date}</h2>
              <h3 className="my-2">{post.preview}</h3>
              <img src={post.image} className="w-full max-h-48 object-cover"></img>
              <h3 className="text-end text-blue-500 my-7">{captions[currentLanguage as Language][1]}</h3>
            </div>
          </div>
        </Link>)}
    </div>

  );
}