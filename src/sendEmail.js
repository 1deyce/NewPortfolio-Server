require("dotenv").config();
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.EMAIL_API);
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

let docRef = db.collection("messages");

// Initialize sentEmails set
let sentEmails = new Set();

function sendEmail() {
    docRef.onAdd((doc) => {
        let docId = doc.id;
        // Check if the document has already been processed
        if (sentEmails.has(docId)) {
            return;
        }
        sentEmails.add(docId);

        let data = doc.data();

        const msg = {
            to: 'keenandeyce@gmail.com',
            from: data['email'],
            subject: data['subject'],
            text: `Message from ${data['fullName']} (${data['email']}): ${data['message']}`,
            html: `<strong>Message from ${data['fullName']} (${data['email']}):</strong> ${data['message']}`,
        };

        sgMail
            .send(msg)
            .then((response) => {
                console.log('Email sent!!')
                console.log(response);
            })
            .catch((error) => {
                console.error(error)
            })
    });
};


module.exports = sendEmail