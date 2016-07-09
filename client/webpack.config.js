'use strict';

const path = require('path');


module.exports = {

	context: __dirname,

	entry: ['./app/main.js'],

	devtool: 'source-map',

	output: {
		path: path.join(__dirname, 'js'),
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react'],
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
