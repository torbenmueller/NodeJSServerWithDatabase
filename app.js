const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://new-user:test123@cluster0.76fy5.mongodb.net/addressesDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const port = 3000;

const addressSchema = new mongoose.Schema ({
    name: String,
    phone: Number
  });
  
const Address = mongoose.model("Address", addressSchema);

// Get methods
app.get("/", (req, res) => {
    Address.find({}, function(err, addresses) {
        res.render("home", {addresses: addresses});
    });
});



// Post methods
app.post("/", function(req, res) {

    const address = new Address ({
        name: req.body.newName,
        phone: req.body.newNumber
    });

    address.save(function(err) {
        if (!err) {
            res.redirect("/");
        }
    });
    
});

app.post("/delete", function(req, res) {
    const addressId = req.body.addressId;

    Address.deleteOne({_id: addressId}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully deleted address.");
            res.redirect("/");
        }
    });

});

app.post("/add-address", function(req, res) {
    res.render("add-address");
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});