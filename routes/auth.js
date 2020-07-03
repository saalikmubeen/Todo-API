var express = require("express");
var passport = require("passport");
var router = express.Router();

var User = require("../models/user");

router.get("/", function(req, res) {
    return res.sendFile("index.html");
})

// displays form to register the user.
router.get("/register", function(req, res) {
    res.render("register");
})

// logic to register the user.
router.post("/register", function(req, res) {
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message)
            res.redirect("/register");
        } else {
            // now login the user.
            passport.authenticate("local")(req, res, function() {
                res.redirect("/")
            })
        }
    })
})

// displays form to login the user.
router.get("/login", function(req, res) {
    res.render("login");
})

// logic to login the user.
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: "Incorrect username or password!"
}), function(req, res) {})


// User Log Out
router.get("/logout", function(req, res) {
    req.logOut(); // this method is provided / coming from the passport.
    res.redirect("/");
})

module.exports = router;