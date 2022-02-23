const path = require('path')
const { withContentlayer } = require('next-contentlayer')
const webpack = require('webpack')

let config = {
  swcMinify: false,
  experimental: {
    optimizeFonts: true,
    modern: true,
    externalDir: true,
  },
  webpack: (config, { dev, isServer, defaultLoaders }) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    )
    fileLoaderRule.exclude = /\.svg$/

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    })

    config.resolve = {
      ...config.resolve,
    }

    // config.module = {
    //   ...config.module,
    //   rules: [
    //     ...config.module.rules,
    //     {
    //       test: /\.(js|jsx|ts|tsx)$/,
    //       include: [path.join(__dirname, '../../packages')],
    //       exclude: /node_modules/,
    //       use: defaultLoaders.babel,
    //     },
    //   ],
    // }

    config.plugins = config.plugins.concat([
      new webpack.NormalModuleReplacementPlugin(
        /\@saas-ui\/(?!props-docs)([a-z-]+)$/,
        (resource) => {
          resource.request = resource.request + '/src'
        }
      ),
    ])

    return config
  },
}

const isNextDev = process.argv.includes('dev')

if (isNextDev) {
  config = withContentlayer()(config)
}

module.exports = config
