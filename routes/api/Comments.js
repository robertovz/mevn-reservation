const express = require("express");
const comment = express.Router();
const Comment = require("../../models/Comment");

comment.get("/", (req, res) => { 
    Comment.findAll()
        .then(comment => {
            res.json(comment)
        })
        .catch(err => {
            res.send("Error: w" + err)
        })
})

comment.post("/", (req, res) => {
    
    const today = new Date();
    const commentData = {
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        comment: req.body.comment,
        created: today
    }
    if (!req.body.post_id) {
        res.status(400)
        res.json({
            error: "Errorw"
        })
    } else {
        Comment.create(commentData)
            .then((comment) => {
                res.send("Comment added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

comment.delete("/:id", (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send("Comment Deleted!")
        })
        .catch(err => {
            res.send("Error: " + err)
        })
})

comment.get("/:id", (req, res) => {

    Comment.findAll({
        where: {
            post_id: req.params.id
        }
    })
        .then(comments => {
            if (comments) {
                res.json(comments)
            } else {
                res.send('Comments does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


comment.put("/:id", (req, res) => {
    if (!req.body.title) {
        res.status(400)
        res.json({
            error: "Error"
        })
    } else {
        Comment.update(
            {
                comment: req.body.comment,
            },
            { where: { id: req.body.id } }
        )
            .then(() => {
                res.send("Comment Updated!")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

module.exports = comment