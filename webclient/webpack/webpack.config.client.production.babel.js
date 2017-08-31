import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import baseConfiguration from './webpack.config.client';

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `extract-text-webpack-plugin`
// (this behaviour can be disabled with `css_bundle: false`)
// (the filename can be customized with `css_bundle: "filename.css"`)
const configuration = baseConfiguration({ development: false });

configuration.devtool = 'source-map';

configuration.plugins.push(
  // clears the output folder
  new CleanPlugin([path.relative(configuration.context, configuration.output.path)], { root: configuration.context }),

  // environment variables
  new webpack.DefinePlugin({
    'process.env': {
      // Useful to reduce the size of client-side libraries, e.g. react
      NODE_ENV: JSON.stringify('production') // 'development' to see non-minified React errors
    },

    // Just so that it doesn't throw "_development_tools_ is not defined"
    REDUX_DEVTOOLS: true
  }),

  // For production mode
  // https://moduscreate.com/webpack-2-tree-shaking-configuration/
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),

  // Compresses javascript files
  new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    compress: {
      warnings: false, // Suppress uglification warnings
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    },
    output: {
      comments: false,
    },
    exclude: [/\.min\.js$/gi] // skip pre-minified libs
  }),
  new CompressionPlugin({ 
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })
);

export default configuration;
