// This is where the business logic for each route will go
const HttpError = require("../models/http-error");
const User = require("../models/user");

const { validationResult } = require("express-validator");

const createUser = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
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

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError("Invalid inputs passed, please check your data", 422)
        );
    }
    const { email, password } = req.body;

    let user;
    try {
        user = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError(
            "There was an error finding the user.",
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            "The user with the email given doesn't exist.",
            500
        );
        return next(error);
    }

    if (user.password !== password) {
        const error = new HttpError(
            "The password for the given email is incorrect.",
            500
        );
        return next(error);
    } else {
        res.json({user: user})
    }
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

    res.json({ user: user.tasks.toObject({getters: true})});
}

const deleteUser = async (req, res, next) => {
    const { uid } = req.body;
    let user;
    try {
        user = await User.findByIdAndDelete(uid);
    } catch (err) {
        const error = new HttpError(
            err,
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            "The user does not exist.",
            500
        );
        return next(error);
    }

    res.json("User Deleted!");


}

const deleteTask = async (req, res, next) => {
    const { uid, tid } = req.body;
    
    let user;
    try {
        user = await User.findById(uid);
    } catch (err) {
        const error = new HttpError(
            err,
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            "The user does not exist.",
            500
        );
        return next(error);
    }

    let task;

    try {
        task = user.tasks.map(t => {
            if (t._id == tid) {
                return t;
            }
        });
    } catch (err) {
        const error = new HttpError(
            err,
            500
        );
        return next(error);
    }

    let taskID = task[0]._id;
    console.log("TASK: ", task[0]._id)

    if (!task) {
        const error = new HttpError(
            "The task does not exist.",
            500
        );
        return next(error);
    }

    let taskIndex = user.tasks.findIndex(
        (task) => task._id == taskID
    );

    try {
        user.tasks.splice(taskIndex, taskIndex + 1);
    } catch (err) {
        const error = new HttpError(
            err,
            500
        );
        return next(error);
    }

    user.save();

    res.json({tasks: user.tasks})
    
}

const getUser = async (req, res, next) => {
    const id  = req.params.id;

    let user;
    try {
        user = await User.findById(id)
    } catch (err) {
        const error = new HttpError(
            err,
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            "User doesn't exist",
            500
        );
        return next(error);
    }

    res.json({user: user})
}

const getUserFunction = async (id) => {
    const uid  = id;

    let user;
    try {
        user = await User.findById(uid)
    } catch (err) {
        throw err;
    }

    if (!user) {
        const error = new HttpError(
            "User doesn't exist",
            500
        );
        throw error;
    }

    return user;
}

const checkTask = async (req, res, next) => {
    const {uid, tid} = req.body;
    let user = await getUserFunction(uid);
    let taskIndex = user.tasks.findIndex(
        (task) => task._id == tid
    );
    taskList = [...user.tasks];
    taskList[taskIndex].checked = !taskList[taskIndex].checked;
    user.tasks = taskList;
    user.save();

    res.json({tasks: user.tasks});

}

const editTask = async (req, res, next) => {
    const { uid, tid, title, content } = req.body;
    let user = await getUserFunction(uid);
    let taskIndex = user.tasks.findIndex(
        (task) => task._id == tid
    );
    taskList = [...user.tasks];
    editedTask = taskList[taskIndex];

    if (title) {
        editedTask.title = title;
    }

    if (content) {
        editedTask.content = content;
    }

    user.save();

    res.json({tasks: user.tasks})
}

exports.createUser = createUser;
exports.createTask = createTask;
exports.login = login;
exports.deleteUser = deleteUser;
exports.deleteTask = deleteTask;
exports.getUser = getUser;
exports.checkTask = checkTask;
exports.editTask = editTask;
