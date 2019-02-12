const express = require('express')
const bodyParser = require('body-parser')
const tweets = require('./tweet.js')
const likes = require('./like.js')

exports.makeApp = (db) => {
  var app = express()
  app.use(bodyParser.json())

  app.post('/tweet', async (req, res) => {
    if (!req.is('json') || !tweets.isValid(req.body)) {
      return res.status(400).end()
    } else {
      return res.status(200).json(await tweets.insert(db, req.body))
    }
  })

  app.get('/t/:handle', async (req, res) => {
    const handle = req.params.handle
    const tweetsForUser = await tweets.findByHandle(db, handle)
    if (tweetsForUser.length === 0) {
      return res.status(404).end()
    } else {
      return res.status(200).json(tweetsForUser).end()
    }
  })

  app.put('/like', async (req, res) => {
    const body = req.body
    if (!req.is('json') || !likes.isValid(body)) {
      return res.status(400).end()
    } else if (!(await tweets.findById(db, body.tweetId))) {
      return res.status(404).end()
    } else {
      await likes.insert(db, body)
      return res.status(200).json(body)
    }
  })

  app.get('/tweet/:id', async (req, res) => {
    const id = req.params.id
    const tweet = await tweets.findById(db, id)
    if (!tweet) {
      return res.status(404).end()
    } else {
      const _likes = await likes.findByTweetId(db, id)
      const body = { tweet, likes: _likes }
      return res.status(200).json(body)
    }
  })

  app.get('/everything', async (req, res) => {
    const allTweets = await tweets.all(db)
    const allLikes = await likes.all(db)
    const body = { tweets: allTweets, likes: allLikes }
    return res.status(200).json(body)
  })

  app.put('/reset', async (req, res) => {
    await tweets.deleteAll(db)
    await likes.deleteAll(db)
    return res.status(204).end()
  })

  return app
}
