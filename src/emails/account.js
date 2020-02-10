

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'philippe@rouleau-redding.com',
        subject: `Welcome ${name}` ,
        text: `Welcome to ${name} task app`,
        html: `<h1><strong>Welcome ${name} to task app</strong></h1>`
      };
      sgMail.send(msg);
}

const sendCancelationEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'philippe@rouleau-redding.com',
        subject: `We are sorry to see you go ${name}` ,
        text: `Goodbye ${name}`,
        html: `<h1><strong>Goodbye ${name}</strong></h1>`
      };
      sgMail.send(msg);
}
module.exports = { 
    sendWelcomeEmail ,
    sendCancelationEmail
}