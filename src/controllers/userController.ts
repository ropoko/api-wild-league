import { Request, Response } from 'express';
import { User } from '../entities/user';
import { IUserRepository } from '../repositories/IUserRepository';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/prisma/userRepository';

export class UserController {
	private userRepository: IUserRepository;

	constructor() {
		this.userRepository = new UserRepository();
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
	}
}
