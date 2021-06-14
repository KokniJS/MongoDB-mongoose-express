const mongoose = require('../../../db/db');
const { Schema: {Types: {String,Number}}} = mongoose;


const Promocode = mongoose.Schema({

    promoName: { type: String, required: false},
    procent:  { type: Number , required: false},
 
})

module.exports = mongoose.model('Promocode',Promocode) 