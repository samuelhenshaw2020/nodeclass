const HttpStatusCodes = {
    CONFLICT: 409,
    OK: 200,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500
}


const JWT_ALGORITHM = "RS256"

module.exports = {
    HttpStatusCodes,
    JWT_ALGORITHM
}