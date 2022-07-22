import 'dotenv/config'

let Config = {
  apiUrl: process.env.API_ENDPOINT,
}

if (process.env.APP_ENV === 'production') {
  Config.apiUrl = 'https://my-production-url.vercel.app'
} else if (process.env.APP_ENV === 'staging') {
  Config.apiUrl = 'https://my-staging-url.vercel.app'
}

export default {
  expo: {
    owner: 'mwarger',
    name: 'Mobile',
    slug: 'mobile',
    scheme: 'com.mwarger.mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#f44336',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.mwarger.mobile',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#f44336',
      },
      package: 'com.mwarger.mobile',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      ...Config,
    },
  },
}
