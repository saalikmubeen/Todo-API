var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

var app = express();


var Todo = require("./models/todo");


mongoose.connect("mongodb://localhost/todo_api", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
    return res.sendFile("index.html");

})

// for todo apis 

app.get("/api/todo", function(req, res) {
    Todo.find({}, function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    })

})

app.post("/api/todo", function(req, res) {
    console.log(req.body)
    Todo.create(req.body, function(err, createdTodo) {
        if (err) {
            console.log(err);
        } else {
            res.json(createdTodo);
        }
    })
});


app.get("/api/todo/:id", function(req, res) {
    Todo.findById(req.params.id, function(err, foundTodo) {
        if (err) {
            console.log(err);
        } else {
            res.json(foundTodo);
        }
    })
});


app.put("/api/todo/:id", function(req, res) {
    Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, updatedTodo) {
        if (err) {
            console.log(err);
        } else {
            res.json(updatedTodo);
        }
    })
});

app.delete("/api/todo/:id", function(req, res) {
    Todo.findOneAndDelete({ _id: req.params.id }, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: "Todo deleted successfully!" });
        }
    })
});


app.listen(3000, function() {
    console.log("STARTING SERVER AT PORT 3000....!")
});