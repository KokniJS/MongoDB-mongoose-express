const router = require('express').Router();
const isAuth = require('../auth/isAuth')
const Order = require('../../models/order/order');
const Product = require('../../models/product/product');

router.post('/', isAuth, async  ( req, res) => {
const user = req.jwt._id;
const {__id , isDel } = req.body;
const order = {  
         products :   req.body.products,
         amout     :     req.body.amout    
                };
const product = await Product.findById(order.products);
if(product.quanitity < order.amout){
        return   res.status(404).json({ error: 'Product wrong!'});
}  else {
    const qty  =   product.quanitity - order.amout;
    const result = await Product.updateOne({ _id: order.products}, { $set: {quanitity : qty}})      
    total = product.price * order.amout;
}   
    
    await Order.create({owner:__id, user : user,   order  ,total, isDel})
   
.then(order => {
    return res.json(order);
})
    .catch(err => {
        console.error('order.order.post', err);
        return res.sendStatus(400);
    });
});

router.get('/',isAuth, async (req, res) => {
    const id  = req.jwt._id;

    await Order.findOne({user:id}) 
  
    .then(order=>  {    
    
                return res.json(order)
            })
            
            .catch(err => {
        console.error('order.order.get', err);
        return res.sendStatus(400);
    });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { _id, user , product,  isDel  } = req.body;


    await Order.updateMany({owner: _id, _id: id}, { $set: {user , product,  isDel}})
    .then(order => {
        return res.json(order);
    })
    .catch(err => {
        console.error('Order.Order.put', err);
        return res.sendStatus(400);
    });
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
  
    await Order.deleteOne({owner: _id, _id: id})
    .then(order => {
        return res.json(order);
    })
    .catch(err => {
        console.error('Order.Order.delete', err);
        return res.sendStatus(400);
    });
});

module.exports = router;


