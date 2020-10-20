const mongoose = require('mongoose')

var storeDetails = mongoose.model('storeDetails',
{
    name : {type:String },
    area : {type:String },
    address : {type: String}
},'storeDetails')

module.exports = { storeDetails}