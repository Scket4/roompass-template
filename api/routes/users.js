const { Router } = require('express')
const mysql = require('mysql2')

const router = Router()

const connection = mysql.createConnection({
  host: '89.223.71.192',
  port: 3306,
  user: 'gen_user',
  database: 'default_db',
  password: 'LEXAALEXscket4'
}).promise()

// Mock Users
// const users = [
//   { name: 'Alexandre' },
//   { name: 'Pooya' },
//   { name: 'Sébastien' }
// ]

/* GET users listing. */
router.get('/users', async function (req, res, next) {
  const users = await connection.query('SELECT * FROM users').then(([res]) => {
    return res
  })
  res.json(users)
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
