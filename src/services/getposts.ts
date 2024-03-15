import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

interface PostData {
    id: string;
    contentHtml: string;
    title: string;
    date: string;
    preview: string;
    image: string;
}

export async function getPostData(): Promise<PostData[]> {
    const postDirectory = path.join(process.cwd(), "src/posts/");
    const allPostsName = fs.readdirSync(postDirectory);
    const allPosts = allPostsName.map(async name => {
        const fullPath = path.join(postDirectory, `${name}`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
    
        const matterResult = matter(fileContents);
    
        const processedContent = await remark().use(html).process(matterResult.content);
        const contentHtml = processedContent.toString();
    
        const { title, date, preview, image } = matterResult.data;
    
        return {
            id: name,
            contentHtml,
            title: title as string, 
            date: date as string, 
            preview: preview as string,
            image: image as string
        };
    })

    return await Promise.all(allPosts);
}

export default PostData;
