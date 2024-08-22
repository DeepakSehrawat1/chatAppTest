const User = require("../Model/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;

function isstringInvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}
function generateAccessToken(id, name) {
  return jwt.sign(
    { userId: id, name: name },
    "6b64e201b0e7ec99dfce661f082aef021e71468d97966944a694ae0101e7319b"
  );
}

const signUp = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  if (
    isstringInvalid(name) ||
    isstringInvalid(email) ||
    isstringInvalid(phone) ||
    isstringInvalid(password) ||
    isstringInvalid(role)
  ) {
    return res.status(400).json({ err: "Empty Fields" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ err: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRound);
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
      phone: phone,
    });

    return res.status(200).json({ message: "Successfully Signed Up" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (isstringInvalid(email) || isstringInvalid([password])) {
      return res.status(400).json({ err: "Email and Password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ err: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ err: "User not authorized" });
    }

    const token = generateAccessToken(user.id, user.name);

    res.status(200).json({ message: "Login successful", token, id: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  signUp,
  login,
};
