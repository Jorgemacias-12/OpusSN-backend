import cors from 'cors';
import express, { type Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { categoryRouter, postRouter, userRouter, commentRouter } from './src/routes';
import swaggerDocument from './build/public/swagger.json'
import { fileURLToPath } from 'bun';
import { dirname, join } from 'path'
import https from 'https'
import http from 'http';
import { PORTS, RESPONSE_CODES } from './src/types';
import { loadSSLFile } from './src/utils';

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

app.get('/', (_req, res) => {
  res.status(RESPONSE_CODES.OK).json({
    message: "Welcome to Opus REST API"
  });
})

const options = {
  key: await loadSSLFile(process.env.SSL_KEY_PATH as string),
  cert: await loadSSLFile(process.env.SSL_CERTIFICATE_PATH as string)
}

const insecureServer = http.createServer(app);
const server = https.createServer(options, app);

if (process.env.NODE_ENV === 'development') {
  insecureServer.listen(PORT as number, '0.0.0.0', () => {
    console.log(`Development server running on http://localhost:${PORT}`);
  });
}
else {
  server.listen(PORTS.SECURE_WEB_TRAFFIC, () => {
    console.log(`SSL running on ${PORTS.SECURE_WEB_TRAFFIC}}`);
  })
  
  server.listen(PORT, () => {
    console.log(`HTTPS backend API server running on port ${PORT}`)
  });
}