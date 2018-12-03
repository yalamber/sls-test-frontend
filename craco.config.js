let path = require('path');
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => { 

      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        alias: {
          ...webpackConfig.resolve.alias,
          "@root": path.resolve(__dirname, 'src'),
          "@image": path.resolve(__dirname, 'src/image'),
          "@app": path.resolve(__dirname, 'src/Apps'),
          "@page": path.resolve(__dirname, 'src/containers/Page'),
          "@redux": path.resolve(__dirname, 'src/redux'),
          "@components": path.resolve(__dirname, 'src/components'),
          "@constants": path.resolve(__dirname, 'src/constants'),
          "@settings": path.resolve(__dirname, 'src/settings'),
          "@helpers": path.resolve(__dirname, 'src/helpers'),
          "@utils": path.resolve(__dirname, 'src/utils'),
          "@validations": path.resolve(__dirname, 'src/validations')
        }
      };
      console.log(webpackConfig);
      return webpackConfig; 
    },
  }
};