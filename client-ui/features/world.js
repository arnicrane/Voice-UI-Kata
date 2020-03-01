// Dependencies
const { setWorldConstructor } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./support/scope');

// Web App Dependencies
const express = require('express');
const httpShutdown = require('http-shutdown');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Listen on the port
const webServer = httpShutdown(app.listen(3000, () => {
    console.log(`The Web-App is started and served on port 3000`);
}));

webServer.host = `http://localhost:3000`;

const World = function () {
    scope.host = webServer.host;
    scope.driver = puppeteer;
    scope.context = {};
    scope.web = webServer;
};

setWorldConstructor(World);
