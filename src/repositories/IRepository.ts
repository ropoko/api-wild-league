export interface IRepository<T> {
	create(model: T): Promise<void>;
	update(model: T): Promise<void>;
	delete(model: T): Promise<void>;
	deleteById(id: number): Promise<void>;
	fetch(): Promise<T[]>;
	fetchById(id: number): Promise<T>;
}
