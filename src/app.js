import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// routes
app.use(routes);
app.use((req, res, next) => {
  res.status(404).json({ msg: 'endpoint not found' });
});

export default app;
