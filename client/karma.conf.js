// Karma configuration
// Generated on Mon Sep 05 2016 10:57:49 GMT-0300 (Hora estándar de Argentina)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [
    ],


    // coverage reporter generates the coverage 
    reporters: ['progress', 'coverage'],
 
    preprocessors: {
      // source files, that you wanna generate coverage for 
      // do not include tests or libraries 
      // (these files will be instrumented by Istanbul) 
      'src/**/*.module.js': ['coverage'],
      'src/**/*.component.js': ['coverage'],
      'src/**/*.service.js': ['coverage'],
      'src/**/*.filter.js': ['coverage'],
      'src/**/*.directive.js': ['coverage']
    },
 
    // optionally, configure the reporter 
    coverageReporter: {
      dir : 'dist/coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' }
	  ],
      check: {
		global: {
			statements: 40,
			lines: 40,
			functions: 40,
			branches: 40
		}
      }
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}