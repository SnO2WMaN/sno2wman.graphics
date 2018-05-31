const path = require("path");
const srcDir = path.resolve("src");
const distDir = path.resolve("dist");
const nodeModulesDir = path.resolve("node_modules");

// PostCSS
const autoprefixer = require("autoprefixer");
const postcssSorting = require("postcss-sorting");
const postcssShort = require("postcss-short");
const cssnano = require("cssnano");

// Plugins
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = env => {
	const production = env && env === "production";
	return {
		mode: production ? "production" : "development",
		devtool: production ? false : "source-map",
		target: "web",
		context: srcDir,
		entry: {
			index: "./index.js"
		},
		output: {
			path: distDir,
			filename: "[hash].js"
		},
		devServer: {
			contentBase: distDir,
			port: 8080,
			inline: true
		},
		performance: {
			hints: false
		},
		resolve: {
			extensions: [".js", ".ts"],
			modules: ["node_modules", srcDir],
			alias: {
				"@fortawesome/fontawesome-free-solid$":
					"@fortawesome/fontawesome-free-solid/shakable.es.js",
				"@fortawesome/fontawesome-free-regular$":
					"@fortawesome/fontawesome-free-regular/shakable.es.js",
				"@fortawesome/fontawesome-free-brands$":
					"@fortawesome/fontawesome-free-brands/shakable.es.js"
			}
		},
		module: {
			rules: [
				// ESLint
				production
					? {}
					: {
							enforce: "pre",
							test: /\.(js)$/i,
							use: [
								{
									loader: "eslint-loader",
									options: { fix: true }
								}
							]
					  },
				// Javascript
				{
					test: /.js$/i,
					use: [{ loader: "babel-loader" }]
				},
				// Pug
				{
					test: /.pug$/i,
					use: [{ loader: "pug-loader" }]
				},
				// Sass / Scss
				{
					test: /.(scss|sass)$/i,
					use: [
						production
							? MiniCSSExtractPlugin.loader
							: { loader: "style-loader" },
						{
							loader: "css-loader",
							options: { sourceMap: !production }
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: !production,
								parser: "postcss-scss",
								plugins: [
									autoprefixer,
									postcssSorting,
									postcssShort
								]
							}
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: !production,
								includePaths: [nodeModulesDir]
							}
						}
					]
				},
				// Image
				{
					test: /.(png|jpe?g|webp|gif)$/i,
					use: [
						{
							loader: "url-loader",
							options: {
								limit: 4096,
								name: "images/[hash].[ext]"
							}
						},
						{
							loader: "image-webpack-loader",
							options: {
								bypassOnDebug: !production,
								mozjpeg: {
									progressive: true,
									quality: 65
								},
								pngquant: {
									quality: "65-90",
									speed: 4
								},
								gifsicle: {
									interlaced: false,
									optimizationLevel: 3
								},
								webp: {
									quality: 75
								}
							}
						}
					]
				},
				// SVG
				{
					test: /\.svg$/i,
					use: [
						{
							loader: "svg-inline-loader",
							options: {
								removeTags: true,
								removingTagAttrs: ["style"]
							}
						}
					]
				},
				// Font
				{
					test: /.(ttf|otf|eot|woff2?)$/i,
					use: [
						{
							loader: "file-loader",
							options: { name: "fonts/[hash].[ext]" }
						}
					]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin([distDir]),
			new StyleLintPlugin({}),
			new CaseSensitivePathsPlugin({ debug: !production }),
			new MiniCSSExtractPlugin({
				filename: production ? "[hash].css" : "[name].css",
				chunkFilename: "[id].css"
			}),
			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /.css$/i,
				cssProcessor: cssnano,
				cssProcessorOptions: { discardComments: { removeAll: true } },
				canPrint: true
			}),
			new HTMLWebpackPlugin({
				chunks: ["index"],
				template: "index.pug",
				filename: "index.html"
			})
		]
	};
};
