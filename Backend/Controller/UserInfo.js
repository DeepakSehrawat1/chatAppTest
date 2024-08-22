const User = require("../Model/User");
const getUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "status"],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

module.exports = {
  getUser,
};
