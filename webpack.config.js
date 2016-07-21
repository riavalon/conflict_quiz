'use strict';

const path = require('path');


module.exports = {

	context: __dirname,

	entry: ['./client/app/main.js'],

	devtool: 'source-map',

	output: {
		path: path.join(__dirname, 'client/js'),
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react', 'stage-2'],
					plugins: ['react-html-attrs']
				}
			}
		]
	},

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	}

};
