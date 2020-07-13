const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')

    // Check if not token
    if (!token) {
        return res.status(404).json({ msg: 'No token, authorization denied' })
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.account = decoded.account;
        next()        
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}