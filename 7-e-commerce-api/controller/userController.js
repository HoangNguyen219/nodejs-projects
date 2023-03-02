const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { use } = require('express/lib/router')

const getAllUsers = async (req, res) => {
    console.log(req.user);
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({ _id: id }).select('-password')
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id ${id}`)
    }
    res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
    res.send('update')
}
const updateUserPassword = async (req, res) => {
    res.send('password')
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}