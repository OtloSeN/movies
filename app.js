const express = require('express');

const app = express();

// Startup requires
require('./startup/db')();
require('./startup/middleware')(app);
require('./startup/routes')(app);

app.listen(3000, () => console.log('Server is running on port 3000...'));