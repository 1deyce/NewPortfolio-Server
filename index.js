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

app.post('/email', async (req, res) => {
    const { fullName, email, subject, message } = req.body;
    try {
        await sendEmail({ fullName, email, subject, message });
        res.send("Backend POST success");
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).send("Failed to send email");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})