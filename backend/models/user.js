// Define the schema for a user in our MongoDB user collection
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tasks: [{
        title: {
            type: String,
            require: false
        },
        content: {
            type: String,
            require: false
        },
        date: {
            type: Date,
            default: Date.now,
            require: false
        },
        checked: {
            type: Boolean,
            require: false
        }
    }]
})

module.exports = mongoose.model("User", userSchema);