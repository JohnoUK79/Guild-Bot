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
            const dest = fs.createWriteStream(`C:/xampp/htdocs/img/Officers/${u.Image}`);
            res.body.pipe(dest);
        }); 
        console.log(u.Image)
    })
    // fetch('http://www.phfamily.co.uk/img/officers/Sergeant_Spanner.png')
    // .then(res => {
    //     const dest = fs.createWriteStream('./Sergeant_Spanner.png');
    //     res.body.pipe(dest);
    // });     
}
}
