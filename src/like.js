exports.isValid = (thing) =>
  typeof thing === 'object' &&
  thing !== null &&
  thing.hasOwnProperty('handle') &&
  thing.hasOwnProperty('tweetId') &&
  typeof thing.handle === 'string' &&
  typeof thing.tweetId === 'string'

const likes = (db) => db.likes

exports.all = (db) => likes(db)

exports.findByTweetId = (db, id) =>
  likes(db).filter((like) => like.tweetId == id)

exports.insert = (db, like) =>
  likes(db).push(like)
