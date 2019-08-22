const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const nosniff = require('dont-sniff-mimetype');
const morgan = require('morgan');
const RateLimiter = require('./rate-limiter');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
// Remove default x-powered-by response header
app.disable("x-powered-by");
app.use(helmet());
// Prevent opening page in frame or iframe to protect from clickjacking
app.use(helmet.xframe());
// Forces browser to only use the Content-Type set in the response header instead of sniffing or guessing it
app.use(nosniff());
app.use(morgan('combined'));
app.use(RateLimiter);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/api/v1/', routes);

module.exports = app;
