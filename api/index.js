const bodyParser = require('body-parser');
const router = require('express').Router();
router.use(bodyParser.json());
router.use('/auth', require('./controllers/auth/auth'));
router.use('/product',require('./controllers/product/product'));
router.use('/order',require('./controllers/order/order'));
router.use('/delivery',require('./controllers/delivery/delivery'));
router.use('/employee',require('./controllers/employee/employee'));
router.use('/promocode',require('./controllers/promocode/promocode'));
module.exports = router;

