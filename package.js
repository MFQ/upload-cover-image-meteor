Package.describe({
  name: 'mfq:upload-cover-image',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Simply upload cover image package for meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/MFQ/upload-cover-image-meteor',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

var both = ['client', 'server'], client = ['client'], server = ['server']


Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');

  // Adding dependencies
  api.use(['underscore', 'accounts-base', 'accounts-password'], both);
  api.use(['jquery', 'templating', 'mizzao:bootstrap-3@3.2.0_1'], client);


  // Adding package files
  api.addFiles([

    "lib/client/vendor/bower_components/jquery-ui/ui/jquery-ui.js",
    "lib/client/vendor/bower_components/eventie/eventie.js",
    "lib/client/vendor/bower_components/eventEmitter/EventEmitter.js",
    "lib/client/vendor/bower_components/imagesloaded/imagesloaded.js",
    "lib/client/vendor/bower_components/jquery.drag-n-crop/jquery.drag-n-crop.js",
    "lib/client/vendor/bower_components/jquery.drag-n-crop/jquery.drag-n-crop.css",

    "lib/client/alert_helpers.js",
    "lib/client/constants.js",
    "lib/client/file_reader.js",
    "lib/client/template/editCoverImage.css",
    "lib/client/template/editCoverImage.html",
    "lib/client/template/editCoverImage.js"
  ], client);

  // both client/server shared dependencies
  api.addFiles(["lib/validators.js"], both);

  // server dependencies
  api.addFiles(["lib/server/cover_image_updator.js"], server);

  // api.addFiles('upload-cover-image.js');
  if (typeof api.export !== 'undefined') {
    //api.export('DEBUGX', both);
  }

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');


  api.use('mfq:upload-cover-image');
  api.addFiles('upload-cover-image-tests.js');
});
