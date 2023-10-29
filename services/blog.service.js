// const console = require("../config/console");
const { blogModel } = require("../model");

const create = async (payload) => {
  const newBlog = new blogModel(payload);
  return await newBlog.save();
};

const find = async (id) => {
  const blog = await blogModel.findById(id);
  if (!blog) {
    throw new Error("Blog Not Found");
  }
  return blog;
};

const findAll = async () => {
  const blogs = await blogModel.find();

  if (!blogs) {
    throw new Error("Blogs Not Found");
  }

  return blogs;
};

const update = async (id, payload) => {
  const updatedBlog = await blogModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!updatedBlog) {
    throw new Error("Blog Not Found");
  }
  return updatedBlog;
};

const remove = async (id) => {
  const blog = await blogModel.findByIdAndDelete(id);

  if (!blog) {
    throw new Error("Blog Not Found");
  }
  return blog;
};

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
};
