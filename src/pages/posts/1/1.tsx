import { getPostData } from "@/pages/utils/getposts";
import PostData from "@/pages/utils/getposts";

function Post1({ postData }: { postData: PostData }) {
  return (
    <div>
      <h1>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} className="bg-black text-white"></div>
    </div>

  );
}

export default Post1;