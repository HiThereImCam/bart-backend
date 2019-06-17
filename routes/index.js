const fs = require('fs');


module.exports = (app) => {
    fs.readdirSync(`${__dirname}/api`).forEach((file) => {
        require(`./api/${file.substring(0,file.indexOf('.'))}`)(app);
    });
};

