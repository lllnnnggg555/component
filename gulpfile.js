const path = require('path')
const gulp = require('gulp')
const fs = require('fs-extra')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')

function removeDir (dir) {
  return function (cb) {
    fs.removeSync(path.resolve(__dirname, `./${dir}`))
    cb()
  }
}

function copyFileTo (dir) {
  return function (cb) {
    gulp.src(path.resolve(__dirname, './src/**/*.!(js|jsx|ts|tsx)'))
      .pipe(gulp.dest(path.resolve(__dirname, `./${dir}`)))
    cb()
  }
}

function build (dir, options = {}) {
  return function (cb) {
    gulp.src(path.resolve(__dirname, './src/**/*.?(js|jsx|ts|tsx)'))
      .pipe(babel(options))
      .pipe(gulp.dest(path.resolve(__dirname, `./${dir}`)))
    cb()
  }
}

function buildTS (dir, options, addition) {
  return function (cb) {
    let buildStream = gulp.src(path.resolve(__dirname, './src/**/*.?(js|jsx|ts|tsx)'))
      .pipe(ts.createProject('tsconfig.json', options)())
      .pipe(babel({
        babelrc: false,
        plugins: [
          ['import', {
            'libraryName': 'antd',
            'libraryDirectory': 'es',
            'style': true
          }]
        ]
      }))
    if (addition) {
      buildStream = buildStream.pipe(addition)
    }
    buildStream.pipe(gulp.dest(path.resolve(__dirname, `./${dir}`)))
    cb()
  }
}

// --------------------------------- lib

const cleanLib = gulp.series(removeDir('lib'), copyFileTo('lib'))

const buildLib = gulp.series(cleanLib, build('lib', {
  presets: [
    [
      '@babel/preset-env', {
        modules: 'cjs'
      }
    ]
  ],
  plugins: [
    'add-module-exports'
  ]
}))

gulp.task('lib', buildLib)

const buildLibTS = gulp.series(cleanLib, buildTS('lib', { module: 'es6' }, ts.createProject('tsconfig.json', { module: 'commonjs' })()))

gulp.task('lib:ts', buildLibTS)

// ---------------------------------- module

const cleanModule = gulp.series(removeDir('module'), copyFileTo('module'))

const buildModule = gulp.series(cleanModule, build('module', {
  presets: [
    [
      '@babel/preset-env', {
        modules: false
      }
    ]
  ]
}))

gulp.task('module', buildModule)

const buildModuleTS = gulp.series(cleanModule, buildTS('module', {
  outDir: './module',
  target: 'es5',
  module: 'es6'
}))

gulp.task('module:ts', buildModuleTS)

// ---------------------------------- modern

const cleanModern = gulp.series(removeDir('modern'), copyFileTo('modern'))

const buildModern = gulp.series(cleanModern, build('modern', {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          esmodules: true
        },
        modules: false
      }
    ]
  ]
}))

gulp.task('modern', buildModern)

const buildModernTS = gulp.series(cleanModern, buildTS('modern', {
  outDir: './modern',
  target: 'es6',
  module: 'es6'
}))

gulp.task('modern:ts', buildModernTS)

// ---------------------------------- build

gulp.task('default', gulp.series(buildLib, buildModule, buildModern))

gulp.task('build:ts', gulp.series(buildLibTS, buildModuleTS, buildModernTS))
