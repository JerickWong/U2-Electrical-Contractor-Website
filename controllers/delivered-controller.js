const Delivered = require('../models/DeliveredSummary')

const createDelivered = (req, res) => {
    const body = req.body

    if (!body) {
        console.log('no body')
        return res.status(400).json({
            success: false,
            error: 'You must provide a Delivered',
        })
    }

    const delivered = new Delivered(body)

    if (!delivered) {
        console.log('may mali')
        return res.status(400).json({ success: false, error: err })
    }

    delivered
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: delivered._id,
                message: 'Delivered created!',
            })
        })
        .catch(error => {        
            console.log(error)    
            return res.status(400).json({
                error,
                message: 'Delivered not created!',
            })
        })
}

const updateDelivered = async (req, res) => {
    const body = req.body

    if (!body) {
        console.log('no body')
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    
    try {
        const delivered = await Delivered.findOne({ project_name: body.project_name }).lean()
        const { rows } = req.body

        delivered.rows.map((row, index) => {
            if (rows.filter(d => d.item === row.item).length>0) {
                rows.map((d, index) => {
                    if (d.item === row.item) {
                        row.total = d.total
                    }
                })
            } else {
                delivered.rows.splice(index, 1)
            }
        })

        rows.map(row => {
            if (delivered.rows.filter(d => d.item===row.item).length === 0)
                delivered.rows.push({ estqty: 0, ...row })
        })

        delivered.start = body.start
        delivered.end = body.end

        try {
            const newDelivered = await Delivered.findOne({ project_name: body.project_name })
            newDelivered.overwrite(delivered)
            await newDelivered.save()
    
            return res.status(200).json({
                success: true,
                id: delivered._id,
                data: delivered,
                message: 'Delivered updated!',
            })
            
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error,
                message: 'Delivered not updated!',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            error,
            message: 'Delivered not found!',
        })
    }
}

const deleteDelivered = async (req, res) => {
    await Delivered.findByIdAndDelete({ _id: req.params.id }, (err, delivered) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }

        if (!delivered) {
            console.log('delivered not found')
            return res
                .status(404)
                .json({ success: false, error: `Delivered not found` })
        }

        return res.status(200).json({ success: true, data: delivered })
    }).catch(err => console.log(err))
}

const getDeliveredById = async (req, res) => {
    await Delivered.findOne({ _id: req.params.id }, (err, delivered) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }

        if (!delivered) {
            console.log('not found')
            return res
                .status(404)
                .json({ success: false, error: `Delivered not found` })
        }
        return res.status(200).json({ success: true, data: delivered })
    }).catch(err => console.log(err))
}

const getAllDelivered = async (req, res) => {
    await Delivered.find({}, (err, delivereds) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }
        if (!delivereds.length) {
            console.log('not found')
            return res
                .status(404)
                .json({ success: false, error: `Delivered not found` })
        }
        return res.status(200).json({ success: true, data: delivereds })
    }).catch(err => console.log(err))
}

const getDeliveredByProject = async (req, res) => {
    await Delivered.findOne({ project_name: req.body.project_name }, (err, delivered) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }
        if (!delivered) {
            console.log('delivered by project not found')
            return res
                .status(204)
                .json({ success: false, error: `Delivered not found` })
        }
        return res.status(200).json({ success: true, data: delivered })
    }).catch(err => console.log(err))
}

const addEstQty = async (req, res) => {
    try {
        const { project_name, rows } = req.body
        
        const delivered = await Delivered.findOne({ project_name: project_name })
        delivered.rows = rows
        
        await delivered.save()
        return res.status(200).json({
            success: true,
            message: 'Estimated Quantity updated!',
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: `Adding failed` })
    }
}

module.exports = {
    createDelivered,
    updateDelivered,
    deleteDelivered,
    getAllDelivered,
    getDeliveredById,
    getDeliveredByProject,
    addEstQty
}