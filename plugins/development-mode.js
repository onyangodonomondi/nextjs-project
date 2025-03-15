// Add to your next.config.js webpack config
class DevelopmentModePlugin {
  apply(compiler) {
    compiler.hooks.compile.tap('DevelopmentModePlugin', () => {
      console.time('⏱️ Compilation Time');
    });
    
    compiler.hooks.done.tap('DevelopmentModePlugin', (stats) => {
      console.timeEnd('⏱️ Compilation Time');
      console.log(`📦 Bundle size: ${(stats.compilation.assets['main.js']?.size() / 1024 / 1024).toFixed(2)}MB`);
    });
  }
}

// In next.config.js webpack config
webpack: (config, { dev }) => {
  if (dev) {
    config.plugins.push(new DevelopmentModePlugin());
  }
  return config;
} 