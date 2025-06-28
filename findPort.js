import net from 'node:net'

// console.log(await findPort(3000))

export function findPort(setPort) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.listen(setPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', async (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(await findPort(0))
      }
    })
  })
}
