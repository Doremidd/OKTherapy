var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 3001;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../frontend/dist/index.html'));
    }
);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});

module.exports = app;
