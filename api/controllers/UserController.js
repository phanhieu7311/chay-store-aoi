/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const saltRounds = 10;
const onePage = 9;
module.exports = {
  getAllUser: async function(req,res){
    let {query} = req;
		let page = query.page ? query.page : 1;
    let numbSkip = (page - 1) * onePage;
		try {
			let users = await User.find({select: ['id','username','fullname','email','phone','role','created']})
				.sort("id ASC")
				.limit(onePage)
				.skip(numbSkip);
			let allUser = await User.count();
			res.send({users, allUser});
		} catch (error) {
			console.log(error);
			res.send('Đã xảy ra lỗi. Vui lòng thử lại sau');
		}
  },
  updateUser: async function(req,res){
    let data = req.body;
    let user = await User.update({id:data.user_id})
      .set({
        fullname: data.fullname,
        phone: data.phone,
        email: data.email,
        role: data.role
      }).fetch();
    res.send(user);
  },
  getUserInfor: async function(req,res){
    let {id} = req.query;
    let user = await User.find({select: ['username','fullname','email','phone','role']})
      .where({id});
    res.send(user);
  },
  changePassword: async function(req,res){
    let data = req.body;
    let user = await User.find({id: data.user_id}).limit(1);
    user = user[0];
    bcrypt.compare(data.oldPassword, user.password, function(err, result) {
      if(!result){
        res.send({
          success: false,
          message: 'Mật khẩu không đúng'
        });
      } else {
        bcrypt.hash(data.newPassword, saltRounds, async function(err, hash) {
          let user = await User.update({id: data.user_id})
            .set({password:hash}).fetch();
          res.send({
            success: true,
            user: user
          });
        });
      }
    });
  }
};

