const sql = require(`../config/Database`)

module.exports = {
    name: 'rateLimit',
    async execute(rateLimitData) {
        console.log(rateLimitData)
    }
};
