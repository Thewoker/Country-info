import express from 'express';
import cors from 'cors';
import countryRoutes from './routes/countryRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', countryRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Country Info API!');
});

export default app;
