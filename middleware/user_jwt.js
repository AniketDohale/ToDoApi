const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No token, Authorization Denied'
        });
    }
    try {
        await jwt.verify(token, process.env.jwtUserSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    msg: 'Token Not Valid'
                });
            }
            else {
                req.user = decoded.user;
                next();
            }
        });
    }
    catch (err) {
        console.log('Something Went Wrong with Middleware ' + err);
        res.json(500).json({
            msg: 'Server Error'
        });
    }
}