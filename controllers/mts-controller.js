const moment = require('moment')
const MTS = require('../models/MTS')

const createMTS = (req, res) => {
    const body = req.body

    if (!body) {
        console.log('no body')
        return res.status(400).json({
            success: false,
            error: 'You must provide a MTS',
        })
    }

    const mts = new MTS(body)

    if (!mts) {
        console.log('something went wrong')
        return res.status(400).json({ success: false, error: `Something went wrong` })
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
            console.log(error)
            return res.status(400).json({
                error,
                message: 'MTS not created!',
            })
        })
}

const updateMTS = async (req, res) => {
    const body = req.body

    if (!body) {
        console.log('no body')
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
        mts.address = body.address
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
                return res.status(404).json({
                    error,
                    message: 'MTS not updated!',
                })
            })
    })
}

const deleteMTS = async (req, res) => {
    await MTS.findOneAndDelete({ _id: req.params.id }, (err, mts) => {
        if (err) {
            console.log(`error 400: ${err}`)
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts) {            
            console.log(`error 404: ${mts}`)
            return res
                .status(404)
                .json({ success: false, error: `mts not found` })
        }

        return res.status(200).json({ success: true, data: mts })
    }).catch(err => console.log(err))
}

const getMTSById = async (req, res) => {
    await MTS.findOne({ _id: req.params.id }, (err, mts) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts) {
            console.log('not found')
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        return res.status(200).json({ success: true, data: mts })
    }).catch(err => console.log(err))
}

const getAllMTS = async (req, res) => {
    await MTS.find({}, (err, mtss) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }
        if (!mtss.length) {
            console.log('not found')
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        return res.status(200).json({ success: true, data: mtss })
    }).catch(err => console.log(err))
}

const getMTSProjects = async (req, res) => {
    await MTS.distinct('project_name', (err, mts) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts) {
            console.log('not found')
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        return res.status(200).json({ success: true, data: mts })
    })
}

const getMTSByProject = async (req, res) => {
    if (req.body.status === "All") {

        await MTS.find({ project_name: req.body.project_name }, (err, mts) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!mts.length) {
                console.log('not found')
                return res
                    .status(204)
                    .json({ success: false, error: `MTS not found` })
            }
            return res.status(200).json({ success: true, data: mts })
        })
    }

    else {

        await MTS.find({ project_name: req.body.project_name, status: req.body.status }, (err, mts) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!mts.length) {
                console.log('not found')
                return res
                    .status(204)
                    .json({ success: false, error: `MTS not found` })
            }
            return res.status(200).json({ success: true, data: mts })
        })
    }
}

const getDelivered = async (req, res) => {
    await MTS.find({ project_name: req.body.project_name, status: "Confirmed" }).lean().exec( (err, mts) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts.length) {
            console.log('not found')
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }

        // delivered object
        const sortedByDate = mts.sort((a, b) => b.date - a.date)
        const firstItems = sortedByDate[0].rows.map(row => row.description)
        const firstQty = sortedByDate[0].rows.map(row => row.qty)
        
        const deliveredObject = [{
            date: moment(mts[0].date).format('YYYY-MM-DD'),
            items: firstItems,
            qty: firstQty
        }]
        
        sortedByDate.map((mts, index) => {
            if (index > 0) {
                const date = moment(mts.date).format('YYYY-MM-DD')
                // if the same date, += the qty                
                if (deliveredObject.filter(obj => obj.date === date).length>0) {
                    deliveredObject.map(obj => {
                        if (obj.date===date) {
                            const { items, qty } = obj
                            const { rows } = mts

                            rows.map(row => {
                                // item already exists
                                if (items.filter(item => row.description===item).length>0) {
                                    items.map((item, index) => {
                                        if (row.description===item) {
                                            qty[index] += row.qty
                                        }
                                    })
                                } 
                                // new item
                                else {
                                    items.push(row.description)
                                    qty.push(row.qty)
                                }
                            })
                            
                        }
                    })
                } 
                
                else {
                    const items = mts.rows.map(row => row.description)
                    const qty = mts.rows.map(row => row.qty)
                    deliveredObject.push({
                        date,
                        items,
                        qty
                    })
                }
            }
        })
        
        return res.status(200).json({ success: true, data: deliveredObject })
    })
}

const getCost = async (req, res) => {
    await MTS.find({ project_name: req.body.project_name, status: "Confirmed" }).lean().exec( (err, mts) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts.length) {
            console.log('not found')
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        
        const sortedByDate = mts.sort((a, b) => a.date - b.date)
        
        sortedByDate[0].balance = sortedByDate[0].total_amount
                
        sortedByDate.reduce((total, mts) => {
            if (total.total_amount)
                mts.balance = total.total_amount + mts.total_amount
            else
                mts.balance = total + mts.total_amount

            return mts.balance
        })
        
        return res.status(200).json({ success: true, data: sortedByDate })
    })
}

const getDeliveredSummary = async (req, res) => {
    await MTS.find({ project_name: req.body.project_name, date: { $gte: req.body.from, $lte: req.body.to }, status: "Confirmed" }).lean().exec( (err, mts) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts.length) {
            console.log('not found')
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        
        const sortedByDate = mts.sort((a, b) => a.date - b.date)

        const deliveredSummary = []
        
        sortedByDate.map(mts => {
            mts.rows.map(row => {
                if (deliveredSummary.filter(obj => obj.item === row.description).length>0) {
                    deliveredSummary.map(obj => {
                        if (obj.item === row.description) 
                            obj.total += row.qty
                    })
                }

                else {
                    deliveredSummary.push({
                        item: row.description,
                        total: row.qty
                    })
                }
            })
        })
        
        return res.status(200).json({ success: true, data: deliveredSummary })
    })
}

const getProjectDates = async (req, res) => {
    await MTS.find({ project_name: req.body.project_name, status: "Confirmed" }, (err, mts) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts.length) {
            console.log('not found')
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }

        const sortedByDate = mts.sort((a, b) => a.date - b.date)
        const dates = {
            start: sortedByDate[0].date,
            end: sortedByDate[sortedByDate.length-1].date
        }        

        return res.status(200).json({ success: true, data: dates })
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
    getDelivered,
    getCost,
    getDeliveredSummary,
    getProjectDates
}