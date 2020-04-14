/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: "default",
  tableName: "users",
  attributes: {
    id: {type:'number',autoIncrement: true, columnName:'user_id'},
    username: {type:'string', required:true},
    password: {type:'string', required:true},
    fullname: {type:'string', required:true},
    email: {type:'string', required:true},
    phone: {type:'string', required:true},
    role: {type:'number', required:true},
    created: {type:'ref', columnType: "datetime", autoCreatedAt: true},
    modified: {type:'ref', columnType: "datetime", autoCreatedAt: true},
  }

};

