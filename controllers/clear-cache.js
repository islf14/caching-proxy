import { connection } from './redis.js'

export async function clearCache() {
  const nameIndex = 'caching-proxy-list'
  const client = await connection()
  const cplist = await client.get(nameIndex)
  let cachingProxy = ['']
  if (cplist) {
    cachingProxy = JSON.parse(cplist)
  }
  const result = await client.del(cachingProxy)
  await client.del(nameIndex)
  console.log(`Cache cleared (${result})`)
  client.destroy()
}
