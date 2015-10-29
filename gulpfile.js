require('dotenv').load();

var
  gulp = require('gulp'),
  fs = require('fs');

var gulp = require('gulp-help')(require('gulp'));

fs.readdirSync(__dirname + '/gulp').forEach(function(task) {
  if (task.indexOf('.spec.') == -1 && task.indexOf('.DS_Store') == -1) {
    require('./gulp/' + task);
  }
});
