const logger = require("../config/logger");
const { authService } = require("../services");

/**
 * *Login a new User
 * @returns {accessToken, refreshToken}
 */
const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);

    return res.status(200).json({
      error: false,
      message: "Login SuccessFully!!",
      result: token,
    });
  } catch (error) {
    logger.error(`controller/auth/login : ${error}`);

    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};

/**
 * * Register a New user
 * @returns
 */
const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    return res.status(202).json({
      error: false,
      message: "User Registered SuccessFully!!",
    });
  } catch (error) {
    logger.error(`controller/auth/register : ${error}`);

    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};

const forgetPassword = (req, res) => {
  try {
  } catch (error) {}
};

const resetPassword = (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  login,
  register,
};
