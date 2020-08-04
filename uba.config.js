const path = require('path');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const webpack = require('webpack');
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pathUrl = ''; //http://127.0.0.1:8080 设置host，可选
const context = '/fe';//工程节点名称
const contentBase = './build'+context;//打包目录
const staticConfig = {
    folder: "src/static"
};


let entries = {};
let chunks = [];
let prodEntries = {};
let prodChunks = [];
let htmlEntrys = [];

const svrConfig = {
    historyApiFallback: false
};

// 远程代理访问，可以配置多个代理服务：https://github.com/chimurai/http-proxy-middleware
const proxyConfig = [
  {
    enable: true,
    headers: {
      // 这是之前网页的地址，从中可以看到当前请求页面的链接。
      "Referer": 'http://10.16.1.122:25000'
    },
    // context，如果不配置，默认就是代理全部。
    router: [
      '/wbalone', '/iuap-example','/eiap-plus/','/newref/', '/print_service/', '/iuap-print/'
    ],
    url: 'http://10.16.1.122:25000'
  },
  // 后台开发服务
  {
    enable: true,
    headers: {
      // 这是之前网页的地址，从中可以看到当前请求页面的链接。
     
      "Referer": "http://127.0.0.1:8080"
       
    },
    // context，如果不配置，默认就是代理全部。
    router: [
      '/maintenance',

    ],
 
    url: 'http://127.0.0.1:8080'
 
  }
];

const globalEnvConfig = new webpack.DefinePlugin({
  __MODE__: JSON.stringify(process.env.NODE_ENV),
  GROBAL_HTTP_CTX: JSON.stringify("/maintenance"),
})

//开发环境websocket_proxy_url
const dev_websocket_proxy_url_config = new webpack.DefinePlugin({
  GLOBAL_COMPONENTS_URL: JSON.stringify("http://127.0.0.1:3000"),
  websocket_proxy_url: JSON.stringify("wss://yycti-daily.yyuap.com:7443"), //wss://pay.yonyoutelecom.cn:5443
})
//测试环境websocket_proxy_url
const test_websocket_proxy_url_config = new webpack.DefinePlugin({
  websocket_proxy_url: JSON.stringify("wss://testfs.yonyoutelecom.cn:7443"), //wss://isctest.yonyoutelecom.cn:7443
})
//demo演示环境websocket_proxy_url
const demo_websocket_proxy_url_config = new webpack.DefinePlugin({
  websocket_proxy_url: JSON.stringify("wss://iscdemo.yonyoutelecom.cn:7443")
})

const MINIMIZE_FLAG = (process.env.NODE_ENV == "production") ? true : false;

//提取package里的包
function getVendors() {
  let pkg = require("./package.json");
  let _vendors = [];
  for (const key in pkg.dependencies) {
    _vendors.push(key);
  }
  return _vendors;
}
//优化配置，对于使用CDN作为包资源的引用从外到内的配置
const externals = {
  // 'axios': 'axios',
  // 'react': 'React',
  // 'react-dom': 'ReactDOM',
  //'tinper-bee': 'TinperBee'
}
//默认加载扩展名、相对JS路径模块的配置
const resolve = {
  extensions: [
    '.jsx', '.js', '.less', '.css', '.json'
  ],
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    modules: path.resolve(__dirname, 'src/pages/'),
    routes: path.resolve(__dirname, 'src/routes/'),
    layout: path.resolve(__dirname, 'src/layout/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    static: path.resolve(__dirname, 'src/static/'),
    src:path.resolve(__dirname, 'src/')
  }
}
//开发和生产需要的loader
const rules = [{
  test: /\.js[x]?$/,
  exclude: /(node_modules)/,
  include: path.resolve('src'),
  use: [{
    loader: 'babel-loader',
  }],
},{
  test: /\.less$/,
  exclude: /(node_modules)/,
  use: ExtractTextPlugin.extract({
    use: ['css-loader', 'postcss-loader', {
      loader: "less-loader",
      options: {
        javascriptEnabled: true
      }
    }],
    fallback: 'style-loader'
  })
},{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        use: [{
            loader: 'css-loader',
        }, 'postcss-loader'],
        fallback: 'style-loader'
    })
}, {
  test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
  //exclude: /favicon\.png$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 8196,
      name: 'images/[name].[hash:8].[ext]',
      publicPath:pathUrl+context
    }
  }]
}, {
  test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[hash:8].[ext]',
      outputPath: 'fonts',
      publicPath: pathUrl+context+'/fonts/'
    }
  }]
}]


glob.sync("./src/pages/**/app.jsx").forEach(path => {
    const chunk = path.split("./src/pages/")[1].split(".jsx")[0];
    entries[chunk] = [path, hotMiddlewareScript];
    chunks.push(chunk);
});

//开发环境的webpack配置
const devConfig = {
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'eval',
  entry: entries,
  output: {
    path: path.resolve(__dirname, contentBase),
    filename:  "[name].js",
    chunkFilename: 'js/[name].[hash:8].bundle.js',
    publicPath: context
  },
  externals: externals,
  module: {
    rules: rules
  },
  plugins: [
      new CommonsChunkPlugin({
          name: "vendors",
          filename:"vendors/[name].js"
      }),
        new ExtractTextPlugin({
          filename: '[name].css',
          allChunks: true
        }),
    globalEnvConfig,
    dev_websocket_proxy_url_config,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: resolve
}

glob.sync("./src/pages/**/index.html").forEach(path => {
    const chunk = path.split("./src/pages/")[1].split("/index.html")[0];

    const filename = chunk + "/index.html"
    const key = chunk + "/index";

    const htmlConf = {
        filename: filename,
        template: path,
        inject: false,
        hash: true,
        key: key,
        chunks: ['vendors',chunk+'/app'],
        excludeChunks: [],
        favicon: './src/static/images/favicon.png'
    };
    htmlEntrys.push(filename);
    devConfig.plugins.push(new HtmlWebpackPlugin(htmlConf));
});



glob.sync("./src/pages/**/app.jsx").forEach(path => {
    const chunk = path.split("./src/pages/")[1].split(".jsx")[0];

    prodEntries[chunk] = [path];
    prodChunks.push(chunk);
});

//生产环境的webpack配置
const prodConfig = {
  devtool: 'source-map',
  entry: prodEntries,
  output: {
    publicPath: pathUrl+context,
    path: path.resolve(__dirname, contentBase),
    chunkFilename: 'js/[name].bundle.js',
  },
  externals: externals,
  module: {
    rules: rules
  },
  plugins: [
      new CommonsChunkPlugin({
          name: "vendors",
          filename:"vendors/[name].js"
      }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
    globalEnvConfig,
    test_websocket_proxy_url_config,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new CleanWebpackPlugin(['build']),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/static/fe'),
        to: path.resolve(__dirname, contentBase),
        ignore: ['.*']
      }
    ])
  ],
  resolve: resolve
}

glob.sync("./src/pages/**/index.html").forEach(path => {
    const chunk = path.split("./src/pages/")[1].split("/index.html")[0];

    const filename = chunk + "/index.html";
    const key = chunk + "/index";
    const realPath = prodConfig.output.publicPath + key + '.js';
    const realCssPath = prodConfig.output.publicPath + key + '.css';

    const htmlConf = {
        filename: filename,
        template: path,
        inject: false,
        hash: true,
        key: key,
        chunks:['vendors',chunk+'/app'],
        favicon: './src/static/images/favicon.png',
        realPath: realPath,
        realCssPath: realCssPath,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    };

    prodConfig.plugins.push(new HtmlWebpackPlugin(htmlConf));
});


//最终向uba导出配置文件
module.exports = {
  devConfig,
  prodConfig,
  svrConfig,
  proxyConfig,
  staticConfig
};
