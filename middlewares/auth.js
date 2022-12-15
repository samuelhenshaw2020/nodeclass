const jwt = require("jsonwebtoken");
const { join } = require("path");
const { root_path } = require("../global.config");
const User = require("../models/User");
const { JWT_ALGORITHM, HttpStatusCodes } = require("../utils/constants");

async function auth(req, res, next) {
    try {
        const token = String(req.headers["authorization"]).split(" ")[1]
        
        const privateKey = require('fs').readFileSync(join(root_path, 'private.key'));
        const decodedToken = jwt.verify(token, privateKey, {algorithms: [JWT_ALGORITHM]})
        
        const user = await User.findOne({"_id": decodedToken?.id})
        if(user == null){
            res.status(HttpStatusCodes.UNAUTHORIZED)
            .json({message: "User Unauthorized"})
            return;
        }

        req['user'] = user;
    } catch (error) {
     
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({message: "User unauthorized"})
    }
    next()
}

module.exports = auth;

