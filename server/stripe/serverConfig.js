const cors = require('cors')
const bodyParser = require('body-parser')
const FRONTEND_DEV_URL = require('./frontend')

const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin)
    FRONTEND_DEV_URL.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
  }
}

const configureServer = app => {
  app.use(cors(corsOptions))
  app.use(bodyParser.json())
}

module.exports = configureServer
