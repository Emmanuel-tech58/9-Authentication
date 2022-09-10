const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger }= require('./middleware/logEvents');
const {ErrorHandler} = require('./middleware/ErrorHandler');

const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//middleware to enable cross origin resource sharing
app.use(cors(corsOptions));

//buit-in middleware to hand urlencoded form data
app.use(express.urlencoded({extended: false}));

//buit-in middleware to hand json data
app.use(express.json());

//buit-in middleware to serve static files
app.use(express.static(path.join(__dirname, '/public')));

//custom middleware to handle routing
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/employees', require('./routes/api/employees'));

//overall route
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({Error: '404: Page not found'})
    }else{
        res.type('txt').send("404: Page not found")
    }
});

app.use(ErrorHandler);

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));