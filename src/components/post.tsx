import PostData from "../services/getposts";

function Post({ postData }: { postData: PostData }) {
    return (
        <div>
            <h1>{postData.title}</h1>
            <h1>{postData.date}</h1>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
        </div>

    );
}

export default Post;