module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      src: 'public/js/**/*.js',
      options: {
        specs: 'test/public/js/**/*.js',
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfigFile: 'public/js/require.config.js',
          requireConfig: {
            baseUrl: 'public/js'
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['test']);
};