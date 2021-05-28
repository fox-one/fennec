const path = require("path");
const webpack = require("webpack");

const CopyPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const ManifestPlugin = require("webpack-extension-manifest-plugin");

const pkgJson = require("./package.json");
const manifest = require("./manifest.json");

const packages = ["fennec-extension", "fennec-base", "fennec-ui"];

module.exports = {
  context: __dirname,
  devtool: false,
  externals: {
    vue: "Vue",
    vuetify: "Vuetify"
  },
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
                  "@import '@foxone/fennec-ui/src/scss/_variables.scss';"
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

  watch: false
};
