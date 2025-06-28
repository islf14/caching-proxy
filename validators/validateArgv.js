export function validateArgv(argv) {
  let port
  let origin
  if (argv.length >= 4 && argv.length <= 6) {
    if (argv[2] === '--port' && argv[4] !== '--port') {
      const np = parseInt(argv[3])
      if (!isNaN(np)) {
        port = np
      }
    }

    if (argv[4] === '--port' && argv[2] !== '--port') {
      const np = parseInt(argv[5])
      if (!isNaN(np)) {
        port = np
      }
    }

    if (argv[2] === '--origin' && argv[4] !== '--origin') {
      const so = argv[3]
      if (so.length >= 11 && so.toLowerCase().startsWith('http')) {
        try {
          origin = new URL(so).href
        } catch (error) {
          console.log({ error: error.message })
        }
      }
    }

    if (argv[4] === '--origin' && argv[2] !== '--origin') {
      const so = argv[5]
      if (so.length >= 11 && so.toLowerCase().startsWith('http')) {
        try {
          origin = new URL(so).href
        } catch (error) {
          console.log({ error: error.message })
        }
      }
    }
  } else {
    console.log('only --origin and --port are acepted.')
  }
  const valArg = {
    port,
    origin
  }
  return valArg
}
