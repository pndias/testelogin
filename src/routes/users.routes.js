import { Router } from 'express';
import { ListUserController } from "../account/useCases/ListUserController.js";
import { CreateUserController } from "../account/useCases/CreateUserController.js";
import { AuthenticationController } from "../account/useCases/AuthenticationController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
const usersRoutes = Router();

const listUserController = new ListUserController();
const createUserController = new CreateUserController();
const authenticationController = new AuthenticationController();

usersRoutes.get("/", ensureAuthenticated, listUserController.handle);
usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/login", authenticationController.handle);
export { usersRoutes };