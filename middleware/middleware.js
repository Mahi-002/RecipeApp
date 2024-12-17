// const jwt=require('jsonwebtoken');
// const User=require('../models/UserSchema');

// exports.authenticate=(req,res,next)=>{
//     try{
//         const token=req.header('Authorization');
//         const user=jwt.verify(token,process.env.tokenSecret)
//         console.log("user",user)

//         User.findByPk(user.id).then(user=>{
//             req.user=user
//             next()
//         }).catch(err=>{
//             throw new Error(err)
//         })
//     }catch(error){
//         return res.status(401).json({
//             success:false
//         })
//     }
// }

const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ message: 'No token provided.' });

    jwt.verify(token.replace('Bearer ', ''), process.env.tokenSecret, async (err, decoded) => {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
        req.user = decoded;
        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).send({ message: 'User not found.' });
        req.user = user;
        next();
    });
};
