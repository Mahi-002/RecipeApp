const User=require('../models/UserSchema')
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  console.log(req.body)
  let plainPsd = req.body.password
  let salt = 10
  bcrypt.hash(plainPsd,salt).then(hash=>{
      console.log("hash ",hash)
      User.create({name:req.body.name,email:req.body.email,password:hash})
      .then(user=>{
          res.json(user)
      }).catch(error=>{
          let errormsg = error?.errors?.[0]?.message ?? error.message    
          res.json({
              error:errormsg
          })
      })
  })
};

module.exports = Register;
