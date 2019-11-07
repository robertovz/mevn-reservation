const express = require("express");
const router = express.Router();
const Reservation = require("../../models/Reservation");

router.get("/", (req, res) => {
    Reservation.findAll()
    .then(reservation => {
        res.json(reservation)
    })
    .catch(err => {
        res.send("Error: w" + err)
    })
})

router.post("/reservation", (req, res) => {
    const today = new Date();
    const productData = {
        id : req.body.id,
        product_id : req.body.product_id,
        user_name : req.body.user_name,
        user_email : req.body.user_email,
        check_in : req.body.check_in,
        check_out : req.body.check_out,
        price : req.body.price,
        created_at : today
    }

    if(!req.body.name) {
        res.status(400)
        res.json({
            error: "Error"
        })
    } else {

        Reservation.create(productData)
        .then((product) => {
    
            res.send("Reservation added")
        })
        .catch(err => {
            res.send("Error: "+ err)
        })
    }
});

router.delete("/reservation/:id", (req, res) => {
    Reservation.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Reservation Deleted!")
    })
    .catch(err => {
        res.send("Error: " + err)
    })
})


router.get("/reservation/:id", (req, res) => {

    Reservation.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(products => {
            if (products) {
                res.json(products)
            } else {
                res.send('Reservation does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.put("/reservation/:id", (req, res) => {
    if(!req.body.name) {
        res.status(400)
        res.json({
            error: "Error"
        })
    } else {
        Reservation.update(
            { name: req.body.name },
            { where: { id: req.params.id } }
        )
        .then(() => {
            res.send("Reservation Updated!")
        })
        .catch(err => {
            res.send("Error: " + err)
        })
    }
})

module.exports = router