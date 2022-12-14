import { PrismaClient } from '@prisma/client';
import { User } from '../../entities/user';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
	private prismaClient: PrismaClient;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	async findByNickname(nickname: string): Promise<User> {
		return await this.prismaClient.user.findFirst({
			where: { nickname: nickname }
		});
	}

	async create(model: User): Promise<void> {
		await this.prismaClient.user.create({
			data: model
		});
	}

	async update(model: User): Promise<void> {
		await this.prismaClient.user.update({
			where: { id: model.id },
			data: model,
		});
	}

	async delete(model: User): Promise<void> {
		await this.deleteById(model.id);
	}

	async deleteById(id: number): Promise<void> {
		await this.prismaClient.user.delete({
			where: { id: id }
		});
	}

	async fetch(): Promise<User[]> {
		return await this.prismaClient.user.findMany();
	}

	async fetchById(id: number): Promise<User> {
		return await this.prismaClient.user.findFirst({
			where: { id: id }
		});
	}
}
