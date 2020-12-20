const express = require('express');
const router = express.Router();

const PostModel =  require('./postModel')
const data = require('./data')

// afficher le contenu de la base de donnée 

router.post('/cree', (req,res)=>{
    const newPost = new PostModel({
        author: req.body.author,
        message: req.body.message,
        
    })
    newPost.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error creating new data : ' + err);
      })

})



         // update (modifier les donnée (put))
    router.put("/:id", (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknow : " + req.params.id)
        
        const updateRecord = {
          author: req.body.author, 
          message: req.body.message
        };
      
        PostsModel.findByIdAndUpdate(
          req.params.id,
          { $set: updateRecord},
          { new: true },
          (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
          }
        )
      });
      
      router.delete("/:id", (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknow : " + req.params.id)
        
        PostsModel.findByIdAndRemove(
          req.params.id,
          (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error : " + err);
          })
     
})

module.exports = router;