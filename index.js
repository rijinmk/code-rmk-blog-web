var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');  
var app = express(); 

mongoose.connect('mongodb://localhost/rmkblog'); 

var blogSchema = mongoose.Schema({
  title: String, 
  blog: String,
  cimg: String, 
  dp: String, 
}); 

var Blog = mongoose.model('blog', blogSchema);

// Blog.create({title: "Test Blog", blog: "aksjdhalksjdhalskdjh"}, function(err, data){
//   if(!err){
//     console.log(data); 
//   }else{
//     console.log(err);
//   }
// });  

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/blogs', function(req, res){
  Blog.find({}, function(err, data){
    if(!err){
      console.log(data);
      res.render('index.ejs', {data: data}); 
    }else{
      console.log(err); 
    }
  }); 
});

app.get('/blogs/new', function(req, res){
  res.render('new.ejs'); 
});

app.post('/blogs', function(req, res){
  var data = req.body;
  Blog.create(data, function(err, data){
    if(!err){
      res.redirect('/blogs'); 
    }else{
      console.log(err);
      res.send('Error'); 
    }
  });  
}); 

app.get('/blogs/:id', function(req, res){
  Blog.find({_id: req.params.id}, function(err, data){
    if(!err){
      res.render('show.ejs',{data: data[0]});
      console.log(data);
    }else{
      console.log(err);
      res.send('Error'); 
    }
  }); 
}); 

app.listen(3000, function(){
  console.log('Listening at port 3000');
});   