const { Op } = require("sequelize");
const { Friend, User } = require("../models");
const {
    FRIEND_ACCEPTED,
    FRIEND_STATUS_ANNONYMOUS,
    FRIEND_STATUS_ME,
    FRIEND_STATUS_FRIEND,
    FRIEND_STATUS_REQUESTER,
    FRIEND_STATUS_ACCEPTER,
} = require("../config/constants");

const findUserFriendIdsByUserId = async (id) => {
    // Select * from friens WHERE status = 'ACCEPT' AND (requester_id = '2' OR accepter_id = '2')
    const friends = await Friend.findAll({
        where: {
            status: FRIEND_ACCEPTED,
            [Op.or]: [{ requesterId: id }, { accepterId: id }],
        },
    });

    const friendIds = friends.map((item) =>
        item.requesterId === id ? item.accepterId : item.requesterId
    );

    return friendIds;
};

exports.findUserFriendIdsByuserId = findUserFriendIdsByUserId;

exports.findUserFriendsByUserId = async (id) => {
    // SELECT * FROM friends WHERE status = 'ACCEPTED' AND (requester_id = '2' OR accepter_id = '2')
    const friendIds = await findUserFriendIdsByUserId(id);
    return User.findAll({
        where: { id: friendIds },
        attributes: { exclude: "password" },
    });
};

exports.findStatusWithMe = async (meId, userId) => {
    if (meId === userId) {
        return FRIEND_STATUS_ME;
    }
    // SELECT * FROM 'friends' WHERE
    // (requester_id = meId AND accepter_id) = userId OR
    // (accepter_id = meId AND requester_id) = userId

    const friend = await Friend.findOne({
        where: {
            [Op.or]: [
                { requesterId: meId, accepterId: userId },
                { requesterId: userId, accepterId: meId },
            ],
        },
    });

    if (!friend) {
        return FRIEND_STATUS_ANNONYMOUS;
    }

    if (friend.status === FRIEND_ACCEPTED) {
        return FRIEND_STATUS_FRIEND;
    }

    if (friend.requesterId === meId) {
        return FRIEND_STATUS_REQUESTER;
    }

    return FRIEND_STATUS_ACCEPTER;
};
