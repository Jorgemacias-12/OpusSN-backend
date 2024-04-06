import express, { type Express } from 'express';
import morgan from 'morgan'
import helmet from 'helmet';
import cors from 'cors';

const app: Express = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(PORT, () => {
  console.log("Welcome to OpusSN backend project");
  console.log(`Express server start on port ${PORT}`);
});