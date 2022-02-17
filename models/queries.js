const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const querySchema = new Schema({
    timestamp: Date,
    ExpireAt: Date,
    Data: String,
    isEncrypted :{
        type:Boolean,
        default:false
    },
    accessList : [{
        ip : String,
        timestamp: Date
    }],
    iv : Buffer
})

module.exports = mongoose.model('Query', querySchema);