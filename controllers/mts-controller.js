const moment = require('moment')
const MTS = require('../models/MTS')

createMTS = (req, res) => {
    const body = req.body

    if (!body) {
        console.log(`body ${body}`)
        return res.status(400).json({
            success: false,
            error: 'You must provide a MTS',
        })
    }

    const mts = new MTS(body)

    if (!mts) {
        console.log(`mts ${mts}`)
        return res.status(400).json({ success: false, error: err })
    }

    mts
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: mts._id,
                message: 'MTS created!',
            })
        })
        .catch(error => {            
            return res.status(400).json({
                error,
                message: 'MTS not created!',
            })
        })
}

updateMTS = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    MTS.findOne({ _id: req.params.id }, (err, mts) => {
        if (err) {            
            return res.status(404).json({
                err,
                message: 'MTS not found!',
            })
        }
        
        mts.prepared_by = body.prepared_by
        mts.project_name = body.project_name
        mts.MTS_number = body.MTS_number
        mts.delivered_from = body.delivered_from
        mts.total_amount = body.total_amount
        mts.requested_by = body.requested_by
        mts.approved_by = body.approved_by
        mts.takenout_by = body.takenout_by
        mts.received_by = body.received_by
        mts.status = body.status
        mts.date = body.date
        mts.rows = body.rows
                
        mts
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: mts._id,
                    data: mts,
                    message: 'MTS updated!',
                })
            })
            .catch(error => {
                console.log(error)
                console.log("dito")
                return res.status(404).json({
                    error,
                    message: 'MTS not updated!',
                })
            })
    })
}

deleteMTS = async (req, res) => {
    await MTS.findOneAndDelete({ _id: req.params.id }, (err, mts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts) {
            return res
                .status(404)
                .json({ success: false, error: `mts not found` })
        }

        return res.status(200).json({ success: true, data: mts })
    }).catch(err => console.log(err))
}

getMTSById = async (req, res) => {
    await MTS.findOne({ _id: req.params.id }, (err, mts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts) {
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        return res.status(200).json({ success: true, data: mts })
    }).catch(err => console.log(err))
}

getAllMTS = async (req, res) => {
    await MTS.find({}, (err, mtss) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!mtss.length) {
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        return res.status(200).json({ success: true, data: mtss })
    }).catch(err => console.log(err))
}

getMTSProjects = async (req, res) => {
    await MTS.distinct('project_name', (err, mts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts) {
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        return res.status(200).json({ success: true, data: mts })
    })
}

getMTSByProject = async (req, res) => {
    if (req.body.status === "All") {

        await MTS.find({ project_name: req.body.project_name }, (err, mts) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!mts.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `MTS not found` })
            }
            return res.status(200).json({ success: true, data: mts })
        })
    }

    else {

        await MTS.find({ project_name: req.body.project_name, status: req.body.status }, (err, mts) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!mts.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `MTS not found` })
            }
            return res.status(200).json({ success: true, data: mts })
        })
    }
}

getDelivered = async (req, res) => {
    await MTS.find({ project_name: req.body.project_name }, (err, mts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts.length) {
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }

        // delivered object
        const sortedByDate = mts.sort((a, b) => b.date - a.date)        
        const firstItems = sortedByDate[0].rows.map(row => row.description)
        const firstQty = sortedByDate[0].rows.map(row => row.qty)
        // console.log(sortedByDate[0].rows)
        // console.log("second")
        // console.log(sortedByDate[1].rows)
        console.log(firstItems)
        console.log(firstQty)
        const deliveredObject = [{
            date: moment(mts[0].date).format('YYYY-MM-DD'),
            items: firstItems,
            qty: firstQty
        }]
        // console.log(sortedByDate[0].rows)
        sortedByDate.map((mts, index) => {
            if (index > 0) {
                const date = moment(mts.date).format('YYYY-MM-DD')

                // if the same date, += the qty                
                if (deliveredObject.filter(obj => obj.date === date)) {
                    deliveredObject.map(obj => {
                        if (obj.date===date) {
                            console.log('one')
                            const { items, qty } = obj
                            const { rows } = mts
                            console.log('two')

                            rows.map(row => {
                                // item already exists                                 
                                if (items.filter(item => row.description===item)) {
                                    items.map((item, index) => {
                                        console.log(`row description: ${row.description}`)
                                        console.log(`item: ${item}`)
                                        if (row.description===item) {
                                            console.log('three')
                                            qty[index] += row.qty
                                        }
                                    })
                                } 
                                // new item
                                else {
                                    console.log('four')
                                    if (row.description && row.qty) {
                                        console.log('five')

                                        items.push(row.description)
                                        qty.push(row.qty)
                                    }
                                }
                            })
                            
                        }
                    })
                } else {
                    const items = mts.rows.map(row => {
                        if (row.description)
                            return row.description
                    })
                    const qty = mts.rows.map(row => row.qty)
                    deliveredObject.push({
                        date,
                        items,
                        qty
                    })
                }
            }
        })
        console.log(deliveredObject)
        return res.status(200).json({ success: true, data: deliveredObject })
    })
}

module.exports = {
    createMTS,
    updateMTS,
    deleteMTS,
    getAllMTS,
    getMTSById,
    getMTSByProject,
    getMTSProjects,
    getDelivered
}