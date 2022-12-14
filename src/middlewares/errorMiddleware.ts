import { Request, Response } from 'express';

const errorMiddleware = (err: Error, req: Request, res: Response) => {
	res.status(500).send({
		code: err.name,
		description: err.message
	});
};

export { errorMiddleware };
