import { URL } from 'node:url'
import { createClient } from 'redis'

// url: 'redis://:@redis:6379' // for compose
// url: 'redis://:@127.0.0.1:6378' // run image redis (redis1) // from npm start
// url: 'redis://:@redis1:6379' // run image redis (redis1) // build and run dockerfile

export class ProxyController {
  constructor({ origin }) {
    this.origin = origin
  }

  start = async (req, res) => {
    const client = await createClient({
      url: 'redis://:@127.0.0.1:6379'
    })
      .on('error', (err) => console.log('Redis Client Error', err))
      .connect()

    let url
    //validate and join base url witch path
    try {
      url = new URL(req.url, this.origin).href
    } catch (error) {
      console.log(error.message)
    }
    // search in redis
    const data = await client.get(url)
    if (data) {
      res.set('X-Cache', 'HIT')
      return res.json(JSON.parse(data))
    }
    // get data from url and save in redis
    try {
      const result = await fetch(url)
      const data = await result.json()
      await client.set(url, JSON.stringify(data))
      await client.expire(url, 3600) //1h=3600
      res.set('X-Cache', 'MISS')
      return res.json(data)
    } catch (error) {
      console.log({ error: error.message })
      return res.status(400).json({ error: 'Error getting data' })
    }
  }
}
