'use strict';

const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const isProduction = process.env.NODE_ENV.trim() === 'production';

let es6Config = {
  mode: process.env.NODE_ENV.trim(),
  output: {
    filename: '[name].js',
  },
  watch: !isProduction,
  module: {
    rules: [
      {
        loader: 'babel-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimize: isProduction
  },
  devtool: false,
};

function buildStyles() {
  return src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css'));
};

function stylesWatcher() {
  return watch('./sass/**/*.scss', buildStyles);
}

function runWebpack() {
  return src('./src/js/*.js')
    .pipe(webpackStream(es6Config), webpack)
    .pipe(dest('./mist/js'));
}

exports.watch = parallel(
  runWebpack,
  stylesWatcher,
);

exports.build = parallel(
  runWebpack,
  buildStyles,
);
