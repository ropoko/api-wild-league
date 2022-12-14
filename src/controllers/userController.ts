import { Request, Response } from 'express';
import { User } from '../entities/user';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/prisma/userRepository';
import { MailProvider } from '../providers/mail/mailProvider';

export class UserController {
	async create (req: Request, res: Response) {
		const { nickname, email, password } = req.body as User;

		const userRepository = new UserRepository();

		const userAlreadyExists = await userRepository.findByNickname(nickname);

		if (userAlreadyExists) {
			return res.status(409).json({ error: 'nickname already used' });
		}

		const hashed_password = await bcrypt.hash(password, 10);

		const user = new User({ nickname, email, password: hashed_password });

		await userRepository.create(user);

		const mailProvider = new MailProvider();

		await mailProvider.sendMail({
			to: {
				email,
				name: nickname
			},
			from: {
				email: 'rodrigostramantinoli@gmail.com',
				name: 'Wild League Devs'
			},
			subject: 'Welcome to Wild League',
			body: '<p>Soon you will be able to try the game in the alpha version</p>'
		});

		return res.status(201).json(user);
	}
}
