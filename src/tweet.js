exports.isValid = (thing) =>
  typeof thing === 'object' &&
  thing !== null &&
  thing.hasOwnProperty('handle') &&
  thing.hasOwnProperty('body') &&
  typeof thing.handle === 'string' &&
  typeof thing.body === 'string' &&
  thing.body.length <= 280

const tweets = (db) => db.tweets

exports.all = (db) => tweets(db)

exports.findById = (db, id) =>
  tweets(db).filter((tweet) => tweet.id == id)[0]

exports.findByHandle = (db, handle) =>
  tweets(db).filter((tweet) => tweet.handle == handle)

let nextId = 1
const addId = (tweet) => Object.assign({}, tweet, {id: '' + nextId++})
const addTimestamp = (tweet) => Object.assign({}, tweet, {timestamp: Date.now()})

exports.insert = (db, tweet) => {
  const newTweet = addId(addTimestamp(tweet))
  tweets(db).push(newTweet)
  return newTweet
}
