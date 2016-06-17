var gulp = require('gulp');
var spawn = require('child_process').spawn;
var node;
var stylus = require('gulp-stylus');
var nib = require('nib');
 
gulp.task('compileStylus', function() {
  gulp.src('./app/views/styl/*')
    .pipe(stylus({ use: nib()}))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});


gulp.task('watch', function(){
  gulp.watch('./app/views/styl/*', ['compileStylus']);
  gulp.watch(['./server.js', './app/**/*.js'], ['server'])
});
   
gulp.task('default', function() {
   gulp.run('server');
   gulp.run('watch');   
});