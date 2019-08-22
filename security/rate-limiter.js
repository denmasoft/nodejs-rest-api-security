const RateLimit = require('express-rate-limit');
const rateLimit = RateLimit({
    windowMs: 30*60*1000,
    max: 50,
    delayMs: 0
});
module.exports = rateLimit;