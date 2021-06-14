const router = require('express').Router();

const Promocode = require('../../models/promocode/promocode')



router.post('/', async (req, res) => {

    const {__id , promoName, procent } = req.body;


    await Promocode.create({owner:__id, promoName, procent})
    .then(promocode=> {
         return res.json(promocode);
        })
    .catch(err => {
        console.error('promocode.promocode.post', err);
        return res.sendStatus(400);
    });
});

router.get('/', async (req, res) => {
    
  
   const {promoName, procent} = req.body

        await Promocode.find()
    .then(promocode => {
      
        return res.json(promocode);
    
    })
    .catch(err => {
        console.error('promocode.promocode.get', err);
        return res.sendStatus(400);
    });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { _id, promoName, procent  } = req.body;


    await Promocode.updateMany({owner: _id, _id: id}, { $set: {promoName,procent}})
    .then(promocode => {
        return res.json(promocode);
    })
    .catch(err => {
        console.error('promocode.promocode.put', err);
        return res.sendStatus(400);
    });
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
  
    await Promocode.deleteOne({owner: _id, _id: id})
    .then(promocode => {
        return res.json(promocode);
    })
    .catch(err => {
        console.error('promocode.promocode.delete', err);
        return res.sendStatus(400);
    });
});

module.exports = router;
