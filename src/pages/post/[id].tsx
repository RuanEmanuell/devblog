import NavBar from "@/components/navbar";
import PostData, { getPostData } from "../../services/getposts";
import { useRouter } from "next/router";
import "../../app/markdown.css";
import Link from "next/link";

export default function Post({ postData }: { postData: PostData[] }) {
    const router = useRouter();
    const { id } = router.query;

    const post = postData.find(post => post.id === id as string);
    const previousPost = postData.find(post => parseInt(post.id) === parseInt(id as string) - 1);
    const nextPost = postData.find(post => parseInt(post.id) === parseInt(id as string) + 1);

    const postIndex = id ? parseInt(id as string) : 0;

    const justifyPostButtons = (postIndex === 1 ? "justify-end" : postIndex === postData.length ? "justify-start" : "justify-between");

    if (!post) {
        return <div>Carregando</div>;
    }

    return (
        <>
            <NavBar />
            <div className="max-w-screen-md my-5 mx-auto">
                <main className="mx-5">
                    <h1 className="text-5xl font-bold">{post.title}</h1>
                    <h2 className="my-3">{post.date}</h2>
                    <article dangerouslySetInnerHTML={{ __html: post.contentHtml }}></article>
                    <nav className={`flex ${justifyPostButtons} align-center my-10`}>
                        {postIndex > 1 ? <Link href={`/post/${postIndex - 1}`}>
                            <div className="border-2 border-black-100 rounded-sm py-2 px-4 hover:border-blue-200">
                                <p className="text-blue-500 text-sm text-center">Post anterior</p>
                                <h3 className="text-center text-xl">"{previousPost!.title}"</h3>
                            </div>
                        </Link> : <></>}
                        {postIndex < postData.length ? <Link href={`/post/${postIndex + 1}`}>
                            <div className="border-2 border-black-100 rounded-sm py-2 px-4 hover:border-blue-200">
                                <p className="text-blue-500 text-sm text-center m-auto">Post seguinte</p>
                                <h3 className="text-center text-xl m-auto">"{nextPost!.title}"</h3>
                            </div>
                        </Link> : <></>}
                    </nav>
                </main>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const postData = await getPostData();
    const paths = postData.map(post => ({
        params: { id: String(post.id) },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps() {
    const postData = await getPostData();
    return {
        props: {
            postData
        }
    }
}