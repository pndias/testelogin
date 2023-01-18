import database from "../../../config/database.js";
import config from "../../../config/index.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

class AuthenticationController {
  async handle(request, response) {
    try {
      const { username, password } = request.body;
      const user = await database.users.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        return response.status(401).json({ error: "User not found" });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return response.status(401).json({ error: "Incorrect password" });
      }

      const token = jwt.sign({}, config.tokenSecret, {
        subject: user.id,
        expiresIn: "1d",
      });

      return response.json(token);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

export { AuthenticationController };
