const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
app.use(express.static('dist'));

// Add middleware for http proxying
const apiProxy = proxy('/api', { target: process.env.PROXY });
app.use('/api', apiProxy);

// Render your site
const renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
};
app.get('/*', renderIndex);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
