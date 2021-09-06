/* eslint-disable sort-keys */
const path = require("path");
const webpack = require("webpack");

const CopyPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { VuetifyLoaderPlugin } = require("vuetify-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const ManifestPlugin = require("webpack-extension-manifest-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const pkgJson = require("./package.json");
const manifest = require("./manifest.json");

const packages = ["fennec-extension", "fennec-base", "fennec-ui"];

module.exports = {
  context: __dirname,
  devtool: false,
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.(js|ts|tsx)$/,
        use: [
          {
            loader: "babel-loader?retainLines=true",
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
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/.vue$/]
        },
        test: /\.tsx?$/
      },
      {
        loader: "vue-loader",
        test: /\.vue$/
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.sass$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                indentedSyntax: true
              },
              additionalData: "@import '@foxone/fennec-ui/scss/_variables.scss'"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                indentedSyntax: false
              },
              additionalData:
                "@import '@foxone/fennec-ui/scss/_variables.scss';"
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
    path: path.join(__dirname, "build")
  },

  performance: {
    hints: false
  },

  plugins: [
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
    new ManifestPlugin({
      config: {
        base: manifest,
        extend: {
          version: pkgJson.version.split("-")[0], // remove possible -beta.xx
          version_name: pkgJson.version
        }
      }
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new CleanWebpackPlugin(),
    new ProgressBarPlugin(),
    new FileManagerPlugin({
      events: {
        onEnd: {
          archive: [
            { source: "./build", destination: "../../fennec-extension.zip" }
          ]
        }
      }
    })
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

  watch: false
};
