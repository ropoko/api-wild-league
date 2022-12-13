
import { User } from '../entities/user';
import { IRepository } from './IRepository';

export interface IUserRepository extends IRepository<User> {
	findByNickname(nickname: string): Promise<User>;
}
