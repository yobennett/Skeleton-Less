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
          "css/skeleton.css": "less/skeleton.less",
          "_site/docs.css": "docs/docs.less"
        }
      }
    },

    // Handle vendor prefixing
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({ browsers: ['last 2 versions', 'ie 8', 'ie 9'] })
        ]
      },
      dist: {
        src: 'css/*.css'
      },
      docs: {
        src: '_site/*.css'
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
        livereload: true
      },
      less: {
        files: ['less/**/*.less', 'docs/*.less'], // which files to watch
        tasks: ['less', 'postcss', 'parker']
      }
    },

    // Compile Jekyll static site
    // Example from https://gist.github.com/dannygarcia/3753650
    jekyll: {
      options: {
        src: 'docs',
        dest: '_site',
        config: '_config.yml'
      },
      watch: {
        jekyll: {
          files: ['docs/*.md'],
          tasks: ['jekyll:dev']
        }
      }
    }

  });

  // Load dependencies
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-parker');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Generate and format the CSS
  grunt.registerTask('default', ['less', 'jekyll', 'postcss', 'parker']);

};