/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(`${__dirname}/build`));
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server started + ${port}`);
