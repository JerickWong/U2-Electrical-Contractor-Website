const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../db/index')
const cookies = require('cookie-parser')

loginUser = async (req, res) => {
    if (!req.body.password) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a password',
        })
    }    
    const { password, username } = req.body

    await User.findOne({ username }, async (err, user) => {
        if (err)
            return res.status(400).json({ success: false, error: err })
        
        if (!user) 
            return res.status(404).json({ success: false, error: `User not found` })
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);        
        
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                name: user.name
            };
            // Sign token
            const token = jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 28800 }, // 8hours in seconds
                (err, token) => {                    
                    res.json({
                        success: true,
                        token,
                        user,
                    });
                    // console.log(`inside ${token}`)
                    res.cookie('token', token, {
                        // domain: "localhost",
                        httpOnly: false
                    });
                }
            );
            // console.log(token)
            // res.cookie('token', token);
        } else {
            return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }

        // return res.status(200).json({ success: true, data: user })
    })

}

logoutUser = async (req, res) => {

}

registerUser = (req, res) => {
    const { password, username, type } = req.body
    const newUser = new User({
        username,
        password,
        type
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
    });    
    // return res.send("etits")
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getAllUser = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

getUser = async (req, res) => {
    const token = req.body.token
    // console.log(token)
    // console.log(req.body.token)
    // console.log(token, " baket wala huhu")
    // alert(token)    

    if (!token) 
        res.status(400).json({ msg: "No token, authorization denied" });

    try {
        // Verify token
        const decodedUser = jwt.verify(token, keys.secretOrKey);
        // const decodedUser = jwt_decode(token)

        // Add user to payload
        req.user = decodedUser;
        
        const user = await User.findById({ _id: decodedUser.id }).select('-password')
        // console.log(user)
        return res.status(200).json({ success: true, data: user })
        // next();
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: "Token is not valid" })
    }
}

updatePassword = async (req, res) => {
    const { password, isAdmin } = req.body

    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({isAdmin: isAdmin}, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
                            })
                            .catch(error => {
                            return res.status(404).json({
                            error,
                            message: 'User not updated!',
                            })
                        })
                })
            });
        });    
}

updatePRFFolder = async (req, res) => {

    const { password, isAdmin } = req.body

    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({isAdmin: isAdmin}, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.prf_folder = body.prf_folder
        
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'PRF Folder updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'PRF Folder  not updated!',
                })
            })
    })
}

updatePOFolder = async (req, res) => {

    const { password, isAdmin } = req.body
    
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({isAdmin: isAdmin}, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.po_folder = body.po_folder
        
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'PO Folder updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'PO Folder  not updated!',
                })
            })
    })
}
module.exports = {
    loginUser,
    logoutUser,
    registerUser,
    deleteUser,    
    getAllUser,
    getUser,
    updatePassword,
    updatePRFFolder,
    updatePOFolder
}