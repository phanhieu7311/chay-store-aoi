/**
 * BillController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let onePage = 9;
module.exports = {
  createBillDetail: async function(req,res){
    let detail = await BillDetail.create(req.body).fetch();
    res.send(detail);
  },
  createBill: async function(req,res){
    let data = req.body;
    data.status = 0;
    let bill = await Bill.create(data).fetch();
    res.send(bill);
  },
  getListBills: async function(req,res){
    let {query} = req;
		let page = query.page ? query.page : 1;
		onePage = query.onePage ? query.onePage : 9;
    let numbSkip = (page - 1) * onePage;
		try {
			let bills = await Bill.find()
				.sort("created DESC")
				.limit(onePage)
				.skip(numbSkip);
			let allBill = await Bill.count();
			res.send({bills, allBill});
		} catch (error) {
			console.log(error);
			res.send('Đã xảy ra lỗi. Vui lòng thử lại sau');
		}
  },
  getBill: async function(req,res) {
    let {bill_id} = req.query;
    try {
      let bill = await Bill.find({id:bill_id});
      let billDetail = await BillDetail.find({bill_id});
			res.send({
        bill: bill[0],
        detail : billDetail
      });
    } catch (e) {
			console.log(error);
			res.send('Đã xảy ra lỗi. Vui lòng thử lại sau');
    }
  },
  getBillByUser: async function (req,res) {
    let {user_id} = req.query;
    let bills = await Bill.find({user_id}).sort('id DESC');
    let billDatas = [];
    Promise.all(bills.map((bill) => {
      return new Promise(async (resolve) => {
        let billDetail = await BillDetail.find({bill_id: bill.id})
        let billData = {
          bill,
          billDetail
        }
        billDatas.push(billData);
        resolve(true);
      })
    })).then(()=>{
      res.send(billDatas);
    });
  },
  countBillByTime: async function (req, res) {
    let {query} = req;
    let from = query.from;
    let to = query.to;
    let conditons = {
      created: {
        '>=': from,
        '<=': to
      }
    }
    if (query.status) {
      conditons.status = query.status;
    }
    let count = await Bill.count().where(conditons);
    res.send({
      success: true,
      count: count
    });
  },
  cancelBill: async function (req,res) {
    let {bill_id} = req.query;
    let bill = await Bill.update({id: bill_id}).set({status: 3}).fetch();
    res.send({
      success: true,
      bll: bill
    });
  }
};

