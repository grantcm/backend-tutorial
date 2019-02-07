const express = require('express')
const bodyParser = require('body-parser')
const tweets = require('./tweet.js')
const likes = require('./like.js')

exports.makeApp = (db) => {
  var app = express()
  app.use(bodyParser.json())

  app.post('/tweet', (req, res) => {
    if (!req.is('json') || !tweets.isValid(req.body)) {
      return res.status(400).end()
    } else {
      return res.status(200).json(tweets.insert(db, req.body))
    }
  })

  app.get('/t/:handle', (req, res) => {
    const handle = req.params.handle
    const tweetsForUser = tweets.findByHandle(db, handle)
    if (tweetsForUser.length === 0) {
      return res.status(404).end()
    } else {
      return res.status(200).json(tweetsForUser).end()
    }
  })

  app.put('/like', (req, res) => {
    const body = req.body
    if (!req.is('json') || !likes.isValid(body)) {
      return res.status(400).end()
    } else if (!(tweets.findById(db, body.tweetId))) {
      return res.status(404).end()
    } else {
      likes.insert(db, body)
      return res.status(200).json(body)
    }
  })

  app.get('/tweet/:id', (req, res) => {
    const id = req.params.id
    const tweet = tweets.findById(db, id)
    if (!tweet) {
      return res.status(404).end()
    } else {
      const _likes = likes.findByTweetId(db, id)
      const body = { tweet, likes: _likes }
      return res.status(200).json(body)
    }
  })

  app.get('/everything', (req, res) => {
    const allTweets = tweets.all(db)
    const allLikes = likes.all(db)
    const body = { tweets: allTweets, likes: allLikes }
    return res.status(200).json(body)
  })

  return app
}
