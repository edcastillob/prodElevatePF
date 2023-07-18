const { Router } = require("express");

const router = Router();


router.get('/', function(req, res) {
    res.send('Backend prodElevate');
  })
  

module.exports = router;
