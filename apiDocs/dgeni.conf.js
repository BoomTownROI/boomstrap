var path = require('canonical-path'),
           ngDoc('dgeni-packages/ngdoc');

module.exports = function(config) {
  console.log('derp');
  // Use ngdocPackage
  config = ngDoc(config);

  // And the nunjucks template renderer
  // require('dgeni-packages/nunjucks')(config);

  // Set logging level
  config.set('logging.level', 'info');

  // Add your own templates to render docs
  config.prepend('rendering.templateFolders', [
    path.resolve(__dirname, 'templates')
  ]);

  // You can specifiy which tempate should be used based on a pattern.
  // Currently we just use one template and don't need a pattern
  config.prepend('rendering.templatePatterns', [
    'common.template.html'
  ]);

  // This tells dgeni where to look for stuff
  config.set('source.projectPath', '.');

  config.set('source.files', [
    {
      pattern: 'app/scripts/*.js',
      basePath: path.resolve(__dirname, '..')
    }
  ]);

  // Our generated docs will be written here:
  config.set('rendering.outputFolder', '../docs/');
  config.set('rendering.contentsFolder', 'apiDocs');

  return config;
};