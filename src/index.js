const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/mevn-database')
    .then(db => console.log('database conectada'))
    .catch(err => console.error(err));


//Setting
app.set('port', process.env.PORT || 3000); // process.env.PORT -> puerto dado por el servidor 

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Static files
app.use(express.static(__dirname + '/public'));

//Routes
app.use('/api/tasks', require('./routes/tasks'));

//Server listening
app.listen(app.get('port'), () => {
    console.log('Servidor Up!', app.get('port'));
});