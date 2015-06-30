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

    // Runs CSS reporting
    parker: {
      options: {
        metrics: [
          'TotalStylesheets',
          'TotalStylesheetSize',
          'TotalRules',
          'TotalSelectors',
          'TotalIdentifiers',
          'TotalDeclarations',
          'SelectorsPerRule',
          'IdentifiersPerSelector',
          'SpecificityPerSelector',
          'TopSelectorSpecificity',
          'TopSelectorSpecificitySelector',
          'TotalIdSelectors',
          'TotalUniqueColours',
          'TotalImportantKeywords',
          'TotalMediaQueries'
        ],
        file: "css/.skeleton-less-stats.md",
        usePackage: true
      },
      src: [
        'css/*.css'
      ]
    },

    // Build tooling

    watch: {
      options: {
      	livereload: false,
      },
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less', 'parker']
      }
    }

  });

  // Load dependencies
  grunt.loadNpmTasks('grunt-parker');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Generate and format the CSS
  grunt.registerTask('default', ['less', 'watch', 'parker']);

};