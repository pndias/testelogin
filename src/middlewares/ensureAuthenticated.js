import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import database from "../../config/database.js"
export function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = jwt.verify(token, config.tokenSecret)

    const user = database.users.findUnique({
      where: {
        id: sub
      }
    })

    if(!user) {
      return response.status(401).json({ error: "User not found" })
    }

    request.user = {
      id: sub
    }

    return next();
  }
  catch(error) {
    return response.status(401).json({ error: "Invalid token" });
  }
}