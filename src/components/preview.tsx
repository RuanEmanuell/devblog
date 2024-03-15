import Link from "next/link";
import PostData from "../services/getposts";

export default function Preview({ postData }: { postData: PostData[] }) {
  return (
    <>
      {postData.map(post =>
        <Link href={`/post/${post.id}`}>
          <div key={post.id}>
            <h1>{post.title}</h1>
            <h1>{post.date}</h1>
            <h1>{post.preview}</h1>
            <img src={post.image}></img>
          </div>
        </Link>)}
    </>

  );
}