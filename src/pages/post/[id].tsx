import NavBar from "@/components/navbar";
import PostData, { getPostData } from "../../services/getposts";
import { useRouter } from "next/router";

export default function Post({ postData }: { postData: PostData[] }) {
    const router = useRouter();
    const { id } = router.query;

    const post = postData.find(post => post.id === id as string);

    if (!post) {
        return <div>Carregando</div>;
    }

    return (
        <>
            <NavBar />
            <div>
                <h1>{post.title}</h1>
                <h1>{post.date}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
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