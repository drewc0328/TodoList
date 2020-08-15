// Define the schema for a user in our MongoDB user collection
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    tasks: [{
        title: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            default: Date.now,
            required: false
        },
        checked: {
            type: Boolean,
            required: false
        }
    }]
})

module.exports = mongoose.model("User", userSchema);