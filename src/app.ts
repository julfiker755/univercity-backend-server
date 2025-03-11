import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/errors/globalErrorhandler';
import NotFound from './app/middleware/not-found';
import router from './app/routes';
const app: Application = express();
import cors from 'cors';

app.use(express.json());
app.use(cors());

app.use('/api/v1',router);


// app.get('/', (req, res) => {
//    Promise.reject()
// });

app.use(NotFound)
app.use(globalErrorHandler)

export default app;
