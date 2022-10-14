const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    img: {
      type: [String],
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const saleModel = mongoose.model("sale", saleSchema);

module.exports = saleModel;
