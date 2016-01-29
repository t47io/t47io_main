module.exports = function(grunt) {

  grunt.initConfig({
    'pkg': '<json:package.json>',
    'concat': {
      'lib': {
        'files': {
          'public/js/_lib.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'
          ]
        }
      },
      'animation': {
        'files': {
          'public/js/_anim.min.js': [
            'bower_components/gsap/src/minified/TweenMax.min.js',
            'bower_components/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
            'bower_components/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
            'bower_components/scrollmagic/scrollmagic/minified/plugins/jquery.ScrollMagic.min.js',
            'bower_components/gsap/src/minified/jquery.gsap.min.js'
          ]
        }
      },
      'index': {
        'files': {
          'public/js/_util.min.js': [
            'public/js/lib/SmoothScroll.min.js',
            'public/js/lib/CountTo.min.js',
            'public/js/lib/TypeWriter.min.js'
          ]
        }
      }
    },

    'uglify': {
      'index': {
        'files': {'public/js/_indx.min.js': ['public/js/theme.js']}
      }
    },

    'cssmin': {
      'lib': {
        'files': {
          'public/css/_lib.min.css': [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/font-awesome/css/font-awesome.min.css'
          ]
        }
      },
      'index': {
        'files': {
          'public/css/_indx.min.css': [
            'public/css/reset.css',
            'public/css/style.css',
            'public/css/mobile.css'
          ]
        }
      },
      'error': {
        'files': {'public/css/_clr.min.css': ['public/css/palette.css']}
      }
    },

    'clean': [
      'public/css/_*.min.css',
      'public/js/_*.min.js'
    ]

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('prod', ['clean', 'cssmin', 'uglify', 'concat']);

};