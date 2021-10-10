const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; 

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: "Invalid Token ..."
                });                 
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            message: "Invalid or Expired Token ...",
        }); 
    }


    // if (!req.headers.authorization) {
    //     return res.json({ error: 'No credentials sent!' });
    // } else {
    //     try {
    //         console.log(JWT_SECRET);
    //         const token = req.header.authorization.split(' ')[1];  
    //         console.log(`TOKEN : ${token}`); 
    //         const decodeToken = jwt.verify(token, JWT_SECRET);
    //         req.userData = decodeToken;
    //         next();        
    //     } catch(e) {
    //         return res.status(401).json({
    //             message: "Invalid or Expired Token ...",
    //             error : e
    //         });    
    //     }          
    // }      
}

module.exports = {
    auth : auth
}