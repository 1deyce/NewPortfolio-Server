require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.EMAIL_API, {
    authMethod: "smtps",
    port: 465, //default smtp
});

function sendEmail(data) {
    const msg = {
        to: 'keenandeyce@gmail.com',
        from: 'keenandeyce@gmail.com',
        subject: data.subject,
        text: `Hello,

        You have received a message from ${data.fullName} (${data.email}).

        Message:
        ${data.message}

        Regards,
        ${data.fullName}`,
        html: `<p>Hello,</p>

        <p>You have received a message from <strong>${data.fullName}</strong> (${data.email}).</p>

        <p>Message:<br>
        ${data.message}</p>

        <p>Regards,<br>
        ${data.fullName}</p>`,
    };

    return new Promise((resolve, reject) => {
        sgMail.send(msg)
            .then((response) => {
                console.log("Email sent!");
                console.log(response);
                resolve(response);
            })
            .catch((error) => {
                console.error("Email sending failed:", error);
                reject(error);
            });
    });
}

module.exports = sendEmail;