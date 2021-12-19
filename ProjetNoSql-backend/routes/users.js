const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user.model');
const Announcement = require('../models/announcement.model');
const Deal = require('../models/deal.model');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User ({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    state: req.body.state,
    username: req.body.username,
    password: req.body.password,
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            city: user.city,
            state: user.state,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});



//CRUD
// get User by id
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, User) {
      if (err) return next(err);
      res.json(User);
  });
});
// get all Users
router.get('/', function(req, res, next) {
  User.find({}, function (err, User) {
      if (err) return next(err);
      res.json(User);
  });
}); 
// get my clients
router.get('/clients/:id', function(req, res, next) {

  User.findById(req.params.id, function (err, owner) {
      
      if (err) return next(err);
      let buyers = []
      
      if(owner.deals){
          owner.deals.forEach((deal, index) => {
            User.findById(deal.buyerId, (err, buyer) => {
             if (err) return next(err);
             buyers.push(buyer)
            
             if(index == owner.deals.length -1) {
               res.json(buyers)
             }
           })
          
          });
          
        }
  })      
});
// get my deals
router.get('/myDeals/:id', function(req, res, next){
  
  
  
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(404).send({ message: 'user not found'});
    let dealsInformations = [];
    //console.log(dealsInformations)
    user.deals.forEach( (deal, index) => {
      
      User.findById(deal.buyerId, (err, buyer) => {
        dealsInformations.push(
          {
            beginDate: deal.beginDate.toString().substring(0, 11),
            duration: deal.duration,
            dealPrice: deal.dealPrice, 
            buyerFirstname: buyer.firstname, 
            buyerLastname: buyer.lastname, 
            buyerPhoneNumber: buyer.phoneNumber
          }
        )


        if(index == user.deals.length - 1 ){
          res.json(dealsInformations)
        }
      })
        
    });
  })
})

// post User
router.post('/', function(req, res, next) {
  

      User.create(req.body, function (err, User) {
          if (err) {
              console.log(err);
              return next(err);
          }
          res.json(User);
      });
  
});
// put a deal into a user
router.put('/addDeal/:id', function(req, res, next) {
  const BUYER = {
          buyerId: req.body.buyerId,
          announcementId: req.body.announcementId,
          beginDate: req.body.beginDate,
          duration: req.body.duration,
          dealPrice: req.body.dealPrice
        }

  User.findByIdAndUpdate(
    req.params.id, 
    {
      $push: {
        "deals": BUYER
      }
    },
    {upsert: true, new : true},
    function (err, user) {
      if (err) return res.status(500).send({ message: 'update fail'});
    
      res.json({
        buyer: BUYER,
        msg: "successfully updated"
      });
      
      
  });
});
//update User
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, {$set: req.body},function (err, User) {
      if (err) return res.status(500).send({ message: 'update fail'});
      res.json({
          msg: "successfully updated"
      });
  });
});

//delete User
router.delete('/:id', function(req, res, next) {
  User.findByIdAndDelete(req.params.id, function (err, User) {
      if (err) return res.status(500).send({ message: 'delete fail'});
      res.json({
          User : User,
          msg: "successfully deleted"
      });
  });
});
module.exports = router;
