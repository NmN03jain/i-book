const express = require("express");
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var fetch = require("../middleware/fetch");
const jwt_secret = "someoneisgoodboy"


// Route 1
router.post("/",
  body('name', "Your name must be 4 words").isLength({ min: 4 }),
  body('email').isEmail(),
  body('password', "Your password must be 5 word/numbers").isLength({ min: 5 }),
  async (req, res) => {

    let success = false

    // if there is any error it return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    // it check whether user not use already exist email
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "sorry the email is already exist" });
    }


    // converting password into hashcode/
    const salt = await bcrypt.genSaltSync(10);
    security = await bcrypt.hash(req.body.password, salt);

    // create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: security,
    });

    data = {
      user: {
        id:user.id
        // name: user.name,
        // email: user.email,
        // password: user.password
      }
    }
    const authtoken = jwt.sign(data, jwt_secret)
    success = true
    res.json({ success, authtoken });
  })

// Route 2
// Authenticate user for login in page

router.post("/login",
  body('email').isEmail(),
  body('password', "Passwrod cannot be blank").exists(),
  async (req, res) => {

    let success= false;
    // if there is any error it return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // checking email is exist or not in our data base
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: "User not exist :" })
      }
      // checking password is correct or not
      const passwordCheck = await bcrypt.compare(password, user.password)
      if (!passwordCheck) {
        return res.status(400).json({ error: "Password is wrong :" })
      }
      const data = {
        user: {
          id:user.id
          // name: user.name,
          // email: user.email,
          // password: user.password
        }
      }
      const authtoken = jwt.sign(data, jwt_secret)

      success = true
      res.json({ success, authtoken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured")
    }

  });




// Router 3
// Getting user detail

router.post("/getUser",fetch, async (req, res) => {
  try {
  const userId = req.user.id
    const user = await User.findById(userId).select("-password");
    res.send(user)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured")
  }
})




module.exports = router