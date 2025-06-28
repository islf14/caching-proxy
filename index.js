import { argv } from 'node:process'
import express from 'express'
import { validateArgv } from './validateArgv.js'
import { findPort } from './findPort.js'

const valArg = validateArgv(argv)
console.log(valArg)

if (valArg.origin) {
  const port = await findPort(valArg.port)
  const app = express()

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
