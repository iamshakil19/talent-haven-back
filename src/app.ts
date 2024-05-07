import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1/', routes);

// Testing
app.get('/', (req: Request, res: Response) => {
  res.send('✅ Working Successfully');
});

// Global Error Handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
