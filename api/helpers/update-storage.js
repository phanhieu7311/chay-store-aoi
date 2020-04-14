module.exports = {


  friendlyName: 'Update storage',


  description: '',


  inputs: {
    product_id: {type: 'number', required: true},
    size: {type: 'number', required: true},
    amount: {type: 'number', required: true},
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    product_id = inputs.product_id;
    size = inputs.size;
    amount = inputs.amount;
    if(amount>0){
			let quant = await Storage.findOne({
				where: {product_id,size},
				select: ['quantity']
			});
			let {quantity} = quant;
			quantity -= amount;
			let updateStorage = await Storage.update({product_id,size})
        .set({quantity}).fetch();
      return updateStorage;
		}
  }

};

