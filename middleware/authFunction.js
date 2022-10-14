const jwt = require("jsonwebtoken");
const authModel = require("../schemas/authSchema");

const authFunction = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const { _id: user_id } = await authModel.findOne({ _id }).select("_id");
    req.user = user_id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = authFunction;
