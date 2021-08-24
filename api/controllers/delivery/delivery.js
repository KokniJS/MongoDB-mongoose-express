const router = require("express").Router();
const Delivery = require("../../models/delivery/delivery");
const isAuth = require("../auth/isAuth");

router.post("/", isAuth, async (req, res) => {
  const user = req.jwt;
  const { __id, order } = req.body;

  await Delivery.create({ owner: __id, user: user, order })
    .then((delivery) => {
      if (user.role == "delivery") {
        return res.json(delivery);
      } else {
        return res.status(401).json({ error: "No permission" });
      }
    })
    .catch((err) => {
      console.error("delivery.delivery.post", err);
      return res.sendStatus(400);
    });
});

router.get("/", async (req, res) => {
  const { __id } = req.body;
  await Delivery.find()
    .populate("order")
    .then((delivery) => {
      return res.json(delivery);
    })
    .catch((err) => {
      console.error("delivery.delivery.get", err);
      return res.sendStatus(400);
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { _id, userId, product, isDel } = req.body;

  await Delivery.update({ owner: _id, _id: id }, { $set: { orders } })
    .then((delivery) => {
      return res.json(delivery);
    })
    .catch((err) => {
      console.error("Delivery.Delivery.put", err);
      return res.sendStatus(400);
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  await Delivery.deleteOne({ owner: _id, _id: id })
    .then((delivery) => {
      return res.json(delivery);
    })
    .catch((err) => {
      console.error("Delivery.Delivery.delete", err);
      return res.sendStatus(400);
    });
});

module.exports = router;
