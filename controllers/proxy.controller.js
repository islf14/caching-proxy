import { URL } from 'node:url'
import { connection } from './redis.js'
import { join } from 'node:path'

export class ProxyController {
  constructor({ origin }) {
    this.origin = origin
  }

  start = async (req, res) => {
    const nameIndex = 'caching-proxy-list'
    const client = await connection()
    let url
    //validate and join base url witch path
    try {
      const baseUrl = new URL(this.origin)
      baseUrl.pathname = join(baseUrl.pathname, req.url)
      url = baseUrl.href
    } catch (error) {
      console.log(error.message)
    }
    // search in redis
    const data = await client.get(url)
    if (data) {
      client.destroy()
      res.set('X-Cache', 'HIT')
      return res.json(JSON.parse(data))
    }

    // find saved list in redis
    const cplist = await client.get(nameIndex)
    let cachingProxy = []
    if (cplist) {
      cachingProxy = JSON.parse(cplist)
      const found = cachingProxy.find((element) => element === url)
      if (!found) cachingProxy.push(url)
    } else cachingProxy.push(url)

    // get data from url and save in redis
    try {
      console.log('fetch to ' + url)
      const result = await fetch(url)
      const data = await result.json()

      await client.set(url, JSON.stringify(data))
      await client.expire(url, 3600) //1h=3600
      await client.set(nameIndex, JSON.stringify(cachingProxy))
      client.destroy()

      res.set('X-Cache', 'MISS')
      return res.json(data)
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ error: 'Error getting data' })
    }
  }
}
