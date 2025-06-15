// config/middlewares.ts

export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: { contentSecurityPolicy: false },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:4300',
        'https://dibba-portfolio.pages.dev',
        'https://dibba.org/'
      ],
      methods: ['GET','HEAD','POST','PUT','PATCH','DELETE','OPTIONS'],
      headers: '*',
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
