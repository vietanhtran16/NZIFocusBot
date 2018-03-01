module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        libraryTarget: 'commonjs',
    },
    target: 'node',
    mode: 'production',
};