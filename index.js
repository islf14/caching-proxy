import { argv } from 'node:process'
import express from 'express'
import { validateArgv } from './validators/validateArgv.js'
import { findPort } from './validators/findPort.js'
import { ProxyController } from './controllers/proxy.controller.js'

const valArg = validateArgv(argv)

if (valArg.origin) {
  const port = await findPort(valArg.port)
  const app = express()
  const proxyController = new ProxyController({ origin: valArg.origin })

  app.disable('x-powered-by')
  app.get('/', proxyController.start)
  app.get('/*p', proxyController.start)

  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
  })
}
