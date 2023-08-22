const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
   //const token = req.header("auth-token")
   const token = req.cookies.jwt
   if (!token) return res.status(401).send("Access denied")

   try {
      const verify = jwt.verify(token, process.env.SECRET)
   } catch (error) {
      res.status(400).send('Invalid token')
   }
   next()
}

module.exports = verifyJWT