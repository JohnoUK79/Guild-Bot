const sql = require(`../config/Database`)

module.exports = {
    name: 'cacheSweep',
    async execute(cache) {
        console.log(`Cache Sweep:\n${cache}`)
    }
};
