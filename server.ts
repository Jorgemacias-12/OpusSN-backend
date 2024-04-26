import cors from 'cors';
import express, { type Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { categoryRouter, postRouter, userRouter, commentRouter } from './src/routes';
import swaggerDocument from './build/public/swagger.json'
import { fileURLToPath } from 'bun';
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const app: Express = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'build/public')));

// Disable powered by 
app.disable('x-powered-by');

app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)

app.get('/', (req, res) => {
  res.json({
    message: "API deployment sucessfull"
  });
});


app.listen(PORT, () => {
  console.log(`Express server start on ${PORT}`);
});