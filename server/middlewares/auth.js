const { verifySession } = require("../services/users");

module.exports = () => (req, res, next) => {
    try {
        const token = req.headers['x-authorization'];
        if (token) {
            const userData = verifySession(token);
            req.user = userData;
            console.log('in auth middleware, user:')
            console.log(userData);
        }
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid access token. Please login!" })
    }
};