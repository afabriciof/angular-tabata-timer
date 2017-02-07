module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),

    'meta': {
      'jsFilesForTesting': [
        'src/bower_components/angular/angular.js',
        'src/bower_components/angular-route/angular-route.js',
        'src/bower_components/angular-resource/angular-resource.js',
        'src/bower_components/angular-mocks/angular-mocks.js',
        'src/bower_components/angular-cookies/angular-cookies.js',

        'src/**/*.module.js',

        'src/common/pad/**/*.js',
        'src/common/service/**/*.js',
        'src/login/**/*.js',
        'src/timer/**/*.js',
        'src/tabata/**/*.js'
      ]
    },

    'karma': {
      'development': {
        'configFile': 'karma.conf.js',
        'options': {
          'files': [
            '<%= meta.jsFilesForTesting %>'
          ],
        }
      }
	},

    'jshint': {
      'beforeconcat': [
		  'src/**/*.js',
	  	  '!src/bower_components/**',
		  ]
    },  

    'concat': {
      'dist': {
        'src': [
			'src/**/*.js',
  			'!src/bower_components/**'
		],
        'dest': 'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
      }
    },

    'uglify': {
      'options': {
        'mangle': false
      },  
      'dist': {
        'files': {
          'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.namelower %>-<%= pkg.version %>.js']
        }
      }
    }

  });

  grunt.registerTask('test', ['karma:development']);

  grunt.registerTask('build',
    [
      'jshint',
      'karma:development',
      'concat',
      'uglify'
    ]);

};