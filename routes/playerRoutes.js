require('dotenv').config()

const router = require('express').Router()
const Player = require('../model/Player')
const db = require('../repository/playerRepository')
const verifyJWT = require('../middleware/verifyJWT')


router.get('/',verifyJWT,  async (req, res) => {
   const players = await Player.find()
   res.status(200).json(players)
})

module.exports = router;