const gulp = require('gulp');
const ts = require('gulp-typescript');

// Pull in the tsconfig.json and pass it to gulp-typescript for configuration
const tsProject = ts.createProject('tsconfig.json');

// Tell gulp-typescript to transpile our project and deliver it to “dist”
gulp.task('compile', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

// Tell Gulp to watch our source .ts files, so that our transpiled JavaScript automatically gets rebuilt upon file changes
gulp.task('watch', ['compile'], () => {
  gulp.watch('src/**/*.ts', ['compile']);
});

gulp.task('default', ['watch']);