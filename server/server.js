const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

toDoRouter = require('./routes/todolist');
app.use('/todo', toDoRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});