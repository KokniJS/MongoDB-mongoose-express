const mongoose = require('../../../db/db');
const { Schema: {Types: {String, Number }}} = mongoose;


const Admin = mongoose.Schema({
    
    login: { type: String, required: false},
    pass: {type: Number,required: false}

   
})

module.exports = mongoose.model('Admin', Admin)
