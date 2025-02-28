import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/student', StudentRoutes);
app.use('/api/v1/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
