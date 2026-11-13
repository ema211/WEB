const jwt = require("jsonwebtoken");

let privateKey = process.env.TOKEN_KEY || "Welcome1234";

const verifyToken = (req, res, next) => {
    if (process.env.REQUIRE_AUTH === 'false') {
        return next();
    }

    let token = req.get("x-auth");
    if (token == undefined) {
        return res.status(403).send("Missing token");
    }

    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");

        req.userInfo = decoded;
        return next();
    });
};

exports.verifyToken = verifyToken;
