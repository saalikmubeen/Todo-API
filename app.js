var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession = require("express-session"),
    flash = require("connect-flash");


var port = process.env.PORT || 3000;

// importing and using the User and Todo model.
var User = require("./models/user");
var Todo = require("./models/todo");

// connecting to database.
mongoose.connect("mongodb://localhost/todo_api_user", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

s
var app = express();


// PASSPORT SETUP.
app.use(expressSession({
    // secret can be anything we want.
    secret: "Everyone should learn to code. It teaches you how to think.",
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));

app.use(passport.initialize());
app.use(passport.session());

passport.deserializeUser(User.deserializeUser());
passport.serializeUser(User.serializeUser());


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
    res.locals.error = req.flash("error");
    next();
})


// ROUTES
var todoRoutes = require("./routes/todos");
var authRoutes = require("./routes/auth");

app.use(todoRoutes);
app.use(authRoutes);




app.listen(port, function() {
    console.log(`STARTING SERVER AT PORT ${port}....!`)
});