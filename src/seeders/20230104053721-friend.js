"use strict";

const { FRIEND_ACCEPTED } = require("../config/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        // 1, 2, 11, 15, 16, 17

        return queryInterface.bulkInsert("friends", [
            {
                status: FRIEND_ACCEPTED,
                created_at: new Date(),
                updated_at: new Date(),
                requester_id: 1,
                accepter_id: 2,
            },
            {
                status: FRIEND_ACCEPTED,
                created_at: new Date(),
                updated_at: new Date(),
                requester_id: 2,
                accepter_id: 11,
            },
            {
                status: FRIEND_ACCEPTED,
                created_at: new Date(),
                updated_at: new Date(),
                requester_id: 15,
                accepter_id: 2,
            },
            {
                status: FRIEND_ACCEPTED,
                created_at: new Date(),
                updated_at: new Date(),
                requester_id: 2,
                accepter_id: 16,
            },
            {
                status: FRIEND_ACCEPTED,
                created_at: new Date(),
                updated_at: new Date(),
                requester_id: 17,
                accepter_id: 2,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete("friends", null, {});
    },
};
