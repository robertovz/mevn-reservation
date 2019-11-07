const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../models/User");
users.use(cors());

process.env.SECRET_KEY = 'secret';

users.get("/", (req, res) => {
    User.findAll()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.send("Error: w" + err)
        })
})

users.post("/register", (req, res) => {
    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        type: req.body.type,
        password: req.body.password,
        created: today
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) throw err;
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                                expiresIn: 1440
                            })
                            res.send(token)
                            res.json({ status: user.email + ' registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.status(400).json({ error: 'User does not exist.' })
                }
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})


users.put("/:id", (req, res) => {
    if (!req.body.first_name) {
        res.status(400)
        res.json({
            error: "Error"
        })
    } else {
        User.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                type: req.body.type
            },
            { where: { id: req.params.id } }
        )
            .then(() => {
                res.send("User Updated!")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

users.get("/profile/:id", (req, res) => {

    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send("User Deleted!")
        })
        .catch(err => {
            res.send("Error: " + err)
        })
})
module.exports = users