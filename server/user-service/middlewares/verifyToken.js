import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = (req, res, next) => {
  //   console.log(req.body);
  const cookies = req.cookies;
  console.log(req.cookies);
  if (!cookies || !cookies.access_token){
    console.log("You are not Authenticated")
    return next(createError(401, "You are not Authenticated"));
  }
  
  const token = cookies.access_token;
  console.log(token);

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};
