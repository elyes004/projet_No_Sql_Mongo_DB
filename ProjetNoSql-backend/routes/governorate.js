const express = require('express');
const router = express.Router();
const Governorate = require('./../models/governorate.model');

/* GET all governorates. */
router.get('/', function(req, res, next) {
    Governorate.find({}, function (err, Governorate) {
        if (err) return next(err);
        res.json(Governorate);
    });
});
/* GET ALL CITIES OF A GOVERNORATE */
router.get('/city/:id', function(req, res, next) {
    Governorate.findById(req.params.id, function (err, governorate) {
        if (err) return next(err);
        res.json(governorate.cities);
    });
})

router.post('/', function(req, res, next) {
    Governorate.create(req.body, function (err, Governorate) {
        if (err) {
            return next(err);
        }
        res.json(Governorate);
    });
})

module.exports = router;