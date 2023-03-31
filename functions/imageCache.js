const sql = require("../config/Database");
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
officerImageCache: async function () {
    const officerLinks = await sql.Execute(`SELECT * FROM officers WHERE Image NOT LIKE ''`)
    console.log(officerLinks[0].Image)
    officerLinks.forEach(u => {
        fetch(`http://www.phfamily.co.uk/img/officers/${u.Image}`)
        .then(res => {
            const dest = fs.createWriteStream(`./img/${u.Image}`);
            res.body.pipe(dest);
        }); 
        console.log(u.Image)
    })  
},
unitImageCache: async function () {
    const unitLinks = await sql.Execute(`SELECT * FROM units WHERE Image NOT LIKE ''`)
    console.log(unitLinks[0].Image)
    unitLinks.forEach(u => {
        fetch(`http://www.phfamily.co.uk/img/units/${u.Image}`)
        .then(res => {
            const dest = fs.createWriteStream(`./img/${u.Image}`);
            res.body.pipe(dest);
        }); 
        console.log(u.Image)
    })  
}
}
