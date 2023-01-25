import type { PlatformPath } from 'path'

const path: PlatformPath = require('path')
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
