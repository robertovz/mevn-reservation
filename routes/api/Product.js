const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");

router.get("/products", (req, res) => {
    Product.findAll()
    .then(product => {
        res.json(product)
    })
    .catch(err => {
        res.send("Error: w" + err)
    })
})

router.post("/product", (req, res) => {
    const today = new Date();
    const productData = {
        name : req.body.name,
        category : req.body.category,
        description : req.body.description,
        price : req.body.price,
        amount : req.body.amount,
        created_at : today
    }

    if(!req.body.name) {
        res.status(400)
        res.json({
            error: "Error"
        })
    } else {


        Product.create(productData)
        .then((product) => {
    
            res.send("Product added")
        })
        .catch(err => {
            res.send("Error: "+ err)
        })
    }
});

router.delete("/product/:id", (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Product Deleted!")
    })
    .catch(err => {
        res.send("Error: " + err)
    })
})


router.get("/product/:id", (req, res) => {

    Product.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(products => {
            if (products) {
                res.json(products)
            } else {
                res.send('Product does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.put("/product/:id", (req, res) => {
    if(!req.body.name) {
        res.status(400)
        res.json({
            error: "Error"
        })
    } else {
        Product.update(
            { name: req.body.name },
            { where: { id: req.params.id } }
        )
        .then(() => {
            res.send("Product Updated!")
        })
        .catch(err => {
            res.send("Error: " + err)
        })
    }
})

module.exports = router