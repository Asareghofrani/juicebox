require('dotenv').config();

// remove this once you confirm it works
// console.log(process.env.JWT_SECRET);
// like, seriously. go delete that!

// EVERYTHING ELSE




const PORT = 8000;
const express = require('express');
const { client } = require('./db');
  client.connect();

const server = express();
server.use(express.json());

const bodyParser = require('body-parser');
server.use(bodyParser.json());


const morgan = require('morgan');
server.use(morgan('dev'));

const apiRouter = require('./api');
server.use('/api', apiRouter);



// server.use(express.json())
// server.use((req, res, next) => {
//     console.log("<____Body Logger START____>");
//     console.log(req.body);
//     console.log("<_____Body Logger END_____>");
  
//     next();
//   });
server.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
}); 

server.get('/add/:first/to/:second', (req, res, next) => {
  res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
    Number(req.params.first) + Number(req.params.second)
   }</h1>`);
});

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});