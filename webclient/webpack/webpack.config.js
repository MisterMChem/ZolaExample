// This is the base Webpack configuration file
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var cssCustomProperties = require('postcss-custom-properties');
var postcssCalc = require('postcss-calc');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');

// project folder
var rootFolder = path.resolve(__dirname, '..');

var configuration = {
  // resolve all relative paths from the project root folder
  context: rootFolder,

  // https://webpack.github.io/docs/multiple-entry-points.html
  entry: {
    main: './src/application.entry.js',
  },

  output: {
    // filesystem path for static files
    path: path.resolve(rootFolder, 'build/assets'),

    // network path for static files
    publicPath: '/assets/',

    // file name pattern for entry scripts
    filename: '[name].[hash].js',

    // file name pattern for chunk scripts
    chunkFilename: '[name].[hash].js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    },
    {
      test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=../assets/fonts/[name].[ext]'
    },
    {
      test: /\.(scss)$/,
      include: [
        path.resolve(rootFolder, 'src/common/src/Header/Header.scss'),
        path.resolve(rootFolder, 'src/common/src/Footer'),
        path.resolve(rootFolder, 'src/components/Header/Header.scss'),
        path.resolve(rootFolder, 'src/components/Preloading'),
        path.resolve(rootFolder, 'src/pages/ContentLayout'),
      ],
      use: ExtractTextPlugin.extract({
        loader: [
          {
            loader: 'css-loader',
            query: {
              localIdentName: '[hash:8]',
              modules: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              // This is what aliases the @import 'componentImport'
              includePaths: ['./webclient/src/imports/']
            }
          }
        ]
      })
    },

    {
      test: /\.(scss)$/,
      // ExtractText is used here instead of universal-style-loader
      exclude: [
        path.resolve(rootFolder, 'src/common/src/Header/Header.scss'),
        path.resolve(rootFolder, 'src/common/src/Footer'),
        path.resolve(rootFolder, 'src/components/Header/Header.scss'),
        path.resolve(rootFolder, 'src/components/Preloading'),
        path.resolve(rootFolder, 'src/pages/ContentLayout'),
      ],
      use: [
      {
        loader: 'universal-style-loader'
      },
          {
            loader: 'css-loader',
            query: {
              localIdentName: '[hash:8]',
              modules: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./webclient/src/imports/']
            }
          }
        ]
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          query: {
            localIdentName: '[hash:8]',
            modules: false,
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader'
        }
      ]
    },

    {
      test: /\.(jpg|png)$/,
      use: [
        'url-loader?limit=10000' // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
      ]
    },
    {
      test: /\.(svg)$/,
      use: [
        'raw-loader'
      ]
    },
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ]
};

configuration.plugins.push(
  new webpack.LoaderOptionsPlugin({
    test: /\.(scss|css)$/,
    debug: true,
    options: {
      // A temporary workaround for `scss-loader`
      // https://github.com/jtangelder/sass-loader/issues/298
      output: {
        path: configuration.output.path
      },

      postcss: [
        autoprefixer({ browsers: 'last 2 version' }),
        cssCustomProperties(),
        postcssCalc()
      ],

      // A temporary workaround for `css-loader`.
      // Can also supply `query.context` parameter.
      context: configuration.context
    }
  })
);
configuration.plugins.push(new LodashModuleReplacementPlugin);
// This plugin is important...it ensures that common modules are placed in one chunk
// We have fine-grain control over which ones get placed there.
configuration.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  // (the commons chunk name)
  children: true,
  async: true,
  minChunks: function(module, count) {
    // If module has a path, and inside of the path exists the name "somelib",
    // and it is used in 3 separate chunks/entries, then break it out into
    if (module.context.indexOf('node_modules') >= 0 && count > 1) {
      return true;
    } else if (module.resource && module.resource.indexOf('bluebird') >= 0) {
      return true;
    } else if (module.resource && module.resource.indexOf('isomorphic-render') >= 0) {
      return true;
    } else {
      return false;
    }
  }
}));
configuration.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
configuration.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
// This plugin is also important
// Check out the stats.html file in the build directory to see how successful code splitting was.
configuration.plugins.push(new Visualizer());
module.exports = configuration;
