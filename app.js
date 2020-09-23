const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const port = 3000;

const addresses = [
    {
        id: 0,
        name: "Max Mustermann",
        phone: 1234567890
    }
];

let index = 1;

// Get methods
app.get("/", (req, res) => {
    res.render("home", {addressList: addresses});
});

app.get("/add-address", (req, res) => {
    res.render("add-address");
});



// Post methods
app.post("/", function(req, res) {

    const id = index;
    const name = req.body.newName;
    const phone = req.body.newNumber;

    const newEntry = {
        id: id,
        name: name,
        phone: phone
    };
    addresses.push(newEntry);
    index++;
    res.redirect("/");
    
});

app.post("/delete", function(req, res) {
    const addressId = req.body.addressId;

    for (let i = 0; i < addresses.length; i++) {
        let obj = addresses[i];
    
        if (addressId.indexOf(obj.id) !== -1) {
            addresses.splice(i, 1);
        }
    }

    res.redirect("/");
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});