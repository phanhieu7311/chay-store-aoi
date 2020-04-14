/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: "default",
  tableName: "products",
  attributes: {
    id: {type:'number',autoIncrement: true, columnName: 'product_id'},
    brand_id: {type:'number', required:true},
    product_name: {type:'string', required:true},
    image: {type:'string', allowNull:true},
    description: {type:'string', allowNull:true},
    price: {type:'number', required:true},
    created: {type:'ref', columnType: "datetime", autoCreatedAt: true},
    modified: {type:'ref', columnType: "datetime", autoCreatedAt: true},
  }
};

