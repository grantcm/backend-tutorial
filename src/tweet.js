const { ObjectId } = require('mongodb')

exports.isValid = (thing) =>
  typeof thing === 'object' &&
  thing !== null &&
  thing.hasOwnProperty('handle') &&
  thing.hasOwnProperty('body') &&
  typeof thing.handle === 'string' &&
  typeof thing.body === 'string' &&
  thing.body.length <= 280

const tweets = (db) => db.collection('tweets')

exports.all = async (db) =>
  await tweets(db).find().toArray()

exports.findById = async (db, id) =>
  await tweets(db).findOne(ObjectId(id))

exports.findByHandle = async (db, handle) =>
  await tweets(db).find({handle: handle}).toArray()

const addTimestamp = (tweet) => Object.assign({}, tweet, {timestamp: Date.now()})

exports.insert = async (db, tweet) => {
  let newTweet = addTimestamp(tweet)
  await tweets(db).insertOne(newTweet)
  return newTweet
}
