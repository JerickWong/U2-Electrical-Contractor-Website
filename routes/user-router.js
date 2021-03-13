const express = require('express')
const UserCntrl = require('../controllers/user-controller')

const router = express.Router()

router.post('/register-user', UserCntrl.registerUser)
router.post('/login-user', UserCntrl.loginUser)
router.post('/register', UserCntrl.registerUser)
router.post('/current-user', UserCntrl.getUser)
router.get('/all-users', UserCntrl.getAllUser)
router.get('/logout-user', UserCntrl.logoutUser)
router.delete('/:id', UserCntrl.deleteUser)
router.put('/update-user/:id', UserCntrl.updateUser)

module.exports = router