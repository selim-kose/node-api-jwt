const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')


router.get('/', async (req, res) => {
   const user = await User.find()
   res.json(user)
})

router.post('/register', async (req, res) => {
   //Check if email allready exist in database
   const emailExist = await User.findOne({ email: req.body.email });
   if (emailExist) {
      return res.status(400).send("Email already exists")
   }

   //Hashing password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(req.body.password, salt)

   //Create new User with data from request
   const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
   })

   const user = await User.create(newUser)

   res.json(user)
})


router.post('/login', async (req, res) => {
   //Check if User exists in DB
   const userInDB = await User.findOne({ email: req.body.email })
   if (!userInDB) return res.status(400).send('Email does not exist')

   //Check if inputed password matches with password in DB
   const correctPassword = await bcrypt.compare(req.body.password, userInDB.password)
   if (!correctPassword) return res.status(400).send('Wrong password')
   const jwtAccessToken = jwt.sign({ _id: userInDB._id }, process.env.SECRET, { expiresIn: '5m' })

   // TODO implement refreshtoken
   // const jwtRefreshToken = jwt.sign({ _id: userInDB._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

   res.header({ jwtAccessToken }).json(jwtAccessToken)

})


module.exports = router