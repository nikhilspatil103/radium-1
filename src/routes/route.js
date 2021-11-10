const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

//!-------------------------2nd API---------------------------------------------//

router.get('/movies', function (req, res) {
  
    res.send(["3idiots","welcome","herapheri"])
});

//!--------------------------3rd API--------------------------------------------//

router.get('/movies/:moviesId', function(req,res){
    
     function a(arr){      
        let value=req.params.moviesId
       if(value<arr.length){
              res.send(arr[value]) 
        }else{
              res.send("Please enter valid index")
         }
     }
    res.send(a(["3idiots","welcome","herapheri"]))
})
//!---------------------------4th API-------------------------------------------//

router.get('/flims',function(req,res){
    let movie=[{"id":1,"name":"3idiots"}, {"id":2,"name": "welcome"}, {"id":3,"name":"heraferi"},{"id":4,"name":"run"}]
    res.send(movie)
})

//!---------------------------5th API-------------------------------------------//

router.get('/flims/:flimId', function(req,res){
    let movie=[{"id":1,"name":"3idiots"}, {"id":2,"name": "welcome"}, {"id":3,"name":"heraferi"},{"id":4,"name":"run"}]
    let value=req.params.flimId

    if(value<movie.length){
        res.send(movie[value])
    }else {
       res.send("No movie exists with this id")
    }    

})
module.exports = router; 