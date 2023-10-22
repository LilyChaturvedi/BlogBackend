const { userModel } = require("../model");
const bcrypt = require("bcryptjs");
const { getJwtAccessToken, getJwtRefreshToken } = require("./token.service");

/**
 * *Login a new User
 * @param {object} payload => {email:String, password:String}
 */
const login = async (payload) => {
  const userExists = await userModel.findOne({ email: payload.email });

  if (!userExists) {
    throw new Error("No User Register with this email id exists");
  }

  if (!comparePassword(payload.password, userExists.password)) {
    throw new Error("Invalid Credentials!!");
  }

  const accessToken = getJwtAccessToken({
    id: userExists._id,
    email: userExists.email,
  });

  const refreshToken = getJwtRefreshToken({
    id: userExists._id,
    email: userExists.email,
  });

  return { accessToken, refreshToken };
};

/**
 * *Create a New User
 * @param {Object} payload = >{firstName:String, lastName:String, email:String, password:String }
 * @returns {Object} New User
 */
const register = async (payload) => {
  // *Check if the user Already exits
  const userExists = await userModel.findOne({ email: payload.email });

  if (userExists) {
    throw new Error("User Already Exists!!");
  }

  payload["password"] = getHashedPassword(payload.password); // *Generate Hashed Password

  const newUser = new userModel(payload); // *Add new User

  return await newUser.save();
};

/**
 * * Returns Encrypted Password
 * @param {String} password
 */
const getHashedPassword = (password) => {
  const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
  return bcrypt.hashSync(password, salt);
};

/**
 * * Compare the encrypted password and the normal string password
 * @param {String} password
 * @param {String} hashedPassword
 * @returns Boolean
 */
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
module.exports = {
  login,
  register,
};
