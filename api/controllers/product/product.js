const router = require('express').Router();

const product = require('../../models/product/product');
const Product = require('../../models/product/product')
const isAuth = require('../auth/isAuth')



router.post('/',isAuth, async (req, res) => {
    const user = req.jwt;
    const {__id ,productName , price,  quanitity } = req.body;


    await Product.create({owner:__id, productName ,  user : user ,price,  quanitity})
    .then(product=> {
      if(user.role == "admin"){
            return res.json(product);
            
        }else{
            return res.status(401).json({ error: 'No permission'});
        }
           
    })
  
    .catch(err => {
        console.error('product.product.post', err);
        return res.sendStatus(400);
    });
});

router.get('/', async (req, res) => {
    
  
   const {productName, price, quanitity} = req.body

    console.log()

    await Product.find()
    .then(product => {
      
        return res.json(product);
    
    })
    .catch(err => {
        console.error('product.product.get', err);
        return res.sendStatus(400);
    });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { _id,productName , price,  quanitity  } = req.body;


    await Product.updateMany({owner: _id, _id: id}, { $set: {price,productName,quanitity}})
    .then(product => {
        return res.json(product);
    })
    .catch(err => {
        console.error('Product.Product.put', err);
        return res.sendStatus(400);
    });
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
  
    await Product.deleteOne({owner: _id, _id: id})
    .then(product => {
        return res.json(product);
    })
    .catch(err => {
        console.error('Product.Product.delete', err);
        return res.sendStatus(400);
    });
});

module.exports = router;


