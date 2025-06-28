import { URL } from 'node:url'
export class ProxyController {
  constructor({ origin }) {
    this.origin = origin
  }

  start = async (req, res) => {
    let url
    try {
      url = new URL(req.url, this.origin).href
    } catch (error) {
      console.log(error.message)
    }
    try {
      const result = await fetch(url)
      const data = await result.json()
      console.log('ok')
      return res.json(data)
    } catch (error) {
      console.log({ error: error.message })
      return res.status(400).json({ error: 'Error getting data' })
    }
  }
}
