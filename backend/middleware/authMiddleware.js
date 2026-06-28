const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token;

    // Check if Authorization header exists
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Save user info in request
            req.user = decoded;

            // Continue to the next middleware/controller
            next();

        } catch (error) {
            return res.status(401).json({
                message: "Not authorized. Invalid token."
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Not authorized. No token provided."
        });
    }
};

module.exports = protect;