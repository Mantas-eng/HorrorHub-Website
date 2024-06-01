  const express = require('express');
  const next = require('next');
  const mongoose = require('mongoose');
  const movieRoutes = require('./Backend/routes/Movies');
  const cors = require('cors');
  const dotenv = require('dotenv');

  dotenv.config();

  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });
  const handle = app.getRequestHandler();

  const PORT = process.env.PORT || 3000;
  const MONGODB_URI = process.env.MONGODB_URI;

  const corsOptions = {
    origin: ['http://localhost:3001', process.env.NEXT_PUBLIC_BACKEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.prepare().then(() => {
    const server = express();

    server.use(cors(corsOptions));
    server.use(express.json());
    server.use(movieRoutes);
    server.options('*', cors(corsOptions));
    server.use((req, res, next) => {
      res.header('Access-Control-Allow-Private-Network', 'true');
      next();
    });
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Connected to MongoDB');
        server.listen(PORT, (err) => {
          if (err) throw err;
          console.log(`Server is running on port ${PORT}`);
        });
      })
      .catch((error) => console.error('Error connecting to MongoDB:', error));

    server.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Internal Server Error');
    });
  });
