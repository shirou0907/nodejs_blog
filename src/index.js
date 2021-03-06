require('dotenv').config()

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')

const app = express();
const port = 3000;

const route = require('./routers');
const apirouter = require('./api/router');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname,'../public')));

//Set Environment Variables
app.use(cookieParser(process.env.SEESION_SECERTS));

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

app.use(methodOverride('_method'));

//HTTP logger
// app.use(morgan('combined'))

//Temlate engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    sum: (a,b) => a + b,
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);
apirouter(app);



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
