const authModel = require("../schemas/authSchema");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// signup
const Signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.signup(email, password);

    // create token
    const token = createToken(user._id);

    res.json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.login(email, password);
    // create token
    const token = createToken(user._id);

    res.json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { Login, Signup };
