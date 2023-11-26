const sql = require("../config/Database");
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
ImageCache: async function () {
    const unitLinks = await sql.Execute(`SELECT * FROM units WHERE Image NOT LIKE ''`)
    unitLinks.forEach(u => {
        fetch(`http://www.battle-bot.com/img/${u.Image}`)
        .then(res => {
            const dest = fs.createWriteStream(`./img/${u.Image}`);
            res.body.pipe(dest);
        }); 
    })  
}
}
