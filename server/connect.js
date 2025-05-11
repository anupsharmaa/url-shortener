const mongoose = require("mongoose")

async function connect_mongo(url){
        // mongo connection
    return  mongoose.connect(url)
}

module.exports = { connect_mongo}