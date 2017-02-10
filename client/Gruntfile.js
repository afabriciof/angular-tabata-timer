module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');

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

	'copy': {
	  'main': {
		'files': [
		  // includes files within path
		  {expand: true, flatten: true, src: ['src/*.css'], dest: 'dist/', filter: 'isFile'},
		  {expand: true, flatten: true, src: ['src/index.html'], dest: 'dist/', filter: 'isFile'}
		],
	  },
	},

    'compress': {
      'dist': {
        'options': {
          'archive': 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        'files': [
			{expand: true, flatten: true, src: ['dist/*.html'], dest: '', filter: 'isFile'},
			{expand: true, flatten: true, src: ['dist/*.css'], dest: '', filter: 'isFile'},
			{expand: true, flatten: false, cwd: 'src/', src: ['bower_components/**'], dest: '', filter: 'isFile'},
			{expand: true, flatten: false, src: ['dist/*.js'], dest: '', filter: 'isFile'},
        ]
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
	  'copy',
	  'compress:dist'
	]);

};