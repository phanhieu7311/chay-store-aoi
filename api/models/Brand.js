/**
 * Brand.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: "default",
  tableName: "brands",
  attributes: {
    id: {type:'number',autoIncrement: true, columnName: 'brand_id'},
    brand_name: {type:'string', required:true},
    created: {type:'ref', columnType: "datetime", autoCreatedAt: true},
    modified: {type:'ref', columnType: "datetime", autoCreatedAt: true},
  }
};

