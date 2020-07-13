const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const Account = require('../../models/Account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
  res.send('Accounts route');
});

router.post('/', [
  check('username', 'Username is required').not().isEmpty(),
  check('password', 'Please enter a password with 6 or more characters')
  .isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, password, type } = req.body

  try {
    let account = await Account.findOne({ username })

    if (account) 
      return res.status(400).json({ errors: [{msg: 'User already exists'}] })

    accountt = new Account({
      username,
      password,
      type
    })

    const salt = await bcrypt.genSalt(10)

    account.password = await bcrypt.hash(password, salt)

    await account.save()

    // res.send('User registered')
    console.log(account)
    const payload = {
      account: {
        id: account.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
    
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
  

  // Account.findOne
  console.log(req.body.username)
  console.log(req.body.password)
  // res.send('Accounts route');
})

module.exports = router;
