const { Router } = require('express')
const mysql = require('mysql2')

const router = Router()

let connectionBeta
let connectionPlatforma

const beta = () => {
  connectionBeta = mysql.createConnection({
    port: process.env.BETA_PORT,
    user: process.env.BETA_USER,
    host: process.env.BETA_HOST,
    database: process.env.BETA_NAME,
    password: process.env.BETA_PASSWORD
  }).promise()

  connectionBeta.connect((err) => {
    if (err) {
      console.log('error when connecting to BETA:', err)
      setTimeout(beta(), 10000)
    }
    console.log('DataBase BETA connected')
  })

  connectionBeta.on('error', (err) => {
    console.log('db error', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      beta()
    } else {
      throw err
    }
  })
}

const platforma = () => {
  connectionPlatforma = mysql.createConnection({
    port: process.env.PLATFORMA_PORT,
    user: process.env.PLATFORMA_USER,
    host: process.env.PLATFORMA_HOST,
    database: process.env.PLATFORMA_NAME,
    password: process.env.PLATFORMA_PASSWORD
  }).promise()

  connectionPlatforma.connect((err) => {
    if (err) {
      console.log('error when connecting to PLATFORMA DB:', err)
      setTimeout(platforma(), 10000)
    }
    console.log('DataBase PLATFFORMA connected')
  })

  connectionPlatforma.on('error', (err) => {
    console.log('db error', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      platforma()
    } else {
      throw err
    }
  })
}

platforma()
beta()

const dbs = {
  beta: connectionBeta,
  platforma: connectionPlatforma
}
/* GET users listing. */
router.get('/users/:id/:type', async function (req, res, next) {
  const id = parseInt(req.params.id)
  const db = dbs[req.params.type]
  const subscription = await db.query(`SELECT * FROM subscriptions WHERE (telegram_user_id=${id}) AND (isActive=true)`
  ).then(([res]) => {
    return res[0]
  })
  res.json(subscription)
})

module.exports = router
