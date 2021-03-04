const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../db/index')
const cookies = require('cookie-parser')

const loginUser = async (req, res) => {
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

const logoutUser = async (req, res) => {

}

const registerUser = (req, res) => {
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

const deleteUser = async (req, res) => {
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

const getAllUser = async (req, res) => {
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

const getUser = async (req, res) => {
    const token = req.body.token

    if (!token) 
        res.status(400).json({ msg: "No token, authorization denied" });

    try {
        // Verify token
        const decodedUser = jwt.verify(token, keys.secretOrKey);

        // Add user to payload
        req.user = decodedUser;
        
        const user = await User.findById({ _id: decodedUser.id }).select('-password')
        
        return res.status(200).json({ success: true, data: user })
        
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: "Token is not valid" })
    }
}

const updateUser = async (req, res) => {
    const { password, username, oldUsername, type } = req.body

    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ username: oldUsername }, (err, user) => {
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
                user.username = username;
                user.type = type;
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

module.exports = {
    loginUser,
    logoutUser,
    registerUser,
    deleteUser,    
    getAllUser,
    getUser,
    updateUser,
}