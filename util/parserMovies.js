const _ = require('lodash');

const getKey = s => _.camelCase(s.slice(0, s.indexOf(':')));

const getValue = s => {
	let value = s.slice(s.indexOf(':') + 1).trim();

	if (getKey(s) === 'stars') value = JSON.stringify(value.split(', '));
	else value = `"${value}"`;

	return value;
};
// CRLF (Windows) or LF (Unix)
const getLineEnding = data => data[data.indexOf('\n') - 1] === '\r' ? /\r\n/ : /\n/;

const getDoubleLineEnding = data => data[data.indexOf('\n') - 1] === '\r' ? /\r\n\r\n/ : /\n\n/;

const parse = movies => {

	const lineEnding = getLineEnding(movies);
	const doubleLineEnding = getDoubleLineEnding(movies);

	return movies.trim().split(doubleLineEnding).map(movie => {
		movie = movie.split(lineEnding).map(s => `"${getKey(s)}": ${getValue(s)}`);
		return JSON.parse(`{ ${movie} }`);
	});

}

module.exports = parse;