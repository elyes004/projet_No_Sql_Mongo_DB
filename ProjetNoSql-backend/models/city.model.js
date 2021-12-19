const mongoose = require('mongoose');

// City Schema
const CitySchema = mongoose.Schema ({

    _id: {
        type: String,
        required: true
        //_id represents city name 
    },
    governorate: {
        type: mongoose.Schema.Types.String, 
        ref: 'Governorates',
    },
});

const City = mongoose.model('City', CitySchema);
module.exports = City;