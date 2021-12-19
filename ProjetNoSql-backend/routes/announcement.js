var express = require('express');
var router = express.Router();
var multer  = require('multer');
var Announcement = require('../models/announcement.model');

// Save file to server storage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

// get announcement by id
router.get('/:id', function(req, res, next) {
    Announcement.findById(req.params.id, function (err, announcement) {
        if (err) return next(err);
        res.json(announcement);
    });
});
// get all announcements
router.get('/', function(req, res, next) {
    Announcement.find({}, function (err, announcement) {
        if (err) return next(err);
        res.json(announcement);
    });
});  
// GET the announcements of an Owner
router.get('/owner/:id', function(req, res, next) {
    Announcement.find({ownerId: req.params.id}, function (err, announcement) {
        if (err) return next(err);
        res.json(announcement);
    });
}); 
// post announcement
var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])
router.post('/', cpUpload, function(req, res, next) {
    if(!req.files) {
        return res.status(500).send({ message: 'Upload fail'});
    } else {
        const files = req.files;
        req.body.imageUrl = 'http://localhost:3000/images/' + files['image'][0].filename;

        req.body.secondaryImagesUrl = []
        files['images'].forEach(file => {
            req.body.secondaryImagesUrl.push('http://localhost:3000/images/' + file.filename)
        });
        
        Announcement.create(req.body, function (err, announcement) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json(announcement);
        });
    }
});

//update announcement
router.put('/:id', function(req, res, next) {
    Announcement.findByIdAndUpdate(req.params.id, {$set: req.body},function (err, announcement) {
        if (err) return res.status(500).send({success: true, message: 'update fail'});
        res.json({
            success: true,
            message: "successfully updated"
        });
    });
});

//delete announcement
router.delete('/:id', function(req, res, next) {
    Announcement.findByIdAndDelete(req.params.id, function (err, announcement) {
        if (err) return res.status(500).send({ message: 'delete fail', success: false});
        res.json({
            announcement : announcement,
            message : "successfully deleted",
            success : true,
        });
    });
});
module.exports = router;