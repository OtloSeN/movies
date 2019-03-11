const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect('mongodb://localhost/movies', {
            useCreateIndex: true,
            useNewUrlParser: true
        })
        .then(() => console.log('Connected to MoviesDB...'))
        .catch(err => console.log(err))
}