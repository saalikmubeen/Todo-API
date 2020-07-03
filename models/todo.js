var mongoose = require("mongoose");

var todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: "Name can't be empty"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Todo", todoSchema);