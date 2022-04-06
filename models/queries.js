const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const querySchema = new Schema({
    timestamp: Date,
    ExpireAt: Date,
    Data: String,
    isEncrypted: {
        type: Boolean,
        default: false
    },
    accessList: [{
        ip: String,
        timestamp: Date
    }],
    url: String,
    isUrl: Boolean,
    isYoutube: {
        type: Boolean,
        default: false
    },
    embed: String,
    iv: Buffer
})

module.exports = mongoose.model('Query', querySchema);