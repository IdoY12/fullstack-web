import { NextFunction, Request, Response } from "express";
import sequelize from "../../db/sequelize";
import Post from "../../models/Post";
import User from "../../models/User";
import Comment from "../../models/Comment";
import postIncludes from "../common/post-includes";

export async function getFeed(req: Request, res: Response, next: NextFunction) {
    try {

        const { following } = await User.findByPk(req.userId, {
            include: {
                model: User,
                as: 'following',
                include: [{
                    model: Post,
                    ...postIncludes
                }]
            },
        })

        const feed = following
            .reduce((cumulative: Post[], { posts }) => {
                return [...posts, ...cumulative]
            }, [])
            .sort((a: Post, b: Post) => a.createdAt < b.createdAt ? 1 : -1)

        res.json(feed)

    } catch (e) {
        next(e)
    }
}