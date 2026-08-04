const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Campass Server is running',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

module.exports = router;
