require('./routes')
const { restoreSessions } = require('./sessions')
const { routes } = require('./routes')
const app = require('express')()
const bodyParser = require('body-parser')
const { maxAttachmentSize } = require('./config')
const cors = require('cors')

// Configurar o CORS corretamente
app.use(cors({
  origin: 'http://localhost:5173', // Permite requisições desta origem
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // Métodos permitidos
  allowedHeaders: 'Content-Type, Authorization, X-Api-Key', // Headers permitidos
  credentials: true // Se precisar enviar cookies ou tokens
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
