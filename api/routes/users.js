const { Router } = require('express')
const mysql = require('mysql2')

const router = Router()

const connectionBeta = mysql.createConnection({
  host: '85.193.84.146',
  port: 3306,
  user: 'gen_user',
  database: 'default_db',
  password: 'LEXAALEXscket4'
}).promise()

const connectionPlatforma = mysql.createConnection({
  host: '188.225.86.225',
  port: 3306,
  user: 'gen_user',
  database: 'default_db',
  password: 'LEXAALEXscket4'
}).promise()

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

/* GET user by ID. */
// router.get('/users/:id', function (req, res, next) {
//   const id = parseInt(req.params.id)
//   if (id >= 0 && id < users.length) {
//     res.json(users[id])
//   } else {
//     res.sendStatus(404)
//   }
// })

module.exports = router
