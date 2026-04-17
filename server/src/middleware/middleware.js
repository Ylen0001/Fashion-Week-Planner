import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Vérifier que le header existe
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    // 2. Vérifier le format "Bearer <token>"
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid authorization format" });
    }

    // 3. Extraire le token
    const token = parts[1];

    // 4. Vérifier le token
    const decoded = jwt.verify(token, SECRET_KEY);

    // 5. Attacher les infos au request
    req.user = decoded;

    // 6. Passer à la suite
    next();

  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};