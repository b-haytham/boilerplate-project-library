/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const expect = require('chai').expect;

const Book = require('../models/book.model')

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find(null, '_id title commentCount').then(docs=>{
        
        res.json(docs)
      })  
    })
    
    .post(function (req, res){
      const title = req.body.title;
      //response will contain new book object including atleast _id and title
      const newBook = new Book({
        title,
        comments: [],
        commentCount: 0
      })
      newBook.save().then(doc=>{
        res.json({_id: doc._id, title: doc.title})
      }).catch(er=>{
        res.status(500).json({error: 'something went wrong'})
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany().then(re=>res.json({response: 'complete delete successful'}))
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      const bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findById(bookid).then(doc=>{
        res.json({_id: doc._id, title: doc.title, comments: doc.comments})
      })
    })
    
    .post(function(req, res){
      const bookid = req.params.id;
      const comment = req.body.comment;
      //json res format same as .get
      Book.findOne({_id: bookid}, (err,doc)=>{
        if(err) return res.status(400).json({error: 'something went wrong'})
        if(!doc) return res.status(400).json({response: 'book do not exist'})
        doc.comments.push(comment)
        doc.save().then(doc=>{
          res.json(doc)
        })
      })
    })
    
    .delete(function(req, res){
      const bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndDelete(bookid, ()=>{
        res.json({response: 'delete successful'})
      })
    });
  
};
