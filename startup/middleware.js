const express = require('express');

module.exports = app => {
    app.use(express.json());
    app.use(express.static(`${__dirname}/../public`));
    app.set('view engine', 'pug');
}