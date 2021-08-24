const router = require("express").Router();

const employee = require("../../models/employee/employee");
const Employee = require("../../models/employee/employee");

router.post("/", async (req, res) => {
  const { __id, deliverys } = req.body;

  await Employee.create({ owner: __id, deliverys })

    .then((employee) => {
      return res.json(employee);
    })
    .catch((err) => {
      console.error("employee.employee.post", err);
      return res.sendStatus(400);
    });
});

router.get("/", async (req, res) => {
  const { __id } = req.body;
  await Employee.find()
    .populate("delivery")
    .then((employee) => {
      return res.json(employee);
    })
    .catch((err) => {
      console.error("employee.employee.get", err);
      return res.sendStatus(400);
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { _id, deliverys } = req.body;

  await Employee.update({ owner: _id, _id: id }, { $set: { deliverys } })
    .then((employee) => {
      return res.json(employee);
    })
    .catch((err) => {
      console.error("Employee.Employee.put", err);
      return res.sendStatus(400);
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  await Employee.deleteOne({ owner: _id, _id: id })
    .then((employee) => {
      return res.json(employee);
    })
    .catch((err) => {
      console.error("Employee.Employee.delete", err);
      return res.sendStatus(400);
    });
});

module.exports = router;
