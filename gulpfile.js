const { watch, series } = require('gulp')
const spawn = require('child_process').spawn
let node

const server = (cb) => {
  if (node) node.kill()
  node = spawn('node', ['index.js'], {stdio: 'inherit'})

  node.on('close',  (code) => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...')
    }
  })

  cb()
}

const development = (cb) => {
  watch([
    './controllers/**/*.js', 
    './models/**/*.js',
    './*.js'
  ], {
    events: 'all',
    ignoreInitial: false
  }, server)

  cb()
}

process.on('exit', () => {
  if (node) node.kill()
})

exports.default = development
