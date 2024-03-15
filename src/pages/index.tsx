import PostData, { getPostData } from "@/services/getposts";
import Preview from "../components/preview";
import NavBar from "../components/navbar";
import "../app/globals.css";

export default function Home({postData} : {postData: PostData[]}) {
  return (
    <>
    <NavBar/>
      <main className="flex justify-center bg-white">
        <div className="max-w-screen-2xl w-screen h-screen">
          <Preview postData={postData}/>
        </div>
      </main>
      </>
  );
}

export async function getStaticProps(){
  const postData = await getPostData();
  return{
    props: {
      postData
    }
  }
}