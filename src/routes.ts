import { Router } from 'express';
import { UserController } from './controllers/userController';
import { MailProvider } from './providers/mail/mailProvider';
import { UserRepository } from './repositories/prisma/userRepository';
// import { authMiddleware } from './middlewares/AuthenticationMiddleware';

const router = Router();

const userRepository = new UserRepository();
const mailProvider = new MailProvider();

const userController = new UserController(userRepository, mailProvider);

router.post('/users', userController.create);

export { router };
