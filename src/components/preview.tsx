import Link from "next/link";
import PostData from "../services/getposts";
import "../app/globals.css";

export default function Preview({ postData }: { postData: PostData[] }) {
  return (
    <div className="max-w-screen-md m-auto">
      <h2 className="my-5 text-blue-500 mx-5">Últimos posts</h2>
      {postData.map(post =>
        <Link href={`/post/${post.id}`}>
          <div key={post.id} className="mx-5 my-7">
            <div>
              <h1 className="text-blue-500 text-5xl font-bold">{post.title}</h1>
              <h2 className="my-3 text-blue-500">{post.date}</h2>
              <h3 className="my-2">{post.preview}</h3>
                <img src={post.image} className="w-full max-h-48 object-cover"></img>
              <h3 className="text-end text-blue-500 my-7">Ler mais</h3>
            </div>
          </div>
        </Link>)}
    </div>

  );
}