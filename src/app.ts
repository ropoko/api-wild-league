import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

export { app }
