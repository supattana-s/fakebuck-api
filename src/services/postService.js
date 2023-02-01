const { Post, User, Like, Comment } = require("../models");
const friendService = require("../services/friendService");

exports.findUserPosts = async (userId, include) => {
    let whereUserId = userId;

    if (include === "friend") {
        // SELECT * FROM posts WHERE user_id
        // IN (userId, friendIds, ...)
        const friendIds = await friendService.findUserFriendIdsByUserId(userId);
        whereUserId = [userId, ...friendIds];
    }

    const posts = await Post.findAll({
        where: {
            userId: whereUserId,
        },
        attributes: { exclude: "userId" },
        include: [
            { model: User, attributes: { exclude: "password" } },
            {
                model: Like,
                include: { model: User, attributes: { exclude: "password" } },
            },
            {
                model: Comment,
                attributes: { exclude: "userId" },
                include: { model: User, attributes: { exclude: "password" } },
            },
        ],
        order: [["updatedAt", "DESC"]],
    });

    return posts;
};
