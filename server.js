const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config.json');
const LIST = require('./models/todolist')

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@sophiecluster-lhxyp.mongodb.net/toDoList?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;
  db.on('error',console.error.bind(console, 'connection error'));
  db.once('open',function(){
    console.log("we're connected!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use(function(req,res,next){
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.get('/',function(req,res){
  res.send('Welcome to my product API. Use endpoints to filter our the data');
})


app.post('/list',function(req,res){
  const list = new LIST({
    _id: new mongoose.Types.ObjectId(),
    list: req.body.list,
    dueDate: req.body.dueDate
  });
  console.log(list);
  list.save().then(result =>{
    res.send(result)
  }).catch(err => res.send(err))
});


app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`);
});
