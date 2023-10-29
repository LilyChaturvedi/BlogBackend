const jwt = require("jsonwebtoken");
const { userModel } = require("../model");

export const authMiddleware = async () => {
  try {
    // check if token is present
    console.log(
      "🚀 ~ file: authMiddleware.js:10 ~ exports.isValidUser= ~  req.headers.authorization:",
      req.headers.authorization
    );
    if (
      !req.headers.authorization ||
      req.headers.authorization.split(" ").length == 0
    ) {
      return res.status(401).json({
        success: false,
        result: null,
        message: "No authentication token, authorization denied.",
        jwtExpired: true,
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        result: null,
        message: "No authentication token, authorization denied.",
        jwtExpired: true,
      });
    }

    // check if token is valid
    const isverified = jwt.verify(token, process.env.JWT_SCERET_KEY);
    if (!isverified) {
      return res.status(401).json({
        success: false,
        result: null,
        message: "Token verification failed, authorization denied.",
        jwtExpired: true,
      });
    }

    // check if the user exists
    const user = await userModel.findById(isverified.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        result: null,
        message: "User doens't Exist, authorization denied.",
        jwtExpired: true,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      result: null,
      message: error.message,
      error: error,
    });
  }
};
