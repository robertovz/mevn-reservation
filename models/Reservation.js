const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    'reservation',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: Sequelize.INTEGER,
            required: true
        },
        user_name: {
            type: Sequelize.STRING,
            required: true
        },
        user_email: {
            type: Sequelize.STRING,
            required: true
        },
        check_in: {
            type: Sequelize.STRING,
            required: true
        },
        check_out: {
            type: Sequelize.STRING,
            required: true
        },
        price: {
            type: Sequelize.INTEGER,
            required: true
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)