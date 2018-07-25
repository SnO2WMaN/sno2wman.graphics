const path = require("path")
const srcDir = path.resolve("src")

const icons = path.resolve("src/icons")
const brands = path.resolve("src/brands")

const distDir = path.resolve("dist")
const nodeModulesDir = path.resolve("node_modules")

// PostCSS
const autoprefixer = require("autoprefixer/lib/autoprefixer")
const postcssSorting = require("postcss-sorting")
const postcssShort = require("postcss-short")
const cssnano = require("cssnano")
const cssMqPacker = require("css-mqpacker")

// Plugins
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const StyleLintPlugin = require("stylelint-webpack-plugin")
const StylishReporter = require("webpack-stylish")

module.exports = () => {
  const production = !process.env.WEBPACK_SERVE
  return {
    mode: production ? "production" : "development",
    devtool: production ? false : "source-map",
    target: "web",
    context: srcDir,
    stats: false,
    cache: true,
    entry: {
      index: "./index.js",
    },
    output: {
      path: distDir,
      filename: "[hash].js",
    },
    serve: {
      host: "::1",
      port: 8080,
    },
    performance: {
      hints: false,
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".jsx"],
      modules: ["node_modules", srcDir],
    },
    module: {
      rules: [
        // ESLint
        production
          ? {}
          : {
              enforce: "pre",
              test: /\.(j|t)sx?$/i,
              use: [
                {
                  loader: "eslint-loader",
                  options: { fix: true },
                },
              ],
            },
        // Javascript
        {
          test: /.jsx?$/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [["env", { modules: false }], "react"],
              },
            },
          ],
        },
        // Typescript
        {
          test: /.tsx?$/i,
          use: [{ loader: "ts-loader" }],
        },
        // Pug
        {
          test: /.pug$/i,
          use: [{ loader: "pug-loader" }],
        },
        // CSS / Sass / Scss
        {
          test: /.(css|scss|sass)$/i,
          use: [
            production
              ? MiniCSSExtractPlugin.loader
              : { loader: "style-loader" },
            {
              loader: "css-loader",
              options: { sourceMap: !production },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: !production,
                parser: "postcss-scss",
                plugins: [
                  postcssShort,
                  autoprefixer,
                  cssMqPacker,
                  postcssSorting,
                  cssnano,
                ],
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: !production,
                includePaths: [nodeModulesDir],
              },
            },
          ],
        },
        // Image
        {
          test: /.(png|jpe?g|webp|gif)$/i,
          include: [brands],
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[hash].[ext]",
              },
            },
          ],
        },
        {
          test: /.(png|jpe?g|webp|gif)$/i,
          exclude: [brands],
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4096,
                name: "images/[hash].[ext]",
              },
            },
            {
              loader: "image-webpack-loader",
              options: {
                disable: !production,
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                pngquant: {
                  quality: "65-85",
                  speed: 1,
                },
                gifsicle: {
                  interlaced: false,
                  optimizationLevel: 3,
                },
              },
            },
          ],
        },
        // SVG
        {
          test: /\.svg$/i,
          include: [icons],
          use: [
            {
              loader: "svg-inline-loader",
              options: {
                removeTags: true,
                removingTagAttrs: ["style"],
              },
            },
            {
              loader: "svgo-loader",
              options: {
                plugins: [
                  { removeTitle: true },
                  { convertColors: { shorthex: true } },
                  { convertPathData: false },
                ],
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          include: [brands],
          use: [
            {
              loader: "svg-inline-loader",
            },
            {
              loader: "svgo-loader",
              options: {
                plugins: [
                  { removeTitle: true },
                  { convertColors: { shorthex: true } },
                  { convertPathData: false },
                ],
              },
            },
          ],
        },
        // Font
        {
          test: /.(ttf|otf|eot|woff2?)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[hash].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([distDir]),
      new StyleLintPlugin({}),
      new CaseSensitivePathsPlugin({ debug: false }),
      new MiniCSSExtractPlugin({
        filename: production ? "[hash].css" : "[name].css",
        chunkFilename: "[id].css",
      }),
      new HTMLWebpackPlugin({
        chunks: ["index"],
        template: "index.pug",
        filename: "index.html",
      }),
      new StylishReporter(),
    ],
  }
}
