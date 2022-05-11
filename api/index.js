// const fs = require('fs')
// const https = require('https')
// const path = require('path')
const express = require('express')

// Create express instance
const app = express()

// const options = {
//   key: fs.readFileSync(path.resolve(__dirname, '../server.key')),
//   cert: fs.readFileSync(path.resolve(__dirname, '../server.crt'))
// }

// const server = https.createServer(options, app).listen()

// Require API routes
const users = require('./routes/users')
const test = require('./routes/test')

// Import API Routes
app.use(users)
app.use(test)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
