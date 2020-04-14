/**
 * BillDetail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: "default",
  tableName: "bill_detail",
  attributes: {
    id: {type:'number',autoIncrement: true, columnName: 'id'},
    quantity: {type:'number', required:true},
    bill_id: {type:'number', required:true},
    product_id: {type:'number', required:true},
    size: {type:'number'}
  }

};

