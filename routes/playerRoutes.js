require('dotenv').config();

const router = require('express').Router();
const Player = require('../model/Player');
const db = require('../repository/playerRepository');
const verifyJWT = require('../middleware/verifyJWT');
const {updatePlayer,getAllPlayers,getPlayer,createPlayer,deletePlayer} = require('../controllers/playerController');


router.route('/')
    .get(verifyJWT, getAllPlayers )
    .post(verifyJWT, createPlayer);


router.route('/:id')
    .get(verifyJWT, getPlayer)
    .delete(verifyJWT, deletePlayer)
    .put(verifyJWT, updatePlayer);    


module.exports = router;
