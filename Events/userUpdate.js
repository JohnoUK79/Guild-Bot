
module.exports = {
    name: 'userUpdate',
    async execute(oldUser, newUser) {
        console.log(`User Updated:`)
        console.log(oldUser, newUser)
    }
};
