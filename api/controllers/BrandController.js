/**
 * BrandController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const onePage = 9;
module.exports = {
  getListBrand: async function(req,res){
    let {query} = req;
		let page = query.page ? query.page : 1;
    let numbSkip = (page - 1) * onePage;
    let listBrand = []
    let allBrand = await Brand.find({select:['id','brand_name','created']})
      .sort('id ASC')
      .limit(onePage)
      .skip(numbSkip);
    allBrand.forEach(brand => {
      listBrand.push(brand)
    });
    let countBrand = await Brand.count();
		res.send({listBrand, countBrand});
  },
  getBrandFromId: async function(req,res){
    let {brand_id} =req.query;
    let brand = await Brand.find({id: brand_id});
    res.send(brand[0].brand_name);
  },
  addBrand: async function(req,res){
    let data = req.body;
    let brand = await Brand.create(data).fetch();
    res.send(brand);
  },
  deleteBrand: async function(req,res){
    let {id} = req.query;
    try {
      await Brand.destroyOne({id});
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
  updateBrand: async function(req,res){
    let data = req.body;
    let brand = await Brand.update({id: data.id})
      .set({brand_name: data.brand_name}).fetch();
    res.send(brand);
  }
};

