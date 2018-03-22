const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    disableHostCheck: true
  },
  plugins: [
    // ... your plugins
    new webpack.DefinePlugin({
      'process.env':{
        'OPENSHIFT_DOMAIN_NAME': "\""+process.env.OS_DOMAIN+"\"",
	      'OPENSHIFT_BUILD_NAMESPACE': "\""+process.env.OPENSHIFT_BUILD_NAMESPACE+"\"",
        'APP_DOMAIN': "\""+process.env.APP_DOMAIN+"\""
      }
    })
  ]
};
