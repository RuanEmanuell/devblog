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
}

export async function getPostData(fileName: string): Promise<PostData> {
    const postDirectory = path.join(process.cwd(), "src/pages/posts/1");
    const fullPath = path.join(postDirectory, `${fileName}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    const { title, date } = matterResult.data;

    return {
        id: fileName,
        contentHtml,
        title: title as string, 
        date: date as string, 
    };
}

export default PostData;
