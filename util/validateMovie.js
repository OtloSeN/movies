const Joi = require('joi');

function validateMovie(movie) {
    const schema = {
        title: Joi.string().max(255).required()
            .error(errors => {
                return errors.map(error => {
                    switch (error.type) {
                        case 'string.max':
                            return { message: 'Title must be no longer than 255 characters.' };
                        case 'any.empty':
                            return { message: 'Title is required.' };
                    }
                })
            }),
        releaseYear: Joi.number().min(1896).max(2020).required()
            .error(errors => {
                return errors.map(error => {
                    switch (error.type) {
                        case 'number.base':
                            return { message: 'Release year is required.' };
                        case 'number.min':
                            return { message: 'First ever film was released in 1896.' };
                        case 'number.max':
                            return { message: 'Allowed to post movies only untill 2020' };
                    }
                });
            }),
        format: Joi.string().required().error(() => 'Format is required.'),
        stars: Joi.array().required().min(1).error(() => 'At least 1 actor is required.')
    }
    return Joi.validate(movie, schema, {abortEarly: false});
}

module.exports = validateMovie;