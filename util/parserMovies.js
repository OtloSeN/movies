const _ = require('lodash');

const parse = movies => (
	movies.trim().replace(/\r\n/g, '\n').split(/\n\n/).map(movie => (
		movie.split(/\n/).reduce((result, field) => {
			field = field.match(/(.+?): (.+)/)
			const value = field[1] === 'Stars' ? field[2].split(', ') : field[2]
			return { ...result,	[_.camelCase(field[1])]: value }
		}, {})
	))
)

module.exports = parse;