// This is where the business logic for each route will go
const HttpError = require("../models/http-error");
const User = require("../models/user");

const createUser = async (req, res, next) => {
    
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError(
            "Creating user failed!",
            500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            "A user using this email already exists in our system. ",
            422
        );
        return next(error);
    }

    const createdUser = new User({
        email,
        password,
        tasks: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        error = new HttpError(
            err,
            500
        );
        return next(err);
    }

    res.json({ user: createdUser.toObject({getters: true})});
}

const createTask = async (req, res, next) => {
    const { uid, title, content } = req.body;

    //get user
    let user;
    try {
        user = await User.findById(uid);
    } catch (err) {
        const error = new HttpError(
            "There was an error finding the user",
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            "User doesn't exist!",
            500
        );
        return next(error);
    }

    user.tasks.push({
        title,
        content,
        date : Date.now(),
        checked: false
    });

    try {
        await user.save();
    } catch (err) {
        error = new HttpError(
            err,
            500
        );
        return next(err);
    }

    res.json({ user: user.tasks.map(t => t.toObject({getters: true}))});
}

exports.createUser = createUser;
exports.createTask = createTask;