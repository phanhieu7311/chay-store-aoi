/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
  login: async function(req,res){
    let data = req.body;
    let user = await User.find({username: data.username}).limit(1);
    user = user[0];
    if(!user){
      res.send({
        success: false,
        message: 'Tài khoản chưa được đăng ký'
      });
    } else {
      bcrypt.compare(data.password, user.password, function(err, result) {
        if(!result){
          res.send({
            success: false,
            message: 'Mật khẩu không đúng'
          });
        } else {
          res.send({
            success: true,
            user: user
          });
        }
      });
    }
  },
  signup: async function(req,res){
    let data = req.body;
    bcrypt.hash(data.password, saltRounds, async function(err, hash) {
      data.password = hash;
      let checkUser = await User.find({username: data.username}).limit(1);
      checkUser = checkUser[0];
      if(!checkUser){     
        try {
          let user = await User.create(data).fetch();
          res.send({
            success: true,
            user: user
          });
        } catch (e) {
          res.send({
            success: false,
            message: 'email or phone'
          })
        }
      } else {
        res.send({
          success: false,
          message: 'user'
        })
      }
    });
  }
};

