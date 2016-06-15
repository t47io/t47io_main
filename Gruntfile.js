module.exports = function(grunt) {

  grunt.initConfig({
    'pkg': '<json:package.json>',

    'concat': {
      'lib': {
        'files': {
          'dist/js/_lib.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'
          ]
        }
      },
      'animation': {
        'files': {
          'dist/js/_anim.min.js': [
            'bower_components/gsap/src/minified/TweenMax.min.js',
            'bower_components/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
            'bower_components/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
            'bower_components/scrollmagic/scrollmagic/minified/plugins/jquery.ScrollMagic.min.js',
            'bower_components/gsap/src/minified/jquery.gsap.min.js',
            'bower_components/isotope/dist/isotope.pkgd.min.js',
            'src/js/lib/SmoothScroll.min.js',
            'src/js/lib/CountTo.min.js',
            'src/js/lib/TypeWriter.min.js'
          ]
        }
      }
    },

    'uglify': {
      'index': {
        'files': {'dist/js/_indx.min.js': ['src/js/theme.js']}
      },
      'gviz': {
        'files': {'dist/js/_gviz.min.js': [
          'src/js/util.js',
          'src/js/gviz.js'
        ]}
      },
      'ga': {
        'files': {'dist/js/_ga.min.js': ['src/js/analytics.js']}
      }
    },

    'sass': {
      'main': {
        'files': [{
          'expand': true,
          'cwd': 'src/sass',
          'src': '*.scss',
          'dest': 'dist/css/',
          'ext': '.css'
        }]
      }
    },

    'cssmin': {
      'lib': {
        'files': {
          'dist/css/_lib.min.css': [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/font-awesome/css/font-awesome.min.css'
          ]
        }
      },
      'index': {
        'files': {
          'dist/css/_indx.min.css': [
            'src/css/reset.css',
            'src/css/style.css',
            'src/css/mobile.css',
            'src/css/sprites_index.css'
          ]
        }
      },
      'init': {
        'files': {
          'dist/css/_init.min.css': [
            'src/css/loader_index.css',
            'src/css/sprites_logo.css'
          ]
        }
      },
      'load': {
        'files': {
          'dist/css/_load.min.css': [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'src/css/loader_index.css',
            'src/css/sprites_logo.css',
            'src/css/reset.css',
            'src/css/mobile.css'
          ]
        }
      },
      'proj': {
        'files': {
          'dist/css/_proj.min.css': [
            'src/css/palette.css',
            'src/css/project.css',
            'src/css/loader_project.css',
            'src/css/sprites_logo.css',
            'src/css/sprites_project.css'
          ]
        }
      },
      'error': {
        'files': {
          'dist/css/_clr.min.css': [
            'src/css/loader_index.css',
            'src/css/sprites_logo.css',
            'src/css/palette.css'
          ]
        }
      }
    },

    'htmlmin': {
      'main': {
        'options': {
          'ignoreCustomFragments': [ /(\{(\{|\%))[\ \w\"\'\.\=\!\_]*((\%|\})\})/ ],
          'removeComments': true,
          'collapseWhitespace': true,
          'minifyCSS': true,
          'minifyJS': true
        },
        'files': [{
          'expand': true,
          'cwd': 'src/html',
          'src': '*.html',
          'dest': 'dist/html/'
        }]
      }
    },

    'clean': {
      'all': ['dist/*'],
      'css': [
        'dist/css/*.map',
        'dist/css/*.css',
        '!dist/css/_*.css'
      ]
    },
    'copy': {
      'main': {
        'expand': true,
        'cwd': 'src',
        'src': [
          'img/**',
          'pdf/**',
          'robots.txt',
          'sitemap.xml',
          '*.ttf'
        ],
        'dest': 'dist/'
      }
    },

    'jshint': {
      'options': {
        'reporter': require('jshint-stylish')
      },
      'files': [
        'app.js',
        'src/js/*.js',
        '!src/js/analytics.js'
      ]
    },

    'watch': {
      'files': [
        'src/css/*.css',
        'src/js/*.js'
      ],
      'tasks': ['prod']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('prod', ['clean:all', 'sass', 'cssmin', 'jshint', 'uglify', 'concat', 'htmlmin', 'copy', 'clean:css']);

};
