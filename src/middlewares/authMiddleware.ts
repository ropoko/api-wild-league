import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['x-access-token'] as string;

	if (!token) {
		return res.status(400).send({ message: 'invalid token' });
	}

	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);

		if (!decoded) {
			return res.status(401).send();
		}

	} catch (error) {
		if (error instanceof TokenExpiredError) {
			return res.status(401).send();
		}

		throw error;
	}

	return next();
};

export { authMiddleware };
