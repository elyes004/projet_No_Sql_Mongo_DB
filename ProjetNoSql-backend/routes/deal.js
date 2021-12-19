const express = require('express');
const Announcement = require('../models/announcement.model');
const router = express.Router();
const Deal = require('../models/deal.model');
const User = require('../models/user.model');

// get Deal by id
router.get('/:id', function(req, res, next) {
    Deal.findById(req.params.id, function (err, Deal) {
        if (err) return next(err);
        res.json(Deal);
    });
});
//get deals by sellerId ( the owner id)
router.get('/owner/:id', function(req, res, next) {
    Deal.find({sellerId: req.params.id}, function (err, Deal) {
        if (err) return next(err);
        res.json(Deal);
    });
});
// get all Deals
router.get('/', function(req, res, next) {
    Deal.find({}, function (err, Deal) {
        if (err) return next(err);
        res.json(Deal);
    });
});  

// get my Deals
router.get('/myDeals/:id', async function(req, res, next) {
    const populateQuery = [
        {
            path:'buyerId', 
            model: User
        }, 
        {
            path:'announcementId',
            model: Announcement,
            select:'title type_ann ownerId',
            match: {ownerId: req.params.id}
        }
    ];
    const QUERYRESULT = await Deal.find().populate(populateQuery)
    console.log(QUERYRESULT)
    let dealsList = []
    QUERYRESULT.forEach( deal => {
        dealsList.push({
            firstname: deal.buyerId.firstname,
            lastname: deal.buyerId.lastname,
            phoneNumber: deal.buyerId.phoneNumber,
            announcementTitle: deal.announcementId.title,
            beginDate: deal.beginDate.toString().substring(0, 15),
            duration: deal.duration,
            dealPrice: deal.dealPrice
        })
    });
    
    return res.json(dealsList)

});  

// post Deal
router.post('/', function(req, res, next) {
    

        Deal.create(req.body, function (err, Deal) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json(Deal);
        });
    
});

//update Deal
router.put('/:id', function(req, res, next) {
    Deal.findByIdAndUpdate(req.params.id, {$set: req.body},function (err, Deal) {
        if (err) return res.status(500).send({ message: 'update fail'});
        res.json({
            msg: "successfully updated"
        });
    });
});

//delete Deal
router.delete('/:id', function(req, res, next) {
    Deal.findByIdAndDelete(req.params.id, function (err, Deal) {
        if (err) return res.status(500).send({ message: 'delete fail'});
        res.json({
            Deal : Deal,
            msg: "successfully deleted"
        });
    });
});

module.exports = router;