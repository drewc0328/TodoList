const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

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

