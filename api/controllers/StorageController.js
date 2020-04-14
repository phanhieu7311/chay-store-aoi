/**
 * StorageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	getSizeProduct: async function(req,res){
		let {query} = req;
		let {product_id} = query;
		let listSize = [];
		let size = await Storage.find({product_id}).sort('size ASC');
		size.forEach(item => {
			listSize.push(item);
		});
		res.send(listSize);
	},
	decrementStorage: async function(req,res){
		let data = req.body;
		await sails.getDatastore('default').sendNativeQuery('update storage set `quantity`=`quantity`-'+data.quantity
		+' where `product_id`='+data.product_id+' and `size`='+data.size, function(e,result){
			if(e){
				res.send({
					success: false,
					messgae: e
				});
			} else {
				res.send({
					success: true,
					messgae: 'Cập nhật thành công'
				});
			}
		});
	},
	updateStorage: async function(req,res){
		let data = req.body;
		let storage = await Storage.update({id:data.id}).set({quantity: data.quantity}).fetch();
		res.send(storage);
	},
	addStorage: async function(req,res){
		let data = req.body;
		let storage = await Storage.create(data).fetch();
		res.send(storage);
	}
};

