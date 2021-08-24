const router = require("express").Router();
const isAuth = require("../auth/isAuth");
const Order = require("../../models/order/order");
const Product = require("../../models/product/product");
const Promocode = require("../../models/promocode/promocode");

router.post("/", isAuth, async (req, res) => {
  const user = req.jwt._id;
  const { __id, isDel, promocode } = req.body;
  const order = {
    products: req.body.products,
    amout: req.body.amout,
  };
  const product = await Product.findById(order.products);
  if (product.quanitity < order.amout) {
    return res.status(404).json({ error: "Product wrong!" });
  } else {
    const qty = product.quanitity - order.amout;
    const goods = await Product.updateOne(
      { _id: order.products },
      { $set: { quanitity: qty } }
    );
    total = product.price * order.amout;
  }
  if (req.body.promocode) {
    const sale = await Promocode.findOne({ promoName: promocode });
    if (sale == null) {
      return res.status(404).json({ error: "Такого промокода нет!" });
    } else {
      const count = total * (sale.procent / 100);
      total = total - count;
    }
  }
  await Order.create({ owner: __id, user: user, order, total, isDel })

    .then((order) => {
      return res.json(order);
    })
    .catch((err) => {
      console.error("order.order.post", err);
      return res.sendStatus(400);
    });
});

router.get("/", isAuth, async (req, res) => {
  const id = req.jwt._id;

  await Order.findOne({ user: id })

    .then((order) => {
      return res.json(order);
    })

    .catch((err) => {
      console.error("order.order.get", err);
      return res.sendStatus(400);
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { _id, user, product, isDel } = req.body;

  await Order.updateMany(
    { owner: _id, _id: id },
    { $set: { user, product, isDel } }
  )
    .then((order) => {
      return res.json(order);
    })
    .catch((err) => {
      console.error("Order.Order.put", err);
      return res.sendStatus(400);
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  await Order.deleteOne({ owner: _id, _id: id })
    .then((order) => {
      return res.json(order);
    })
    .catch((err) => {
      console.error("Order.Order.delete", err);
      return res.sendStatus(400);
    });
});

module.exports = router;
