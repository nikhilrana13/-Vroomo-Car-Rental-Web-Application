
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("Header:", req.headers.authorization); 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized no token provided" });
  }
  try {
    const token = authHeader.split(" ")[1];
    // console.log("Verifying with:", process.env.JWT_SECRET); 
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    // console.log("decoded",decoded)
    req.user = decoded.id;
    // console.log("req.user",req.user)
    // for user and owner role
    req.role = decoded.role;
    // console.log("req.role",req.role)
    next();
  } catch (error) {
    console.log("error in isAuth middleware", error);
    return res.status(500).json({ message: "please login" });
  }
};
