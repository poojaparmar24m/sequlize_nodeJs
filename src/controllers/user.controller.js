const e = require("express");
const user = require("../db/models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getAllData = async (req, res) => {
  try {
    const data = await user.findAll();
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Database is Empty!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get users details...",
      data,
    });
  } catch (error) {
    console.log("errr", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getDataById = async (req, res) => {
  try {
    const {
      params: { id },
      headers: { Authorization, authorization },
    } = req;

    const token = Authorization?.split(" ")[1] || authorization?.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!token || !decodeToken) {
      return res.status(401).json({
        success: false,
        message: "unAuthorized user...",
      });
    }

    const data = await user.findOne({ where: { id: id } });
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "userData does not exists with this id....",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Get userData with Id...",
      data,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "unAuthorized user...",
      });
    }
    console.log("errr", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteDataById = async (req, res) => {
  try {
    const {
      params: { id },
      headers: { Authorization, authorization },
    } = req;

    const token = Authorization?.split(" ")[1] || authorization?.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!token || !decodeToken) {
      return res.status(403).json({
        success: false,
        message: "unAuthorized user ...",
      });
    }
    const data = await user.destroy({ where: { id: id } });
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "userData does not exists with this id....",
      });
    }
    return res.status(200).json({
      success: true,
      message: "delete userData successfully !",
      data,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "unAuthorized user...",
      });
    }
    console.log("errr", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDataById = async (req, res) => {
  try {
    const {
      params: { id },
      headers: { Authorization, authorization },
      body: { user_name, email, password },
    } = req;

    const token = Authorization?.split(" ")[1] || authorization?.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!token || !decodeToken) {
      return res.status(403).json({
        success: false,
        message: "unAuthorized user...",
      });
    }
    const findUser = await user.findOne({ where: { id: id } });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "userdata does not exists with this id ....",
      });
    }
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);

    const data = await user.update(
      { user_name, email, password: hash },
      { where: { id: id } }
    );

    return res.status(200).json({
      success: true,
      message: "userData Updated successfully !",
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "unAuthorized user...",
      });
    }
    console.log("errr", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
