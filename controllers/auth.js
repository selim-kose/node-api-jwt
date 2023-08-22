require('dotenv').config();
const jwt = require('jsonwebtoken');

function createToken(id){
  return jwt.sign({id}, process.env.SECRET, {expiresIn: '5m'})
}

module.exports = {createToken}