const nodemailer = require("nodemailer");
const { MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD } = require("./env");


const mailer = nodemailer.createTransport({
    host: String(MAIL_HOST),
    port: Number(MAIL_PORT),
    auth: {
      user: String(MAIL_USERNAME),
      pass: String(MAIL_PASSWORD)
    }
});



module.exports = mailer;