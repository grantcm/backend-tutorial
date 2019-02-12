const { MongoClient } = require('mongodb')

exports.getDatabase = async () => {
  const url = process.env.MONGODB_URI
  const dbName = url.match(/\/([^\/]*)$/)[1]
  const client = await MongoClient.connect(url)
  return client.db(dbName)
}
