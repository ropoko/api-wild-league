import { Router } from 'express';
import { UserController } from './controllers/userController';
// import { authMiddleware } from './middlewares/AuthenticationMiddleware';

const userController = new UserController();

const router = Router()

router.post('/users', userController.create);

export { router }
