const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const authSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// signup
authSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All input fields must be filled!");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email has already been used!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!");
  }

  //   encrypt the password
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// login
authSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All input fields must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email is incorrect!");
  }

  const pass = await bcrypt.compare(password, user.password);

  if (!pass) {
    throw Error("Password is incorrect!");
  }

  return user;
};

const authModel = mongoose.model("User", authSchema);

module.exports = authModel;
