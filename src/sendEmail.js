require("dotenv").config();
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.EMAIL_API, {
    port: 465, //default smtp
});
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

let docRef = db.collection("messages");

// Initialize sentEmails set
let sentEmails = new Set();

function sendEmail() {
    docRef.orderBy("timestamp", "desc").limit(1).onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            let docId = doc.id;
            if (sentEmails.has(docId)) {
                return; // Skip this document, we've already processed it.
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
                });
        });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}


module.exports = sendEmail