const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
    let login = req.body
    console.log("login info ",login)
    User.findAll({where:{email:login.email}}).then(user=>{
        if(user.length==0){
            res.status(404).json({
                success:false,
                message:"User not found"
            })
        }else{
            user = user[0]
            console.log("user from db ",user.password)

            bcrypt.compare(login.password,user.password).then(result=>{
                console.log("result ",result,"user.id: ",user.id)
                if(result==false){
                    res.status(401).json({
                        success:false,
                        message:"User Not Authorized"
                    })
                }else{
                    console.log("secret key ",process.env.tokenSecret)
                    var token = jwt.sign({ id: user.id }, process.env.tokenSecret);
                    res.status(200).json({
                        success:true,
                        message:"User is succesfuly logged in",
                        token:token
                    })
                }
            })
        }
    })
}

module.exports = Login;
