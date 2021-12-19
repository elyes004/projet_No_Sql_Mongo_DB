const express = require('express');
const router = express.Router();
const City = require('./../models/city.model');

/* GET all CITIES. */
router.get('/', function(req, res, next) {
    City.find({}, function (err, City) {
        if (err) return next(err);
        res.json(City);
    });
});
/* GET ALL CITIES OF A governorate */
router.get('/:gov', function(req, res, next) {
    City.find( {governorate: req.params.gov} , function (err, City) {
        if (err) return next(err);
        res.json(City);
    });
})
//POST A CITY
router.post('/', function(req, res, next) {
    City.create(req.body, function (err, City) {
        if (err) {
            return next(err);
        }
        res.json(City);
    });
})

module.exports = router;