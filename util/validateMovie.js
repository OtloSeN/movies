const Joi = require('joi');

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required().min(3).max(255),
        releaseYear: Joi.string().required(),
        format: Joi.string(),
        stars: Joi.array().required()
    }
    return Joi.validate(movie, schema);
}

module.exports = validateMovie;