import express, { json } from 'express';
// eslint-disable-next-line import/extensions
import cors from 'cors';
// eslint-disable-next-line import/extensions
import { allergiessRepository, medicinesRepository } from './database.js';

const allowedOrigins = [ 'http://localhost:5173' ];

const app = express();
app.use(cors({
  origin: allowedOrigins,
}));
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

app.post('/alergiess', async (req, res) => {
  try {
    const allergy = await allergiessRepository.create({
      data: {
        ...req.body,
      }
    });

    res.status(201).send(allergy);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});
app.get('/alergiess', async (req, res) => {
  try {
    const alergiess = await allergiessRepository.findMany();

    res.status(200).send(alergiess);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/calculate', async (req, res) => {
  const {
    age, weight, height, medicine, allergy
  } = req.body;

  const medicineData = await medicinesRepository.findFirst({
    where: {
      id: medicine
    }
  });

  const allergyData = await allergiessRepository.findFirst({
    where: {
      id: allergy
    }
  });

  if (medicineData.age_rule > age) {
    return res.status(422).send({ error: 1, message: 'Too low age.' });
  }

  if (medicineData.max_weight_rule < weight) {
    return res.status(422).send({ error: 2, message: 'Over weight allowed for use.' });
  }

  if (medicineData.min_weight_rule > weight) {
    return res.status(422).send({ error: 3, message: 'Under weight allowed for use.' });
  }

  if (medicineData.min_height_rule > height) {
    return res.status(422).send({ error: 4, message: 'Below the height allowed for use.' });
  }

  if (allergyData && allergyData.medicineId === medicineData.id) {
    return res.status(422).send({ error: 5, message: 'Is allergic to the drug.' });
  }

  return res.status(200).send({ error: 0, message: 'Ok.' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`http://localhost:${port}`);
});

export default app;
