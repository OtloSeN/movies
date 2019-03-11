const router = require('express').Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const movieController = require('./controllers/movie.controller');

router.get('/', movieController.getMovies);

router.get('/add', movieController.showCreate);

router.get('/:id', movieController.getMovieById);

router.post('/add', movieController.addMovie);

router.post('/addMovies', upload.single('moviefile'), movieController.addMovies);

router.delete('/:id/delete', movieController.deleteMovie);

module.exports = router;