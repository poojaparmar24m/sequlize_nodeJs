const user = require("../db/models/user");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create_users = async (req, res) => {
  const { user_name, email, password, confirm_password } = req.body;

  try {
    if (!(user_name && email && password && confirm_password)) {
      return res.status(404).json({
        success: false,
        message: "All field reqired !!!",
      });
    }
    if (password !== confirm_password) {
      return res.status(404).json({
        success: false,
        message: "password does not matched",
      });
    }
    const findEmail = await user.findOne({ where: { email } });

    if (findEmail) {
      return res.status(403).json({
        success: false,
        message: "user already exists with this email...",
      });
    }
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);

    const insertUser = await user.create({ user_name, email, password: hash });

    return res.status(200).json({
      success: true,
      message: "user created successfully !",
      insertUser,
    });
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      return res.status(404).json({
        success: false,
        message: "All fields Required !",
      });
    }

    const data = await user.findOne({ where: { email } });
    if (!data) {
      return res.status(403).json({
        success: false,
        message: "user does not exists ! plz create an account...",
      });
    }

    const loginData = await bcrypt.compare(password, data.password);
    if (!loginData) {
      return res.status(404).json({
        success: false,
        message: "password does not matched !",
      });
    }

    const tokan = jwt.sign({ id: data.id }, process.env.JWT_SECRET_KEY);
    return res.status(200).json({
      success: true,
      message: "Login successfully ! ",
      tokan,
    });
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.authToken = async (req, res) => {
  const token = req.headers["authentication"] || req.headers["Authentication"];
  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "unauthorized user !",
      });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return res.status(200).json({
      sucess: true,
      message: "Authorized user ....",
      decodeToken,
    });
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
