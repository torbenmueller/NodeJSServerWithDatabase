const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const port = 3000;

const addresses = [];



// Get methods
app.get("/", (req, res) => {
    res.render("home", {addressList: addresses});
});

app.get("/add-address", (req, res) => {
    res.render("add-address");
});



// Post methods
app.post("/", function(req, res) {

    const name = req.body.newName;
    const phone = req.body.newNumber;
    const newEntry = {
        name: name,
        phone: phone
    };
    addresses.push(newEntry);
    res.redirect("/");
    
});

app.post("/delete", function(req, res) {
    const addressId = req.body.checkbox;
    console.log(addressId);
    res.redirect("/");
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});