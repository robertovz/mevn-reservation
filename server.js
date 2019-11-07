var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))


var Users = require("./routes/api/Users");
var Comments = require("./routes/api/Comments");
var Products = require("./routes/api/Product");
var Categories = require("./routes/api/Categories");
var Reservations = require("./routes/api/Reservations");

app.use("/users", Users);
app.use("/userscomment", Comments);
app.use("/api", Products);
app.use("/categories", Categories);
app.use("/reservations", Reservations);

app.listen(port, () => {
    console.log("Server is running on port: " + port);
})