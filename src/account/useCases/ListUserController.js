import database from '../../../config/database.js';

class ListUserController {
  async handle(request, response) {
    try {
      const users = await database.users.findMany({
        orderBy: {
          username: 'asc'
        }
      });
      return response.status(200).json(users);
    }
    catch(error){
      return response.status(500).json({ error: error.message });
    }
  }
}

export { ListUserController };