const logger = require("../config/logger");
const { userService } = require("../services");

const create = async (req, res) => {
  try {
  } catch (error) {}
};

const find = async (req, res) => {
  try {
  } catch (error) {}
};

/**
 * * Find All Users
 * @returns {result:[all users``]}
 */
const findAll = async (req, res) => {
  try {
    const users = await userService.findAll();
    return res.status(200).json({
      error: false,
      message: "All User Fetch Sucessfully",
      result: users,
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
  } catch (error) {}
};
const remove = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
};
