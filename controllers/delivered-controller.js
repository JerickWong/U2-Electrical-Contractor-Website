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
        console.log(`what ${body}`)
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    
    Delivered.findOne({ project_name: body.project_name }, (err, delivered) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Delivered not found!',
            })
        }

        delivered.rows = body.rows
        delivered.start = body.start
        delivered.end = body.end

        delivered
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: delivered._id,
                    data: delivered,
                    message: 'Delivered updated!',
                })
            })
            .catch(error => {
                console.log(error)
                return res.status(404).json({
                    error,
                    message: 'Delivered not updated!',
                })
            })
    })
}

const addItem = async (req, res) => {
    // req.body = project_name, rows (item, total), date. Basically MTS nalang ipasa ko
    await Delivered.findOne({ project_name: req.body.project_name }, (err, delivered) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!delivered) {
            console.log(`ADDITEM ${err}`)
            return res
                .status(404)
                .json({ success: false, error: `Delivered not found` })
        }

        const { rows } = req.body

        rows.map(row => {
            if (delivered.rows.filter(d => d.item === row.description).length>0) {
                delivered.rows.map((d, index) => {
                    if (d.item === row.description) {
                        d.total += row.qty
                    }
                })
            } else {
                delivered.rows.push({
                    estqty: 0,
                    item: row.description,
                    total: row.qty
                })
            }
        })

        const date = new Date(req.body.date)

        const dates = delivered.dates
        dates.push(date)

        const sortedByDate = dates.sort((a, b) => a - b)
        console.log(sortedByDate[0])
        console.log(sortedByDate[sortedByDate.length-1])

        delivered.dates = sortedByDate
        delivered.start = sortedByDate[0]
        delivered.end = sortedByDate[sortedByDate.length-1]

        // if (!(!date - delivered.start === 0 || !date - delivered.end === 0)) {
        //     if (date - delivered.start < 0) 
        //         delivered.start = date            
        //     else if (date - delivered.end > 0) 
        //         delivered.end = date
        // }

        delivered
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: delivered._id,
                    data: delivered,
                    message: 'Delivered updated!',
                })
            })
            .catch(error => {
                console.log(`deliverednotupdated ${error}`)
                return res.status(404).json({
                    error,
                    message: 'Delivered not updated!',
                })
            })

    }).catch(err => console.log(err))
}

const removeItem = async (req, res) => {
    await Delivered.findOne({ project_name: req.body.project_name }, (err, delivered) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!delivered) {
            return res
                .status(404)
                .json({ success: false, error: `Delivered not found` })
        }

        const { rows } = req.body

        rows.map(row => {
            if (delivered.rows.filter(d => d.item === row.item).length>0) {
                delivered.rows.map((d, index) => {
                    if (d.item === row.item) {
                        d.total -= row.total

                        if (d.total === 0) {
                            delivered.rows.splice(index, 1)
                        }
                    }
                })
            }
        })        

        // FIX NEW START / END DATE
        const index = delivered.dates.indexOf(req.body.date)
        delivered.dates.splice(index, 1)
        delivered.start = delivered.dates[0]
        delivered.end = delivered.dates[delivered.dates.length-1]

        delivered
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: delivered._id,
                    data: delivered,
                    message: 'Delivered updated!',
                })
            })
            .catch(error => {
                console.log(error)
                return res.status(404).json({
                    error,
                    message: 'Delivered not updated!',
                })
            })

    }).catch(err => console.log(err))
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
            return res
                .status(404)
                .json({ success: false, error: `Delivered not found` })
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
    addItem,
    removeItem
}