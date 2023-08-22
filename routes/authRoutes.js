const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const cookieParser = require('cookie-parser')
const {createToken} = require('../controllers/auth')


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

   //Save user to DB
   const user = await User.create(newUser)

   //Create JWT and cookie
   const token = createToken(user._id)
   res.cookie("jwt", token, {httpOnly: true, maxAge: 1000 * 60 * 5})

   res.json(user.email)
})


router.post('/login', async (req, res) => {
   //Check if User exists in DB
   const userInDB = await User.findOne({ email: req.body.email })
   if (!userInDB) return res.status(400).send('Email does not exist')

   //Check if inputed password matches with password in DB
   const correctPassword = await bcrypt.compare(req.body.password, userInDB.password)
   if (!correctPassword) return res.status(400).send('Wrong password')
   const token = createToken(userInDB._id)

   // TODO implement refreshtoken
   // const jwtRefreshToken = jwt.sign({ _id: userInDB._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

   res.cookie( "jwt", token, {httpOnly:true})
   res.send('Logged in succesfully')
   //res.header({ jwtAccessToken }).json(jwtAccessToken)

})


module.exports = router