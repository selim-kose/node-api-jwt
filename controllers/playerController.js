const Player = require('../model/Player')
const {dateCreater} = require('../helpers/date')


const getAllPlayers = async (req, res) => {
    const players = await Player.find()
    res.status(200).json(players)
 }

 const getPlayer = async (req, res) => {
    const player = await Player.findById(req.params.id)
    res.status(200).json(player)
 }

 const deletePlayer = async (req, res) => {
    const playerToDelete = await Player.findByIdAndDelete(req.params.id)
    res.status(200).json(playerToDelete)
 }

 const createPlayer = async (req, res) => {
    const player = new Player({
     name: req.body.name,
     positon: req.body.position,
     age: req.body.age,
     date: dateCreater()
    })

    const playerToSave = await Player.create(player);
    res.status(204).json(playerToSave)
 }

 const updatePlayer = async (req, res) => {
  const id = req.params.id;
  const player = req.body;
  const options = {new: true}

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(id,player, options)
    res.status(200).json(updatePlayer)
  } catch (error) {
    res.status(400).json(`Player not found ${error}`)
  }  
 }

 module.exports = {getAllPlayers, getPlayer, deletePlayer, createPlayer, updatePlayer};