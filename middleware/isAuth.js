const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        return res.status(401).json({
            status: 'Error',
            message: "Not authenticated!",
        });
    }
    const token = authHeader.split(' ')[1];
    let decodeToken = false;
    try{
        decodeToken = jwt.verify(token, 'TEST_JWT_SECRET_TOKEN');
    } catch(e){
        return res.status(401).json({
            status: 'Error',
            message: "Not authenticated!",
        });
    }
    if(!decodeToken){
        return res.status(401).json({
            status: 'Error',
            message: "Not authenticated!",
        });
    }
    req.userId = decodeToken.id;
    next();
}