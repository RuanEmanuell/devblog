import { Request, Response } from "express";
import { getPostData } from "../../services/getposts";

type Language = "Português" | "English"

export default async function handler(req: Request, res: Response) {
    try {
        const {language} = req.query;
        const postData = await getPostData(language as Language);
        res.status(200).json(postData); 
    } catch (error) {
        res.status(500).json({ error : error }); 
    }
}
