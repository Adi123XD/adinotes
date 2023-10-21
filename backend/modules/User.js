const mongoose = require('mongoose');
const {Schema} = mongoose
const UserSchema = new Schema({
    name: {
        type: String,
        reqiured: true
    },
    email: {
        type: String,
        reqiured: true,
        unique: true
    },
    password: {
        type: String,
        reqiured: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports=mongoose.model('user',UserSchema);