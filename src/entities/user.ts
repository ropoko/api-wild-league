export class User {
	public readonly id: number;

	public nickname: string;
	public email: string;
	public password: string;

	constructor(props: Omit<User, 'id'>) {
		Object.assign(this, props);
	}
}
