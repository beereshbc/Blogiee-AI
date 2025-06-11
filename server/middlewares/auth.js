import jwt from "jsonwebtoken";

const Auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    res.json({ success: false, message: "token is incorrect " });
  }
};

export default Auth;
