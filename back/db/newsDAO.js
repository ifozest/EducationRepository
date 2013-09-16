var db = require('./initDB')
  , collection = db.collection('news')
  , Deferred = require('../util/deferred');

var ObjectID = require('mongodb').ObjectID;

var newsDAO = {};
/**
 * fetch by key
 * @param id
 * @returns promise
 */
newsDAO.fetchById = function (id) {
  var deferred = new Deferred();
  collection.findOne({'_id': new ObjectID(id)}, function (err, doc) {
    (doc) ? deferred.resolve(doc) : deferred.reject(err);
  });
  return deferred.promise;
};

/**
 * save in db or rewrite if exists
 * @param object
 * @returns promise
 */
newsDAO.save = function (object) {
  var deferred = new Deferred();
  object._id = new ObjectID(object._id);

  collection.findAndModify({'_id': object._id}, {}, object, {upsert: true}, function (err, doc) {
    (doc) ? deferred.resolve(doc) : deferred.reject(err);
  });
  return deferred.promise;
};

newsDAO.remove = function(id){
  var deferred = new Deferred();
  collection.remove({'_id': new ObjectID(id)},  {single: true}, function (err, doc) {
    (doc) ? deferred.resolve(doc) : deferred.reject(err);
  });
  return deferred.promise;
}

newsDAO.fetchAll = function(){
  var deferred = new Deferred();
  collection.find().toArray(function (err, doc) {
    if (doc){
      deferred.resolve(doc);
    } else {
      deferred.reject(err);
    }
  });
  return deferred.promise;
};



newsDAO.insert = function (object) {
  var deferred = new Deferred();
  collection.insert(object, function (err, doc) {
    (doc) ? deferred.resolve(doc) : deferred.reject(err);
  });
  return deferred.promise;
};

module.exports = exports = newsDAO;



