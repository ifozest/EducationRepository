require.config({
  paths: {
    'jquery': '../vendor/jquery/jquery',
    'underscore': '../vendor/underscore/underscore',
    'backbone': '../vendor/backbone/backbone',
    'handlebars': '../vendor/handlebars/handlebars',
    'templates' : '../templates'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});


require(['entry']);