// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
function timestampToTime(timestamp) {
        var date = new Date(new Date().getTime());//时间戳为10位需*1000，时间戳为13位的话不需乘1000
       var Y = date.getFullYear() 
       var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) 
       var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) 
       var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) 
       var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) 
        return Y+M+D+h+m;
    }
  
const Timestamp = timestampToTime()
module.exports = {
	// 基本路径 baseURL已经过时 
	publicPath: "",
	// 输出文件目录
	outputDir: 'dist',
	// eslint-loader 是否在保存的时候检查
	lintOnSave: true,
	// use the full build with in-browser compiler?
	// https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
	// compiler: false,
	// webpack配置
	// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md 
	transpileDependencies: ['webpack-dev-server/client'],
	chainWebpack: config => {
		config.entry.app = ['babel-polyfill', './src/main.js'];
	},
	configureWebpack: { // webpack 配置
		// output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
		// 	filename: `js/[name].js`,
		// 	chunkFilename: `js/[name].js`,
		// },
		// plugins: [
		// 	new MiniCssExtractPlugin({
		// 		// 修改打包后css文件名
		// 		filename: `css/[name].css`,
		// 		chunkFilename: `css/[name].css`
		// 	})
		// ]
	},
	chainWebpack: config => {
		config.module
			.rule('images')
			.use('url-loader')
			.tap(options => {
				return {
					limit: 4096,
					fallback: {
						loader: 'file-loader',
						options: {
							name: `img/[name].[ext]`
						}
					}
				};
			})
	  config.output.filename('js/[name]-'+Timestamp+'.js').end();
	  config.output.chunkFilename('js/[name]-'+Timestamp+'.js').end();
				// 为生产环境修改配置...
			config.plugin('extract-css').tap(args => [{
					filename: 'css/[name]-'+Timestamp+'.css',
					chunkFilename: 'css/[name]-'+Timestamp+'.css'
				}]) 
	},
	// vue-loader 配置项
	// https://vue-loader.vuejs.org/en/options.html
	// vueLoader: {},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false, 
	// css相关配置
	css: {
	    // 是否使用css分离插件 ExtractTextPlugin
	    extract: true,
	    // 开启 CSS source maps?
	    sourceMap: false,
	    // css预设器配置项
	    loaderOptions: {
			 
		},
	    // 启用 CSS modules for all css / pre-processor files.
	    modules: false
	},
	// use thread-loader for babel & TS in production build
	// enabled by default if the machine has more than 1 cores
	parallel: require('os').cpus().length > 1,
	// 是否启用dll
	// See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
	// dll: false,
	// PWA 插件相关配置
	// see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	pwa: {},
	// webpack-dev-server 相关配置
	devServer: {
		open: process.platform === 'darwin',
		host: '0.0.0.0', //如果是真机测试，就使用这个IP
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: {
			 '/': {
					target: 'http://192.168.20.2:20020',
					changeOrigin: true,
					ws: false,
					pathRewrite: {
	
					}
				}
		}, // 设置代理
		before: app => {}
	},
	// 第三方插件配置
	pluginOptions: {
		// ...
	}
}
