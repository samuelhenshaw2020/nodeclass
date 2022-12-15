require("dotenv").config();

const {
    MONGODB_URI,
    MAIL_HOST,
    MAIL_PORT,
    MAIL_USERNAME,
    MAIL_PASSWORD,
    MAIL_FROM,
    SESSION_SECRET,
    AUTH_SECRET
} = process.env;


module.exports = {
    MONGODB_URI,
    MAIL_HOST,
    MAIL_PORT,
    MAIL_USERNAME,
    MAIL_PASSWORD,
    MAIL_FROM,
    SESSION_SECRET,
    AUTH_SECRET
}