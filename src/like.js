exports.isValid = (thing) =>
  typeof thing === 'object' &&
  thing !== null &&
  thing.hasOwnProperty('handle') &&
  thing.hasOwnProperty('tweetId') &&
  typeof thing.handle === 'string' &&
  typeof thing.tweetId === 'string'

const likes = (db) => db.collection('likes')

exports.all = async (db) =>
  await likes(db).find({}).toArray()

exports.findByTweetId = async (db, id) =>
  await likes(db).find({tweetId: id}).toArray()

exports.insert = async (db, like) =>
  await likes(db).insertOne(like)

exports.deleteAll = async (db) =>
  await likes(db).deleteMany({})
