import express, { json } from 'express';
// eslint-disable-next-line import/extensions
import { medicinesRepository } from './database.js';
// eslint-disable-next-line import/extensions

const app = express();
app.use(json());
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello World!',
    type: 'success'
  });
});

app.post('/medicines', async (req, res) => {
  try {
    const medicine = await medicinesRepository.create({
      data: {
        ...req.body,
      }
    });

    res.status(201).send(medicine);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/medicines', async (req, res) => {
  try {
    const medicines = await medicinesRepository.findMany();

    res.status(200).send(medicines);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`http://localhost:${port}`);
});

export default app;
