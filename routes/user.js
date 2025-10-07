const express = require('express');
const router = express.Router();
const _ = require('lodash');

// Vulnerable endpoint: eval (SAST will detect)
router.post('/login', (req, res) => {
  const { code } = req.body;
  try {
    // intentionally vulnerable for demo only
    eval(code);
    res.send("Code executed");
  } catch (err) {
    res.status(500).send("Error");
  }
});

// Vulnerable endpoint: reflected XSS (for DAST)
router.get('/greet', (req, res) => {
  const name = req.query.name || "Guest";
  // intentionally returning unsanitized input for demo
  res.send(`<h1>Hello ${name}</h1>`);
});

module.exports = router;
