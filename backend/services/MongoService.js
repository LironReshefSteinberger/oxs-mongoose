var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    
    const mongoose = require('mongoose');

    const url = 'mongodb://oxs:oxs123@ds155352.mlab.com:55352/oxs';
    return mongoose.connect(url)
        .then(_ => {
            dbConn = mongoose;
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}
