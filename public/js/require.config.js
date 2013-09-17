require.config({
  paths: {
    "jquery": "../vendor/jquery/jquery",
    "underscore": "../vendor/underscore/underscore",
    "backbone": "../vendor/backbone/backbone",
    "templates" : "../templates"
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});


require(['entry']);