import { createError } from "../error.js";

export const validUser = async (req, res, next) => {
  if (req.user._id != req.params.id) {
    return next(
      createError(400, "You are not authorized to delete this account.")
    );
  }
  next();
};
