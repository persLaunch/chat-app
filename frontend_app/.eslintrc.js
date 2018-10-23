
module.exports = {
    "parser": "babel-eslint",
    "extends": [
        "plugin:react/recommended",
    ],
    "plugins": [
        "react",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
        "jsx": true
        }
    },
    "env": {
        "es6": true,
        "node": true
    },
    "rules": {
        "no-unused-vars": "error",
        "max-len": ["error", 1000], // Error for ligns containing too much char
        "no-console": 0,
        "padded-blocks": 0,// Allow jump a lign after function () {
        "indent": ["error", 2], // Indent 2 spaces
        "no-tabs": 0, // Authorize tab
        "no-trailing-spaces": 0, // To allow double jump lign
        "object-curly-newline": 0, // To do const { group, easiness } = cond; on same lign
        "curly": ["error", 'all'], // force to use {}  - source : https://eslint.org/docs/rules/curly
        "camelcase": 0, // disable because I can use some db required_value_object
        "no-underscore-dangle":0, // allow dangle to use ._id
        "arrow-body-style":0, // Ask for {} for function with 1 statement () => { toto }
        "func-names": 0, // Anonymous function for promises then(()=>{})
        //"nonblock-statement-body-position":0 //Jump lign after if without {}
   
    },
    "settings": { "react": { "version" : "16.3.2" }}
};