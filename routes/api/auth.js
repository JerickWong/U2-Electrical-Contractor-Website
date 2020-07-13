const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Account = require('../../models/Account')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const account = await Account.findById(req.account.id).select('-password');
    res.json(account)
  } catch(err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
});


// @route   POST api/auth
// @desc    Authenticate account & get token
// @access  Public
router.post('/', [
  check('username', 'Username is required').exists(),
  check('password', 'Password is required')
  .exists()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, password, type } = req.body

  try {
    let account = await Account.findOne({ username })
    // console.log(account)
    if (!account) 
      return res.status(400).json({ errors: [{msg: 'Invalid credentials'}] })

    const isMatch = await bcrypt.compare(password, account.password)
    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ errors: [{msg: 'Invalid credentials'}] })
    }

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
