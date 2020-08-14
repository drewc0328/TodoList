const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Todo server up and running.');
});

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is connected on port ${port}`)
})

mongoose.connect("mongodb+srv://Drew:bellabella444@cluster0.j0suz.mongodb.net/todolist?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB server connected!")
}).catch(err => console.log(err))



