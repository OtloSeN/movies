const path = require('path');
const fs = require('fs');

const Movie = require('../../models/movie');
const parseMovies = require('../../util/parserMovies');
const getQueries = require('../../util/getQueries');
const validateMovie = require('../../util/validateMovie');

module.exports = {
    getMovies,
    getMovieById,
    showCreate,
    addMovie,
    addMovies,
    deleteMovie
}

async function getMovies(req, res) {    
    const { sort, search } = getQueries(req.query);        
        
    try {
        const movies = await Movie
            .find(search)
            .collation({ locale: 'en', caseFirst: 'upper' })
            .sort(sort);

        res.render('pages/index', { movies, queries: req.query });
    } catch (error) {
        console.log(error)
    }
}

async function getMovieById(req, res) {
    try {
        const movie = await Movie.findOne({ _id: req.params.id });
        
        if(!movie) return res.status(404).send('NOT FOUND');

        res.render('pages/single', { movie });
    } catch (error) {
        console.log(error);
    }
}

async function showCreate(req, res) {
    res.render('pages/create');
}

function addMovie(req, res) {
    const { error } = validateMovie(req.body);

    if (error) return res.send(error);

    const { title, releaseYear, format, stars } = req.body;

    const movie = new Movie({
        title,
        releaseYear,
        format,
        stars
    })

    movie.save()
        .then(movie => res.send(movie))
        .catch(err => console.log(err));
}

function addMovies(req, res) {
    if(!req.file) return res.status(400).render('pages/create', { error: 'Choose a file.' });

    const extname = path.extname(req.file.originalname);
    const _path = path.resolve(`uploads/${req.file.filename}`);

    if(extname !== '.txt') {
        fs.unlink(_path, err => {
            if (err) throw err;
        });
        return res.status(400).render('pages/create', { error: 'Only text documents are allowed' });
    }

    fs.readFile(_path, 'utf-8', (err, data) => {
        if (err) throw err;

        const movies = parseMovies(data);        

        Movie.insertMany(movies)
            .then(movies => res.redirect('/'))
            .catch(err => console.log(err));
    });
}

async function deleteMovie(req, res) {
    const _id = req.params.id;
    try {
        const movie = await Movie.findOneAndDelete({ _id });

        res.send(movie);
    } catch (error) {
        console.log(error);
    }
}
