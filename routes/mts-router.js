const express = require('express')
const MTSCntrl = require('../controllers/mts-controller')

const router = express.Router()

router.post('/MTS', MTSCntrl.createMTS)
router.put('/MTS/:id', MTSCntrl.updateMTS)
router.delete('/MTS/:id', MTSCntrl.deleteMTS)
router.get('/MTS/:id', MTSCntrl.getMTSById)
router.get('/All-MTS', MTSCntrl.getAllMTS)

module.exports = router