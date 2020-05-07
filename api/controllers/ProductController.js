let onePage = 9;
module.exports = {
	getListProduct: async function(req,res){
		let {query} = req;
		let page = query.page ? query.page : 1;
		onePage = query.onePage ? query.onePage : 9;
		let numbSkip = (page - 1) * onePage;
		let orderBy = query.orderBy || 'created DESC';
		let price = query.price ? JSON.parse(query.price) : {};
		try {
			let products = await Product.find({select: ['brand_id','product_name','image','price','created']})
				.where(price)
				.sort(orderBy)
				.limit(onePage)
				.skip(numbSkip);
			let allProd = await Product.count().where(price);
			res.send({products, allProd});
		} catch (error) {
			console.log(error);
			res.send('Đã xảy ra lỗi. Vui lòng thử lại sau');
		}
	},
	getProductFromBrand: async function(req,res){
		let {query} = req;
		let {brand_id} = query;
		let page = query.page ? query.page : 1;
		let numbSkip = (page - 1) * onePage;
		let orderBy = query.orderBy || 'created DESC';
		let conditions = query.price ? JSON.parse(query.price) : {};
		conditions.brand_id = brand_id;
		try {
			products = await Product.find()
				.where(conditions)
				.sort(orderBy)
				.limit(onePage)
				.skip(numbSkip);
			let allProd = await Product.count().where(conditions);
			res.send({products, allProd});
		} catch (error) {
			console.log(error);
			res.send('Đã xảy ra lỗi. Vui lòng thử lại sau');
		}
	},
	getProductFromPrice: async function(req,res){
		let {query} = req;
		let maxPrice = query.maxPrice;
		let minPrice = query.minPrice;
		let page = query.page ? query.page : 1;
		let numbSkip = (page - 1) * onePage;
		let priceConditions = {};
		if (maxPrice) {
			priceConditions['<='] = maxPrice;
		}
		if (minPrice) {
			priceConditions['>='] = minPrice;
		}
		try {
			products = await Product.find({price: priceConditions})
				.sort("created DESC")
				.limit(onePage)
				.skip(numbSkip);
			res.send(products);
		} catch (error) {
			console.log(error);
			res.send('Đã xảy ra lỗi. Vui lòng thử lại sau');
		}
	},
	getProductDetail: async function(req,res){
		let {query} = req;
		let {product_id} = query;
		try {
			products = await Product.find({id:product_id});
			res.send(products);
		} catch (error) {
			console.log(error);
			res.send('Đã xảy ra lỗi. Vui lòng thử lại sau');
		}
	},
	search: async function(req,res){
		let {query} = req;
		let page = query.page ? query.page : 1;
		let start = (page-1)*onePage;
		let end = start + onePage;

		let data = req.body;
		let {prod_name} = data;
		prod_name = prod_name.toLowerCase();
		let allProduct = await Product.find();
		let listProduct = [];
		allProduct.forEach(product => {
			lowerName = product.product_name.toLowerCase();
			if(lowerName.search(prod_name) != -1){
				listProduct.push(product);
			}
		});
		res.send({
			products: listProduct.slice(start,end),
			allProd: listProduct.length
		});
	},
	addProduct: async function(req,res){
		let data = req.body;
    let product = await Product.create(data).fetch();
    res.send(product);
	},
	deleteProduct: async function(req,res){
		let {id} = req.query;
    try {
      await Product.destroyOne({id});
      res.send({
        success: true,
        message: "Xóa thành công"
      })
    } catch (error) {
      res.send({
        success: false,
        message: error
      })
    }
	},
	updateProduct: async function(req,res){
    let data = req.body;
    let product = await Product.update({id: data.id}).set({
				brand_id: data.brand_id,
				product_name: data.product_name,
				image: data.image,
				description: data.description,
				price: data.price
			}).fetch();
    res.send(product);
	}
}