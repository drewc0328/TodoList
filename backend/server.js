const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const http = require("http");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Todo server up and running.');
});

//const server = http.createServer(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is connected on port ${port}`)
})

app.use((req, res, next) => {
    const error = new HttpError("Couldn't find this route", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose.connect("mongodb+srv://Drew:bellabella444@cluster0.j0suz.mongodb.net/todolist?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB server connected!")
}).catch(err => console.log(err))



