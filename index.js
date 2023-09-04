require("dotenv").config();

const email = require('./src/sendEmail.js');
const express = require('express');
const app = express();
const port = process.env.PORT

const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials: true,
}));

app.get('/test', (req, res) => {
    email()
    res.send("Email sent");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})