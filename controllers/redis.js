import { createClient } from 'redis'

// url: 'redis://:@redis:6379' // for compose
// url: 'redis://:@127.0.0.1:6378' // run image redis (redis1) // from npm start
// url: 'redis://:@redis1:6379' // run image redis (redis1) // build and run dockerfile
export async function connection() {
  const client = await createClient({
    url: 'redis://:@127.0.0.1:6379'
  })
    .on('error', (err) => console.log('Redis Client Error: ', err.message))
    .connect()
  return client
}
