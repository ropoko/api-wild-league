import { Router } from 'express';
import { UserController } from './controllers/userController';

const router = Router();

const userController = new UserController();

router.post('/users', userController.create);
router.get('/users', userController.fetchAll);

export { router };
