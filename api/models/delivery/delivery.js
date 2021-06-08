const mongoose = require('../../../db/db');
const { Schema: {Types: { ObjectId }}} = mongoose;


const Delivery = mongoose.Schema({
    
    order: {
        type: ObjectId,
        ref: 'Order',
        required: false,
      
    }
   
})

module.exports = mongoose.model('Delivery', Delivery)
