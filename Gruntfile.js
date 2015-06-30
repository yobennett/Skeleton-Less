module.exports = function(grunt) {

  grunt.initConfig({

    // Project configuration
    pkg: grunt.file.readJSON('package.json'),

    // Compiles our Less
    less: {
      development: {
        options: {
          compress: false,
          cleancss: false,
          optimization: 2,
          dumpLineNumbers: 'false'
        },
        files: {
          "css/skeleton.css": "less/skeleton.less"
        }
      }
    },

    // Build tooling

    watch: {
      options: {
      	livereload: false,
      },
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }

  });

  // Load dependencies
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Generate and format the CSS
  grunt.registerTask('default', ['less', 'watch']);

};