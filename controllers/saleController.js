const mongoose = require("mongoose");
const saleModel = require("../schemas/saleSchema");

const getSales = async (req, res) => {
  const user_id = req.user;
  const sales = await saleModel.find({ user_id }).sort({ createdAt: -1 });

  res.json(sales);
};

const postSale = async (req, res) => {
  const { title, price, quantity } = req.body;
  const user_id = req.user;
  // const img = req.file ? req.file.path : "";
  let img = [];
  console.log(req.files);
  if (req.files) {
    req.files.forEach((file) => {
      img.push(file.path);
    });
  }

  const errorData = [];

  if (!title) {
    errorData.push("title");
  }
  if (!price) {
    errorData.push("price");
  }
  if (!quantity) {
    errorData.push("quantity");
  }

  try {
    const sale = await saleModel.create({
      title,
      price,
      quantity,
      img,
      user_id,
    });

    res.json(sale);
  } catch (error) {
    res.status(400).json({ message: error.message, data: errorData });
    console.log(error.message);
  }
};

const getSale = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  const sale = await saleModel.findById(id);

  res.json(sale);
};

const deleteSale = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  const sale = await saleModel.findByIdAndDelete(id);

  res.json(sale);
};

module.exports = { getSales, postSale, getSale, deleteSale };
