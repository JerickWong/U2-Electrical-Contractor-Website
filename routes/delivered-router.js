const express = require('express')
const DeliveredCntrl = require('../controllers/delivered-controller')

const router = express.Router()

router.post('/Delivered', DeliveredCntrl.createDelivered)
router.put('/Delivered/', DeliveredCntrl.updateDelivered)
router.delete('/Delivered/:id', DeliveredCntrl.deleteDelivered)
router.get('/Delivered/:id', DeliveredCntrl.getDeliveredById)
router.get('/All-Delivered', DeliveredCntrl.getAllDelivered)
router.post('/Delivered/project', DeliveredCntrl.getDeliveredByProject)
router.post('/add-est-qty', DeliveredCntrl.addEstQty)

module.exports = router