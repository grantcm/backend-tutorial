const { getDatabase } = require('./database.js')
const { makeApp } = require('./app.js')

const main = async () => {
  var db = await getDatabase()
  const PORT = process.env.PORT || 5000
  const app = makeApp(db)
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
}

main()
