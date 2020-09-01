const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

module.exports = {
    entry: ["./src/index.tsx", "./src/index.scss"],
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "out")
    },

    devServer: {
        contentBase: path.join(__dirname, 'out'),
        compress: true,
        hot: true,
        historyApiFallback: true,
        port: 8080
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".svg"],
        alias: {
            components: srcPath('components'),
            app: srcPath('app'),
            pages: srcPath('pages'),
            core: srcPath('core'),
            common: srcPath('common'),
            types: srcPath('types'),
            constants: srcPath('constants'),
            hooks: srcPath('hooks'),
            utils: srcPath('utils'),
            api: srcPath('api'),
        }
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },*/

    mode: "development",

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            // sass / scss loader for webpack
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
};