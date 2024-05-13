const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        if(!req.headers.token) {
            return(
                res.status(400).json({
                    message: "Authorization Failed! Token not found.",
                    status:false,
                })
            );
        }

        if(!req.query.current_user_id) {
            return (
                res.json({
                    message: "Authorization Failed! User not logged in.",
                    status: false
                })
            );
        }
        else {
            const token = req.headers.token;
            if(!token){
                return(
                    res.status(400).json({
                        message: "Authorization Failed! Token not found.",
                        status:false
                    })
                );
            }

            if(token){
                jwt.verify(token, process.env.TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authorization Failed!',
                        status:false
                    });
                }
                else if(decoded){
                    if(decoded.id != req.query.current_user_id){
                        return (
                            res.status(401).json({
                                message: "Authorization Successfull!",
                                status:false
                            })
                        );
                    }
                    else{
                        next();
                    }
                }
                })
        }    
        }
    } catch {
        res.status(401).json({
            error: "Authorization Failed! Invalid token."
        });
    }
};