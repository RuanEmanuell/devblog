import Link from "next/link";
import PostData, { getPostData } from "../services/getposts";
import "../app/globals.css";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import Loading from "@/components/loading";

type Language = "Português" | "English";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("English");
  const [postData, setPostData] = useState<PostData[] | undefined>(undefined);

  const captions: Record<Language, string[]> = {
    "English": ["Latest posts", "Read more"],
    "Português": ["Últimos posts", "Ler mais"]
  };

  async function fetchData(language: Language) {
    const response = await fetch(`/api/returnposts?language=${language}`);
    const data = await response.json();
    if (data.length > 0) {
      setPostData(data);
    }
  }

  useEffect(() => {
    const storageLanguage = localStorage.getItem("language") ? localStorage.getItem("language") as Language : "English";

    if (storageLanguage) {
      setCurrentLanguage(storageLanguage);
    }

    function handleNavbarLanguageChange(event: CustomEventInit) {
      const storageLanguage = localStorage.getItem("language") ? localStorage.getItem("language") as Language : "English";
      setPostData(undefined);
      fetchData(storageLanguage);
    }

    fetchData(storageLanguage);

    document.addEventListener('languageChange', handleNavbarLanguageChange)

    return () => {
      document.removeEventListener('languageChange', handleNavbarLanguageChange);
    }
  }, []);

  return (
    <>
      <NavBar />
      <main className="flex justify-center bg-white">
        {!postData ? <Loading></Loading> :
          <div className="max-w-screen-md m-auto">
            <h2 className="my-5 text-blue-500 mx-5">{captions[currentLanguage][0]}</h2>
            {postData.map(post =>
              <Link key={post.id} href={`/post/${post.id}?language=${currentLanguage}`}>
                <div className="mx-5 my-7">
                  <div>
                    <h1 className="text-blue-500 text-5xl font-bold">{post.title}</h1>
                    <h2 className="my-3 text-blue-500">{post.date}</h2>
                    <h3 className="my-2">{post.preview}</h3>
                    <img src={post.image} className="w-full max-h-48 object-cover" alt={post.title}></img>
                    <h3 className="text-end text-blue-500 my-7">{captions[currentLanguage][1]}</h3>
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
