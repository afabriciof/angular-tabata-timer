module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-compress');

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

    'clean': {
      'temp': {
        'src': [ 'tmp' ]
      },
      'dist': {
        'src': [ 'dist' ]
      }
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

	'ngtemplates':  {
	  'app':        {
		'src':      '**/*view.html',
		'dest':     'tmp/templates.js'
	  }
	},


    'concat': {
      'dist': {
        'src': [
			'src/**/app.module.js',
			'src/**/app.config.js',
			'src/**/*module.js',
			'src/**/*.js',
			'tmp/*.js',
  			'!src/bower_components/**',
  			'!src/**/*.spec.js'
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
    },

    'compress': {
      'dist': {
        'options': {
          'archive': 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        'files': [{
          'src': [ 'src/index.html', 'dist/*.js', 'dist/*.css', 'src/bower_components/**' ]
        }]
      }
    },

  });

  grunt.registerTask('test', ['karma:development']);

  grunt.registerTask('build',
    [
	  'clean:dist',
      'jshint',
      'karma:development',
	  'ngtemplates',
      'concat',
      'uglify',
	  'clean:temp',
	  'compress:dist'
	]);

};