import database from '../../../config/database.js';
import { hash } from 'bcrypt';

class CreateUserController {
  async handle(request, response) {
    const { username, password } = request.body;

    try {
      const userAlreadyExists = await database.users.findFirst({
        where: {
          username
        }
      })

      if(userAlreadyExists) {
        return response.status(400).json({
          message: 'User already exists.'
        })
      }

      const passwordHash = await hash(password, 8);

      const user = await database.users.create({
        data: {
          username,
          password: passwordHash,
        }
      })
      
      return response.status(201).json(user);
    }
    catch(error){
      return response.status(500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}

export { CreateUserController };