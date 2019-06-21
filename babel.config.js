const plugins = ["@vue/babel-plugin-transform-vue-jsx"]

// 生产环境移除console
if(process.env.NODE_ENV === 'production') {
    plugins.push("transform-remove-console")
}

module.exports = {
    plugins,
    presets: [
        ["@vue/app", {"useBuiltIns": "entry"}]
       /* ["@babel/preset-env", {
            "targets": {
                "chrome": 70,
                "ie": 10
            },
            "useBuiltIns": "entry"
        }]*/
    ]
}
