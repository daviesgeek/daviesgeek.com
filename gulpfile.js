var gulp = require('gulp'),
    fs   = require('fs'),
    readline = require('readline'),
    moment = require('moment');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('new-post', function() {
  var date = moment(),
      postPath = '_posts/DRAFT-' + date.format("YYYY-MM-DD") + '.md';

  if(!fs.existsSync(postPath)) {
    fs.writeFile(postPath, "---\nlayout: post\ndate: \"" +  date.format('YYYY-MM-DD HH:mm') + "\"\n---")
  } else {
    console.log("Post already exists")
  }
});