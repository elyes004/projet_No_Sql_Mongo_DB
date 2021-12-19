const mongoose = require('mongoose');
const City = require('./city.model');

// Governorate Schema
const GovernorateSchema = mongoose.Schema ({

    _id: {
        type: String,
        required: true,
        //_id represents the gov name  {"_id": "tunis", "cities": [ "{_id: tunis, }", "gzr", "azf"]}
    }
});

const Governorate = mongoose.model('Governorate', GovernorateSchema);
module.exports = Governorate;