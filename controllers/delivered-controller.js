const Delivered = require('../models/DeliveredSummary')

const createDelivered = (req, res) => {
    const body = req.body

    if (!body) {
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

// updateDelivered = async (req, res) => {
//     const body = req.body

//     if (!body) {
//         console.log(`what ${body}`)
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a body to update',
//         })
//     }
    
//     Delivered.findOne({ project_name: body.project_name }, (err, delivered) => {
//         if (err) {
//             console.log(err)
//             return res.status(404).json({
//                 err,
//                 message: 'Delivered not found!',
//             })
//         }
        
//         delivered.start = body.start
//         delivered.end = body.end
        
//         const rows = delivered.rows
//         console.log(delivered)
//         console.log(delivered.rows)
//         body.rows.map(row => {
//             if (rows.filter(r => r.item === row.item).length>0) {
//                 rows.map(r => {
//                     if (r.item === row.item)
//                         r.total += row.total
//                 })
//             }

//             else {
//                 rows.push({
//                     estqty: 0,
//                     item: row.item,
//                     total: row.total
//                 })
//             }
//         })
                
//         delivered
//             .save()
//             .then(() => {
//                 return res.status(200).json({
//                     success: true,
//                     id: delivered._id,
//                     data: delivered,
//                     message: 'Delivered updated!',
//                 })
//             })
//             .catch(error => {
//                 console.log(error)
//                 return res.status(404).json({
//                     error,
//                     message: 'Delivered not updated!',
//                 })
//             })
//     })
// }

const updateDelivered = async (req, res) => {
    const body = req.body

    if (!body) {
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
    await Delivered.deleteMany({  }, (err, delivered) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!delivered) {
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
            return res.status(400).json({ success: false, error: err })
        }

        if (!delivered) {
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
            return res.status(400).json({ success: false, error: err })
        }
        if (!delivereds.length) {
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
            return res.status(400).json({ success: false, error: err })
        }
        if (!delivered) {

        //     const { newMTS } = req.body
        //     const dates = []
        //     const rows = []
        //     newMTS.map(mts => {
        //         dates.push(mts.date)
        //         mts.rows.map(row => {
        //             if (rows.filter(d => d.item === row.description).length>0) {
        //                 rows.map((d, index) => {
        //                     if (d.item === row.description) {
        //                         d.total += row.qty
        //                     }
        //                 })
        //             } else {
        //                 rows.push({
        //                     estqty: 0,
        //                     item: row.description,
        //                     total: row.qty
        //                 })
        //             }
        //         })
        //     })

        //     const sortedByDate = dates.sort((a, b) => a - b)

        //     const payload = {
        //         dates: sortedByDate,
        //         start: sortedByDate[0],
        //         end: sortedByDate[sortedByDate.length-1],
        //         rows: rows
        //     }

        //     const deliver = new Delivered(payload)

        //     if (!deliver) {
        //         console.log('may mali')
        //         return res.status(400).json({ success: false, error: err })
        //     }

        //     delivered
        //         .save()
        //         .then(() => {
        //             return res.status(201).json({
        //                 success: true,
        //                 id: delivered._id,
        //                 message: 'Delivered created!',
        //             })
        //         })
        //         .catch(error => {        
        //             console.log(error)    
        //             return res.status(400).json({
        //                 error,
        //                 message: 'Delivered not created!',
        //             })
        //         })


            return res
                .status(204)
                .json({ success: false, error: `Delivered not found` })
        // } else {
        //     // remove updated na wala nang items
        //     const object = delivered.toObject()
            
        //     const clean = object.rows.filter(row => )
        }
        return res.status(200).json({ success: true, data: delivered })
    }).catch(err => console.log(err))
}

module.exports = {
    createDelivered,
    updateDelivered,
    deleteDelivered,
    getAllDelivered,
    getDeliveredById,
    getDeliveredByProject,
}