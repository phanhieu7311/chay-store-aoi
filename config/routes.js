/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
//product
  'get /api/product/getAll': {action: 'Product/getListProduct'},
  'get /api/product/getFromBrand': 'ProductController.getProductFromBrand',
  'get /api/product/getFromPrice': 'ProductController.getProductFromPrice',
  'get /api/product/getDetail': 'ProductController.getProductDetail',
  'post /api/product/search': 'ProductController.search',
  'post /api/product/add': 'ProductController.addProduct',
  'get /api/product/delete': 'ProductController.deleteProduct',
  'post /api/product/update': 'ProductController.updateProduct',

//brand
  'get /api/brand/getAll': 'BrandController.getListBrand',
  'get /api/brand/getFromId': 'BrandController.getBrandFromId',
  'post /api/brand/add': 'BrandController.addBrand',
  'get /api/brand/delete': 'BrandController.deleteBrand',
  'post /api/brand/update': 'BrandController.updateBrand',

//storage
  'get /api/storage/getSize': 'StorageController.getSizeProduct',
  'post /api/storage/update': 'StorageController.updateStorage',
  'post /api/storage/decrement': 'StorageController.decrementStorage',
  'post /api/storage/add': 'StorageController.addStorage',

//bill
  'post /api/bill/create': 'BillController.createBill',
  'post /api/bill/createDetail': 'BillController.createBillDetail',
  'get /api/bill/getAll': 'BillController.getListBills',
  'get /api/bill/get': 'BillController.getBill',
  'get /api/bill/getByUser': 'BillController.getBillByUser',
  'get /api/bill/count': 'BillController.countBillByTime',
  'get /api/bill/cancel': 'BillController.cancelBill',

//user
  'get /api/user/getAll': 'UserController.getAllUser',
  'post /api/user/update': 'UserController.updateUser',
  'get /api/user/getInfor': 'UserController.getUserInfor',
  'post /api/user/changePass': 'UserController.changePassword',

//login
  'post /api/login': 'LoginController.login',
  'post /api/signup': 'LoginController.signup',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
