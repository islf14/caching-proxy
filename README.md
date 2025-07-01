# Caching Proxy

JavaScript solution for [Caching Proxy](https://roadmap.sh/projects/caching-server) from [roadmap.sh](https://roadmap.sh/).

## Requirements

- Node.js must be installed.
- Redis must be installed.

## How to run

Perform the following steps:

#### To install dependencies, run in console:

```bash
npm install
```

#### To start the project, run in console:

- Giving the port and the origin, the server will listen to port 3000.

```bash
node index --port 3000 --origin http://dummyjson.com
```

- The sever assigns an available port (e.g. server will listen to port 60413).

```bash
node index --origin http://dummyjson.com
```

- Run the following command to clear the cache.

```bash
node index --clear-cache
```
