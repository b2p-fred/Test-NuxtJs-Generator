import colors from 'vuetify/es5/util/colors'

// Manifest
import pkg from './package.json';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - my-front',
    title: 'my-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Environment variables - https://nuxtjs.org/guide/runtime-config
  publicRuntimeConfig: {
    // Application manifest
    APP_NAME: pkg.name,
    APP_VERSION: pkg.version,
    // Backend API root endpoint
    API_URL: process.env.API_URL || 'local',
    // Application base URL
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },

  // fixme: useful ? certainly to secure secret in production!
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:3001'
    }
  },

  // Authentication
  router: {
    middleware: ['auth']
  },

  env: {
    // Backend API root endpoint
    API_URL: process.env.API_URL || 'local',
    // Application base URL
    BASE_URL: process.env.BASE_URL || 'http://localhost:3001',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {ssr: false, src: '~plugins/main.client'},
    {ssr: false, src: '~plugins/axios.client'},
    // {ssr: false, src: '~plugins/local-storage.client'},
    // {ssr: false, src: '~plugins/jwt-parser.client'},
  ],

  // Do not import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/fontawesome',
    '@nuxtjs/i18n'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    // https://auth.nuxtjs.org/
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    debug: true,
    // https: false,
    prefix: '/api',
    credentials: false,
    // host: 'localhost',
    // port: 80,
    // baseURL: 'http://localhost', // Used as fallback if no runtime config is provided
    // progress: true,
    proxy: false,
    retry: false,
    // retry: { retries: 3 }
  },

  // Auth-next module configuration: https://auth.nuxtjs.org/guide/scheme
  auth: {
    plugins: [
      '~plugins/auth.client'
    ],
    redirect: {
      login: '/login',
      logout: '/logout',
      callback: '/',
      home: '/'
    },
    watchLoggedIn: true,
    vuex: {
      namespace: "authentication"
    },
    cookie: false,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/login_check', method: 'post', propertyName: 'data.token' },
          // refresh: { url: '/api/refresh', method: 'post', propertyName: 'refresh_token' },
          user: { url: '/api/me', method: 'get' },
          // user: false,
          logout: false,
          // logout: { url: '/api/v1/auth/logout', method: 'delete' }
        },
        // token: {
        //   // required: true,
        //   property: 'data.token',
        //   name: 'Authorization',
        //   type: 'Bearer',
        //   maxAge: 1800
        // },
        // refreshToken: {
        //   property: 'refresh_token',
        //   data: 'refresh_token',
        //   maxAge: 60 * 80 * 24
        // },
        user: {
          property: false,
          autoFetch: true
        },
      },
      b2p: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://ssolan.s2pweb.com/release/oidc/authorize',
          token: 'https://ssolan.s2pweb.com/release/oidc/token',
          userInfo: 'https://ssolan.s2pweb.com/release/oidc/userinfo',
          logout: 'https://ssolan.s2pweb.com/release/oidc/logout-rp'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'code',
        grantType: 'authorization_code',
        accessType: undefined,
        redirectUri: undefined,
        logoutRedirectUri: undefined,
        clientId: 'fred',
        scope: ['openid', 'email'],
        state: 'UNIQUE_AND_NON_GUESSABLE',
        codeChallengeMethod: 'S256',
        responseMode: '',
        acrValues: '',
        autoLogout: true
      },
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.purple.darken3,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Toast module configuration: https://github.com/nuxt-community/community-modules/tree/master/packages/toast
  toast: {
    position: 'top-left',
    duration: 2000,
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
