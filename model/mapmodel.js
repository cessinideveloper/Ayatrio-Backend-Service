const mongoose = require('mongoose');

const mapSchema = mongoose.Schema({
    locations: [
        {
            name: {
                type: String,
                required: true,
                unique: true,
            },
            geo_location: {
                latitude: {
                    type: Number,
                    required: true,
                },
                longitude: {
                    type: Number,
                    required: true,
                },
            },
            address: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
        },
    ],
});

const Map = mongoose.model('Map', mapSchema);
module.exports = Map;
