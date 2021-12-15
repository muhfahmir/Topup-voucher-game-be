const Payment = require("./models");
const Bank = require("../bank/models");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate("banks");
      res.render("admin/payment/view_payment", {
        payment,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },

  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render("admin/payment/create", { banks });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { banks, type } = req.body;

      let payment = await Payment({ banks, type });
      await payment.save();
      req.flash("alertMessage", "Berhasil tambah payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const payment = await Payment.findOne({ _id: id }).populate("banks");
      const banks = await Bank.find();

      res.render("admin/payment/edit", {
        payment,
        banks,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { banks, type } = req.body;

      await Payment.findOneAndUpdate({ _id: id }, { banks, type });
      req.flash("alertMessage", "Berhasil ubah payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.findOneAndRemove({ _id: id });
      // console.log(category);
      req.flash("alertMessage", "Berhasil hapus payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },
};
