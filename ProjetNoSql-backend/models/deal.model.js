const mongoose = require('mongoose');

// Deal Schema
const DealSchema = mongoose.Schema ({
    /*sellerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users',
        required: true
    },*/
    buyerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users',
        required: true
    },
    announcementId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Announcements',
        required: true,
        unique: true
    },
    beginDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    dealPrice: {
        type: Number,
        required: true
    }
});

const Deal = mongoose.model('Deal', DealSchema);
module.exports = Deal;