// const nodeMailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  const msg = {
    to: options.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: options.subject,
    text: options.message,
  };
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email Sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
