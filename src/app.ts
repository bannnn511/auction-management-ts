import express from 'express';
import loaders from './loader';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

loaders({ app, server });
