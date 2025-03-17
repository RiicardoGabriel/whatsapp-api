require('./routes')
const { restoreSessions } = require('./sessions')
const { routes } = require('./routes')
const app = require('express')()
const bodyParser = require('body-parser')
const { maxAttachmentSize } = require('./config')
const cors = require('cors')

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin === 'http://localhost:5173' || /https:\/\/.*\.sweetpdv\.com\.br$/.test(origin) || origin === 'https://sweetpdv.com.br') {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization, X-Api-Key',
  credentials: true
}))

// Middleware para resolver o problema de "Preflight Request" (OPTIONS)
app.options('*', cors())

// Initialize Express app
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: maxAttachmentSize + 1000000 }))
app.use(bodyParser.urlencoded({ limit: maxAttachmentSize + 1000000, extended: true }))
app.use('/', routes)

restoreSessions()

module.exports = app
