const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        requred: true,
        minlength: 3,
        maxlength: 255,
    },
    releaseYear: {
        type: String,
        required: true,
    },
    format: String,
    stars: {
        type: [],
        required: true
    }
});

const Movie = mongoose.model('movie', movieSchema);



module.exports = Movie;