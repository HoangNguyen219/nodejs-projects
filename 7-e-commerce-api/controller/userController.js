

const getAllUsers = async (req, res) => {
    res.send('all')
}

const getSingleUser = async () => {
    res.send('single')
}

const showCurrentUser = async () => {
    res.send('current')
}

const updateUser = async () => {
    res.send('update')
}
const updateUserPassword = async () => {
    res.send('password')
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}