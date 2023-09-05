require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT
const cors = require('cors');
const sendEmail = require("./src/sendEmail.js");
const bodyParser = require("body-parser");

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("My Homepage");
})

app.post('/email', (req, res) => {
    const { fullName, email, subject, message } = req.body;
    sendEmail({ fullName, email, subject, message });
    res.send("Backend POST success");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})