const express = require('express');
const router = express.Router();
const Visit = require('../models/visit.model');
const Announcement = require('../models/announcement.model');
const User = require('../models/user.model');


// get Visit by id
router.get('/:id', function(req, res, next) {
    Visit.findById(req.params.id, function (err, Visit) {
        if (err) return next(err);
        res.json(Visit);
    });
});
// get my Visits 
router.get('/myVisits/:id',async (req, res, next) => {

    const populateQuery = [ 
        {
            path:'visitor', 
            model: User
        },
        {
            path:'announcement',
            model: Announcement,
            select:'title type_ann ownerId',
            match: {ownerId : req.params.id}
        }
    ];
    const visitorsList = await Visit.find().populate(populateQuery)
    
    return res.json(visitorsList)
    
});

router.get('/myVisitsThisMonth/:id', async (req, res, next) => {
    const currentDate = new Date();

    const populateQuery = [ 
        {
            path:'visitor', 
            model: User
        },
        {
            path:'announcement',
            model: Announcement,
            select:'title type_ann ownerId',
            match: {ownerId : req.params.id}
        }
    ];
    const visitorsList = await Visit.find({visitDate: {$gt: currentDate}})
                                    .sort({visitDate: 'asc'})
                                    .limit(5)
                                    .populate(populateQuery);
    return res.json(visitorsList)
})
// get all Visits
router.get('/', function(req, res, next) {
    Visit.find({}, function (err, Visit) {
        if (err) return next(err);
        res.json(Visit);
    });
});  
// post Visit
router.post('/', function(req, res, next) {
    

        Visit.create(req.body, function (err, Visit) {
            if (err) {
                return next(err);
            }
            res.json(Visit);
        });
    
});

//update Visit
router.put('/:id', function(req, res, next) {
    Visit.findByIdAndUpdate(req.params.id, {$set: req.body},function (err, Visit) {
        if (err) return res.status(500).send({ message: 'update fail'});
        res.json({
            msg: "successfully updated"
        });
    });
});

//delete Visit
router.delete('/:id', function(req, res, next) {
    Visit.findByIdAndDelete(req.params.id, function (err, Visit) {
        if (err) return res.status(500).send({ message: 'delete fail'});
        res.json({
            Visit : Visit,
            msg: "successfully deleted"
        });
    });
});

module.exports = router;