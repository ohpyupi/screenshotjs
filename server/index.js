const path = require('path');
const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const server = express();
const PORT = 3000;

server.engine('html', es6Renderer);
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'html');
server.use('/dist', express.static(path.join(__dirname, '../dist')));

server.get('/', (req, res) => {
    res.render('index');
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})