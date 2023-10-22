const logger = require("../config/logger");
const { blogService } = require("../services");

/**
 * *Create Structure
 * @param req.body={title , discription, photo(optional)}
 */

const create = async (req, res) => {
  try {
    logger.debug("Create Body :" + JSON.stringify(req.body));

    const newBlog = await blogService.create(req.body);

    return res.status(202).json({
      error: false,
      message: "Blog Added SuccessFully!!",
    });
  } catch (error) {
    logger.error("🚀 ~ file: blog.controller.js:11 ~ create ~ error:", error);

    return res.status(400).json({
      error: true,
      message: "Something went wrong",
    });
  }
};

const find = async (req, res) => {
  try {
    const id = req.params.id;

    logger.debug(`Find By Id:` + id);

    const blog = await blogService.find(id);

    return res.status(200).json({
      error: false,
      message: "Blog Found SuccessFully!!",
      result: blog,
    });
  } catch (error) {
    logger.error("🚀 ~ file: blog.controller.js:28 ~ find ~ error:" + error);

    return res.status(400).json({
      error: true,
      message: "Something went wrong",
    });
  }
};

const findAll = async (req, res) => {
  try {
    const blogs = await blogService.findAll();

    return res.status(200).json({
      error: false,
      message: "Blogs Found SuccessFully!!",
      result: blogs,
    });
  } catch (error) {
    logger.error("🚀 ~ file: blog.controller.js:52 ~ findAll ~ error:", error);

    return res.status(400).json({
      error: true,
      message: "Something went wrong",
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    const body = req.body;

    await blogService.update(id, body);

    return res.status(200).json({
      error: false,
      message: "Blogs Updated SuccessFully!!",
    });
  } catch (error) {
    logger.log("🚀 ~ file: blog.controller.js:74 ~ update ~ error:", error);

    return res.status(400).json({
      error: true,
      message: "Something went wrong",
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const blog = await blogService.remove(id);

    return res.status(200).json({
      error: false,
      message: "Blogs Deleted SuccessFully!!",
    });
  } catch (error) {
    logger.error("🚀 ~ file: blog.controller.js:77 ~ remove ~ error:", error);

    return res.status(400).json({
      error: true,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
};
