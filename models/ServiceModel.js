const mongoose = require("mongoose");

module.exports = mongoose.model("servicesData", {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageFile: {
    type: String,
    required: true,
  },
  servicetype: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
});

// const { Schema } = mongoose;

// const ServiceSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   number: { type: Number, required: true },
// });

// const userModel = mongoose.model("aarshdata", ServiceSchema);

// module.exports = userModel;
