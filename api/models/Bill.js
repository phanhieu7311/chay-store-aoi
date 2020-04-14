/**
 * Bill.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: "default",
  tableName: "bills",
  attributes: {
    id: {type:'number',autoIncrement: true, columnName: 'bill_id'},
    user_id: {type: 'number', allowNull: true},
    customer: {type: 'string'},
    address: {type: 'string'},
    phone: {type: 'string'},
    note: {type: 'string'},
    status: {type: 'number'},
    created: {type:'ref', columnType: "datetime", autoCreatedAt: true},
    modified: {type:'ref', columnType: "datetime", autoCreatedAt: true},
  }

};

