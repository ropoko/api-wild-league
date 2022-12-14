import { Request, Response } from 'express';
import { User } from '../entities/user';
import { IUserRepository } from '../repositories/IUserRepository';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/prisma/userRepository';
import { IMailProvider } from '../providers/IMailProvider';
import { MailProvider } from '../providers/mail/mailProvider';

export class UserController {
	private userRepository: IUserRepository;
	private mailProvider: IMailProvider;

	constructor() {
		this.userRepository = new UserRepository();
		this.mailProvider = new MailProvider();
	}

	async create(req: Request, res: Response) {
		const { nickname, email, password } = req.body as User;

		const userAlreadyExists = await this.userRepository.findByNickname(nickname);

		if (userAlreadyExists) {
			return res.status(409).json('nickname being used');
		}

		const hashed_password = await bcrypt.hash(password, 10);

		const user = new User({nickname, email, password: hashed_password });

		await this.userRepository.create(user);

		await this.mailProvider.sendMail({
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
	}
}
