
const {BadRequestError} = require('../errors');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ msg: 'created', token });
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello ${req.user.username}`, secret: `number ${luckyNumber}` });

}

module.exports = {
    login,
    dashboard
}