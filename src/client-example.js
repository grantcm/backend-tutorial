const got = require('got')
const apiHost = 'http://localhost:5000'

const main = async () => {
  // save tweets:
  const tweet1 = {
    handle: 'jeff',
    body: 'Hello, world!',
  }
  const tweet2 = {
    handle: 'jeff',
    body: 'I am a tweet.',
  }

  const params = (body) => ({method: 'POST', json: true, body: body})
  const tweetResponseBody = async (tweet) =>
    (await got(apiHost + '/tweet', params(tweet))).body
  const tweet1Response = await tweetResponseBody(tweet1)
  const tweet2Response = await tweetResponseBody(tweet2)
  console.log('tweet1Response:\n', tweet1Response)
  console.log('\n\n')
  console.log('tweet2Response:\n', tweet2Response)
  console.log('\n\n')

  // get tweets for handle 'jeff':
  const receivedTweets = (await got(apiHost + '/t/jeff', {json: true})).body
  console.log('receivedTweets:\n', receivedTweets)
  console.log('\n\n')

  // like a tweet:
  const like = {
    tweetId: tweet1Response.id,
    handle: 'jeffs_secret_admirer',
  }

  const likedResponse =
    (await got(apiHost + '/like', {method: 'PUT', json: true, body: like})).body
  console.log('likedResponse:\n', likedResponse)
  console.log('\n\n')

  // fetch a tweet with likes:
  const receivedTweetInfo =
    (await got(apiHost + '/tweet/' + tweet1Response.id, {json: true})).body
  console.log('receivedTweetInfo:\n', receivedTweetInfo)
}

main()
