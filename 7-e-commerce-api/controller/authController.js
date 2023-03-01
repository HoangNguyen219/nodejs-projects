const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {createJWT} = require('../utils')

const register = async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password})
    const tokenUser = {name: user.name, userId: user._id, role: user.role}
    const token = createJWT(tokenUser)

    const oneDay = 1000 * 60 * 60 * 24

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay) 
    })

    res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}

const login = async (req, res) => {
    res.send('login')
}

const logout = async (req, res) => {
    res.send('logout')
}


module.exports = {
    register,
    login,
    logout
}