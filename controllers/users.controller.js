const Users = require("../models/user.model");
const { httpStatus, httpMessage } = require("../utils/httpStatus");
const { generateJWT, generateRefreshJWT } = require("../utils/generateJWT");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const multer = require("multer");
const getUsers = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  try {
    const users = await Users.find(
      {},
      { password: false, confirmPassword: false },
    )
      .skip(skip)
      .limit(limit);
    res.status(httpStatus.OK).json({
      message: httpMessage.SUCCESS,
      data: { users },
      total: users.length,
      page,
      limit,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.ERROR,
      data: null,
      error: err.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
      role,
      avatar = req.file ? req.file.filename : "uploads/man.png",
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: httpMessage.PASSWORD_MISMATCH,
        data: null,
        error: null,
      });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: httpMessage.EMAIL_ALREADY_EXISTS,
        data: null,
        error: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await Users.create({
      name,
      email,
      phone,
      avatar: avatar,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      role: role || "user",
    });
    const token = await generateJWT(email, user._id, user.role);
    const refreshToken = await generateRefreshJWT(email, user._id, user.role);

    const savedUser = user.toObject();
    delete savedUser.password;
    delete savedUser.confirmPassword;

    res.status(httpStatus.OK).json({
      message: httpMessage.SUCCESS,
      data: savedUser,
      token: token,
      refreshToken: refreshToken,
      expiresIn: "1h",
      refreshExpiresIn: "7d",
      error: null,
    });
    user.save();
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.ERROR,
      data: null,
      error: err.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password, confirmPassword, role, avatar } =
      req.body;
    const user = await Users.findById(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: httpMessage.USER_NOT_FOUND,
        data: null,
        error: null,
      });
    }
    if (password !== undefined || confirmPassword !== undefined) {
      if (password !== confirmPassword) {
        return res.status(httpStatus.BAD_REQUEST).json({
          message: httpMessage.PASSWORD_MISMATCH,
          data: null,
          error: null,
        });
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
      user.confirmPassword = hashedPassword;
    }
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (role !== undefined) user.role = role;
    if (avatar !== undefined) user.avatar = avatar;
    await user.save();
    const savedUser = user.toObject();
    delete savedUser.password;
    delete savedUser.confirmPassword;
    res.status(httpStatus.OK).json({
      message: httpMessage.SUCCESS,
      data: savedUser,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.ERROR,
      data: null,
      error: err.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: httpMessage.USER_NOT_FOUND,
        data: null,
        error: null,
      });
    }
    res.status(httpStatus.OK).json({
      message: httpMessage.USER_DELETED,
      data: null,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.INTERNAL_SERVER_ERROR,
      data: null,
      error: err.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!email || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: httpMessage.EMAIL_OR_PASSWORD_REQUIRED,
        data: null,
        error: null,
      });
    }
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: httpMessage.USER_NOT_FOUND,
        data: null,
        error: null,
      });
    }
    if (!matchedPassword) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: httpMessage.INVALID_PASSWORD,
        data: null,
        error: null,
      });
    }
    if (user && matchedPassword) {
      const savedUser = user.toObject();
      delete savedUser.password;
      delete savedUser.confirmPassword;
      const token = await generateJWT(email, user._id, user.role);
      const refreshToken = await generateRefreshJWT(email, user._id, user.role);
      return res.status(httpStatus.OK).json({
        message: httpMessage.LOGIN_SUCCESS,
        data: savedUser,
        token,
        refreshToken,
        expiresIn: "1h",
        refreshExpiresIn: "7d",
        error: null,
      });
    }
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.ERROR,
      data: null,
      error: err.message,
    });
  }
};

module.exports = { getUsers, register, login, updateUser, deleteUser };
