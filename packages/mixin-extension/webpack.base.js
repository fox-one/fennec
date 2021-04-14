const path = require("path");
const webpack = require("webpack");

const CopyPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin');

const pkgJson = require("../../lerna.json");
const destPath = path.join(__dirname, 'build');
const targetBrowser = process.env.TARGET_BROWSER;

const packages = [
  "mixin-extension",
  "mixin-extension-base",
  "mixin-extension-ui",
  "mixin-sdk"
];

module.exports = {
  context: __dirname,
  devtool: false,
  // entry: {
  //     manifest: './manifest.json',
  // },
  module: {
    rules: [
      {
        type: 'javascript/auto', // prevent webpack handling json with its own loaders,
        test: /manifest\.json$/,
        use: {
            loader: 'wext-manifest-loader',
            options: {
                usePackageJSONVersion: true,
            },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                ["@babel/plugin-proposal-private-methods", { loose: true }]
              ]
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require("sass"),
              sassOptions: {
                prependData:
                  "@import '@foxone/mixin-extension-ui/src/scss/_variables.scss';"
              }
            }
          }
        ]
      },
      {
        test: [/\.svg$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.woff2?$/],
        use: [
          {
            loader: require.resolve("url-loader"),
            options: {
              esModule: false,
              limit: 10000,
              name: "static/[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  output: {
    chunkFilename: "[name].js",
    filename: "[name].js",
    globalObject: "(typeof self !== 'undefined' ? self : this)",
    path: path.join(destPath, targetBrowser)
  },

  performance: {
    hints: false
  },

  plugins: [
    new WextManifestWebpackPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser.js"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        PKG_NAME: JSON.stringify(pkgJson.name),
        PKG_VERSION: JSON.stringify(pkgJson.version)
      }
    }),
    new CopyPlugin({ patterns: [{ from: "public" }] }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new ProgressBarPlugin()
  ],

  resolve: {
    alias: packages.reduce((alias, p) => ({
      ...alias,
      [`@foxone/${p}`]: path.resolve(__dirname, `../${p}/src`)
    })),
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify")
    }
  },

  externals: {
    vuetify: "Vuetify",
    vue: "Vue"
  },

  watch: false
};
