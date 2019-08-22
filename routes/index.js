var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
    const sec = [
        {text: 'Testing security!'}
    ];
    res.send(sec);
});
module.exports = router;