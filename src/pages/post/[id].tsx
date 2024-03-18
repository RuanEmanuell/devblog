import NavBar from "@/components/navbar";
import PostData, { getPostData } from "../../services/getposts";
import { useRouter } from "next/router";
import "../../app/globals.css";
import "../../app/markdown.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import Loading from "@/components/loading";

type Language = "English" | "Português";
type Theme = "Dark" | "Light";

export default function Post() {
    const router = useRouter();
    const { id } = router.query;
    const [currentLanguage, setCurrentLanguage] = useState<Language>("English");
    const [currentTheme, setCurrentTheme] = useState<Theme>("Light");
    const [postData, setPostData] = useState<PostData[] | undefined>(undefined);

    const theme: Record<Theme, string[]> = {
        "Light": ["bg-white", "text-blue-500", "text-black"],
        "Dark": ["bg-gray-700", "text-white", "text-white"]
      }

    const captions: Record<Language, string[]> = {
        "English": ["Previous post", "Next post"],
        "Português": ["Post anterior", "Post seguinte"]
      };

    const post = postData?.find(post => post.id === id as string)
    const previousPost = postData?.find(post => parseInt(post.id) === parseInt(id as string) - 1);
    const nextPost = postData?.find(post => parseInt(post.id) === parseInt(id as string) + 1);

    const postIndex = id ? parseInt(id as string) : 0;

    const justifyPostButtons = (postIndex === 1 ? "justify-end" : postIndex === postData?.length ? "justify-start" : "justify-between");

    async function fetchData(language: Language) {
        const response = await fetch(`/api/returnposts?language=${language}`);
        const data = await response.json();
        if (data.length > 0) {
            setPostData(data);
        }
    }

    useEffect(() => {
        const storageLanguage = localStorage.getItem("language") as Language;
        const storageTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") as Theme : "Light";

        setCurrentLanguage(storageLanguage);
        setCurrentTheme(storageTheme);
        fetchData(storageLanguage);

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

          document.addEventListener('languageChange', handleNavbarLanguageChange);
          document.addEventListener('themeChange', handleNavbarThemeChange);
      
          return () => {
            document.removeEventListener('languageChange', handleNavbarLanguageChange);
            document.removeEventListener('themeChange', handleNavbarThemeChange);
          }
    }, []);

    return (
        <>
        <div className = {`${theme[currentTheme][0]}`}>
            <NavBar />
            <div className={`max-w-screen-md py-5 mx-auto ${theme[currentTheme][2]}`}>
            {!post ? <Loading></Loading> :
                <main className="mx-5">
                    <h1 className="text-5xl font-bold">{post.title}</h1>
                    <h2 className="my-3">{post.date}</h2>
                    <article dangerouslySetInnerHTML={{ __html: post.contentHtml }}></article>
                    <nav className={`flex ${justifyPostButtons} align-center py-10`}>
                        {postIndex > 1 ? <Link href={`/post/${postIndex - 1}`}>
                            <div className="border-2 border-black-100 rounded-sm py-2 px-4 hover:border-blue-200">
                            <p className={`${theme[currentTheme][1]} text-sm text-center m-auto`}>{captions[currentLanguage][0]}</p>
                                <h3 className="text-center text-xl">"{previousPost!.title}"</h3>
                            </div>
                        </Link> : <></>}
                        {postData && postIndex < postData.length ? <Link href={`/post/${postIndex + 1}`}>
                            <div className="border-2 border-black-100 rounded-sm py-2 px-4 hover:border-blue-200">
                                <p className={`${theme[currentTheme][1]} text-sm text-center m-auto`}>{captions[currentLanguage][1]}</p>
                                <h3 className="text-center text-xl m-auto">"{nextPost!.title}"</h3>
                            </div>
                        </Link> : <></>}
                    </nav>
                </main>
}
            </div>
        </div>
        </>
    );
}
