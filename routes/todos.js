var express = require("express");
var router = express.Router();

var User = require("../models/user");
var Todo = require("../models/todo");


// get all todos of a particular user.
router.get("/api/todo", isLoggedIn, function(req, res) {
    User.findById(req.user._id).populate("todos").exec(function(err, user) {
        if (err) {
            console.log(err)
        } else {
            res.json(user.todos)
        }
    })

})

// create a new todo for a particular user.
router.post("/api/todo", isLoggedIn, function(req, res) {
    console.log(req.body)
    Todo.create(req.body, function(err, createdTodo) {
        if (err) {
            console.log(err);
        } else {
            User.findById(req.user._id, function(err, foundUser) {
                if (err) {
                    console.log(err)
                } else {
                    foundUser.todos.push(createdTodo)
                    foundUser.save();
                    res.json(createdTodo);
                }
            })
        }
    })
});


// get a particular todo.
router.get("/api/todo/:id", isLoggedIn, function(req, res) {
    Todo.findById(req.params.id, function(err, foundTodo) {
        if (err) {
            console.log(err);
        } else {
            res.json(foundTodo);
        }
    })
});


// update/edit a particular todo.
router.put("/api/todo/:id", isLoggedIn, function(req, res) {
    Todo.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true
    }, function(err, updatedTodo) {
        if (err) {
            console.log(err);
        } else {
            res.json(updatedTodo);
        }
    })
});

// delete/remove a particular todo.
router.delete("/api/todo/:id", isLoggedIn, function(req, res) {
    Todo.findOneAndDelete({
        _id: req.params.id
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                message: "Todo deleted successfully!"
            });
        }
    })
});

// middleware.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login")
    }
};

module.exports = router;