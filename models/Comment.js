const Sequelize = require("sequelize");
const db = require("../database/db.js");

const Comment = db.sequelize.define(
    'comment',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: Sequelize.INTEGER,
            required: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            required: true
        },
        first_name: {
            type: Sequelize.STRING,
            required: true
        },
        last_name: {
            type: Sequelize.STRING,
            required: true
        },
        comment: {
            type: Sequelize.STRING,
            required: true
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)


Comment.associate = function(models) {
    Comment.belongsTo(models.Post, {
        foreignKey: 'commentId',
        onDelete: 'CASCADE'
    });
}

module.exports = Comment;