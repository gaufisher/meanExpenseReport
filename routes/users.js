var router = require('express').Router();
/* GET users listing. */
router.get('/currentuser', function(req, res, next) {
    res.json(req.user);
});

module.exports = router;
