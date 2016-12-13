var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');

var User = require('./models/user.js')
//执行此行代码前，要保证 mongodb 数据库已经运行了，而且运行在27017


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', function(err){
  console.log('connection failed!', err);
});
db.once('open', function() {
  // var user = new User({username: 'jingli',email:'555@qq.com'});
  // user.save(function(err){
  //   if(err) console.log(err);
  // })

  console.log('success!');
});


app.use(cors());

app.get('/users', function (req, res) {

  User.find().exec(function(err, users) {
    if(err) return console.log(err);
    res.json({users})
  });
});

app.get('/users/:_id', function (req, res) {
  User.findById(req.params._id,function(err,user){
  if(err) return console.log(err);
  console.log(user);
  res.json(user)
})
})
app.listen(4000, function () {

  console.log('Example app listening at 4000');
});
