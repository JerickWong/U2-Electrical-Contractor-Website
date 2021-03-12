const express = require('express')
const SupplierCntrl = require('../controllers/supplier-controller')

const router = express.Router()

router.post('/Supplier', SupplierCntrl.createSupplier)
router.put('/Supplier/:id', SupplierCntrl.updateSupplier)
router.delete('/Supplier/:id', SupplierCntrl.deleteSupplier)
router.get('/Supplier/:id', SupplierCntrl.getSupplierById)
router.get('/All-Supplier', SupplierCntrl.getAllSupplier)

module.exports = router