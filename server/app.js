const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet')
const compression = require('compression')
const session = require("express-session");
const  MongoStore  = require("connect-mongo")(session);
const mongoose = require('mongoose')
const cors = require("cors")

const indexRouter = require('./routes/index');

const app = express();

app.use(cors())
app.use(helmet())
app.use(compression({ filter: shouldCompress }))
app.use(session({
    secret: 'HaRILab_Interview',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req,res,next)=>{
//   console.log(req.session)
//   console.log(req.headers)
//   next()
// })
app.use('/api/', indexRouter);

module.exports = app;

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}
