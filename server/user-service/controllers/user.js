import User from "../models/user.js";

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(400, "User doesn't exist with this ID"));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(400, "User doesn't exist with this ID"));

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(400, "User doesn't exist with this ID"));

    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });

    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  console.log("HI");
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export { findUserById, deleteUserById, updateUserById, getAllUsers };
