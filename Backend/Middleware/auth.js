const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token not provided" });
    }

    const user = jwt.verify(
      token,
      "6b64e201b0e7ec99dfce661f082aef021e71468d97966944a694ae0101e7319b"
    );

    try {
      const foundUser = await User.findByPk(user.userId);
      if (!foundUser) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }
      req.user = foundUser;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = {
  authenticate,
};
