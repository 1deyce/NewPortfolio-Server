require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT
const cors = require('cors');
const sendEmail = require("./src/sendEmail.js");

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send("My Homepage");
})

app.post('/email', (req, res) => {
    sendEmail();
    res.send("Backend POST success");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})