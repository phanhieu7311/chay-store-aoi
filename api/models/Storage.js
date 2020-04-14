/**
 * Storage.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: "default",
  tableName: "storage",
  attributes: {
    id: {type:'number',autoIncrement: true},
    product_id: {type:'number', required:true},
    size: {type:'number',required:true},
    quantity: {type: 'number', required:true}
  }
};

