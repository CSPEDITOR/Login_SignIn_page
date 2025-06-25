const bcrypt = require("bcrypt");
const UserModel = require("../Models/Users");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Signup body:", req.body);
    console.log("Login body:", req.body);

    // Basic field validation (optional but useful)
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can not login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new UserModel({ name, email, password: hashedPassword });
    await userModel.save();

    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic field validation (optional but useful)
    // if (!name || !email || !password) {
    //     return res.status(400).json({ message: "All fields are required", success: false });
    // }

    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    const ispassEqual = await bcrypt.compare(password, user.password);
    // console.log("Password match:", ispassEqual);
    if (!ispassEqual) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login1 successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
